"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/data";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { PrefetchLink } from "@/components/ui/prefetch-link";
import { EASE } from "@/components/animations/motion";

/** Resolve a nav href to an absolute path. Hash links become /#section on non-homepage routes. */
function resolveHref(href: string, pathname: string): string {
  if (href.startsWith("/")) return href;
  return pathname === "/" ? href : `/${href}`;
}

/** Check if a nav link is active for the current page/section. */
function isLinkActive(href: string, pathname: string, activeSection: string): boolean {
  if (href.startsWith("/")) {
    return pathname === href || (href !== "/" && pathname.startsWith(href));
  }
  if (pathname !== "/") return false;
  return activeSection === href.slice(1);
}

/**
 * Navigation glass morphing and link states are CSS-driven for instant
 * feedback; the mobile drawer uses Framer Motion (already in the layout
 * bundle) so it slides in/out smoothly.
 */
export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const [activeSection, setActiveSection] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  // 1 = scrolling down, -1 = scrolling up (used by the scroll spy tie-break).
  const scrollDirRef = React.useRef(1);
  const isHome = pathname === "/";

  React.useEffect(() => {
    setActiveSection("");
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    let ticking = false;
    let lastY = window.scrollY;
    const update = () => {
      setIsScrolled(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      const y = window.scrollY;
      scrollDirRef.current = y >= lastY ? 1 : -1;
      lastY = y;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const ids = NAV_LINKS.filter((l) => l.href.startsWith("#")).map((l) => l.href.slice(1));
    if (ids.length === 0) return;

    // A single detection line at 40% of the viewport height (zero-height band),
    // so at most two sections ever intersect it and the callback only fires on
    // boundary crossings — no polling, no mid-section flicker.
    const observer = new IntersectionObserver(
      (entries) => {
        const down = scrollDirRef.current >= 0;
        let best: Element | null = null;
        let bestTop = down ? -Infinity : Infinity;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          // When the line sits on a shared boundary, both sections intersect.
          // Respect scroll direction: going down, the incoming section is the
          // one below (larger top edge); going up, the one above (smaller).
          const top = entry.boundingClientRect.top;
          if (down ? top > bestTop : top < bestTop) {
            bestTop = top;
            best = entry.target;
          }
        }
        if (best) setActiveSection(best.id);
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Warm the site's routes while the browser is idle after each navigation.
  // Desktop gets this for free from PrefetchLink's viewport observer, but the
  // drawer links are hidden (display:none) on mobile so nothing ever prefetches
  // them — leaving the first drawer tap to pay a cold RSC fetch. These are the
  // only two non-home routes, so prefetching both covers the whole app.
  React.useEffect(() => {
    const routes = NAV_LINKS.filter((l) => l.href.startsWith("/")).map((l) =>
      resolveHref(l.href, pathname),
    );
    routes.push("/contact");
    const idle = (cb: () => void): number | NodeJS.Timeout =>
      "requestIdleCallback" in window
        ? window.requestIdleCallback(cb, { timeout: 2000 })
        : setTimeout(cb, 1000);
    const t = idle(() => routes.forEach((href) => router.prefetch(href)));
    return () => {
      if (typeof t === "number") window.cancelIdleCallback?.(t);
      else clearTimeout(t);
    };
  }, [pathname, router]);

  const onHero = !isScrolled && isHome;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 will-change-transform sm:px-6 sm:pt-4">
        <nav
          className={cn(
            "relative flex w-full items-center justify-between px-6 transition-[max-width,height,border-radius] duration-300 ease-out lg:px-8",
            isScrolled ? "h-16 max-w-[92%] rounded-[20px]" : "h-20 max-w-full rounded-none",
          )}
          aria-label="Primary"
        >
          <div
            className={cn(
              "pointer-events-none absolute inset-0 rounded-[inherit] border backdrop-blur-2xl backdrop-saturate-150 transition-[opacity,backdrop-filter,box-shadow,border-color] duration-300 will-change-[opacity,backdrop-filter,box-shadow]",
              isScrolled
                ? "border-accent/20 bg-white/90 opacity-100 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.3)] dark:border-accent/25 dark:bg-[#111]/90 dark:shadow-[0_24px_80px_-24px_rgba(0,0,0,0.55)]"
                : "border-transparent bg-transparent opacity-0",
            )}
          />

          <Link href="/" className="relative z-10 shrink-0" aria-label="Rock Gate home">
            <Logo onDark={onHero} className="h-11 w-11 lg:h-[52px] lg:w-[52px]" />
          </Link>

          <ul className="relative z-10 hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const resolvedHref = resolveHref(link.href, pathname);
              const isActive = isLinkActive(link.href, pathname, activeSection);
              const isRoute = link.href.startsWith("/");
              const LinkTag = isRoute ? PrefetchLink : "a";

              return (
                <li key={link.href}>
                  <LinkTag
                    href={resolvedHref}
                    className={cn(
                      "relative rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
                      onHero
                        ? isActive
                          ? "text-accent"
                          : "text-white/70 hover:text-white"
                        : isActive
                          ? "text-accent"
                          : "text-foreground/80 hover:text-accent",
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        aria-hidden="true"
                        transition={
                          prefersReduced
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 380, damping: 38, mass: 0.9 }
                        }
                        className="absolute inset-x-2 -bottom-0.5 h-[3px] rounded-full bg-accent"
                      />
                    )}
                  </LinkTag>
                </li>
              );
            })}
          </ul>

          <div className="relative z-10 flex items-center gap-2">
            <span className={cn(onHero && "text-white")}>
              <ThemeToggle />
            </span>
            <PrefetchLink href="/contact" className="hidden sm:block">
              <Button variant="gold" size="sm" className="hidden md:inline-flex">
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
            </PrefetchLink>
            <Button
              variant="ghost"
              size="iconLg"
              className={cn("lg:hidden", onHero && "text-white hover:text-white/80")}
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-background shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="flex items-center justify-between border-b border-border px-6 py-5">
                <Logo className="h-11 w-11" />
                <Button
                  variant="ghost"
                  size="iconLg"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <ul className="flex flex-1 flex-col gap-1 overflow-y-auto p-6">
                {NAV_LINKS.map((link) => {
                  const resolvedHref = resolveHref(link.href, pathname);
                  const isActive = isLinkActive(link.href, pathname, activeSection);
                  const isRoute = link.href.startsWith("/");
                  const LinkTag = isRoute ? PrefetchLink : "a";

                  return (
                    <li key={link.href}>
                      <LinkTag
                        href={resolvedHref}
                        onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-4 font-display text-2xl font-semibold tracking-tight transition-colors duration-200 hover:text-accent",
                        isActive ? "text-accent" : "text-foreground",
                      )}
                      >
                        {link.label}
                        <ArrowRight className="h-5 w-5 text-accent" />
                      </LinkTag>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-border p-6">
                <Button variant="gold" size="lg" className="w-full" asChild>
                  <PrefetchLink href="/contact" onClick={() => setOpen(false)}>
                    Get a Quote
                    <ArrowRight className="h-4 w-4" />
                  </PrefetchLink>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
