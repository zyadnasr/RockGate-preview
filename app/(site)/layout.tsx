import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageTransition } from "@/components/providers/page-transition";
import { ScrollRestoration } from "@/components/providers/scroll-restoration";

/**
 * Public site chrome. Grouped under `(site)` so the marketing pages keep
 * their navbar/footer/page transitions while the admin area (`/admin`)
 * renders against the bare root layout — no public chrome leaks into the
 * dashboard, and no admin code enters the public bundle.
 */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollRestoration />
      <Navbar />
      <main id="main-content">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
