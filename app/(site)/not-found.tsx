import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import emblem from "@/images/RockGate-logos/rockgate-emblem.svg";

const EMBLEM_URL = typeof emblem === "string" ? emblem : emblem.src;

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-[#0a0a0a]">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-[0.06]" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={EMBLEM_URL} alt="" aria-hidden="true" className="pointer-events-none absolute -right-12 top-12 w-52 opacity-[0.07]" />
      <Container className="relative z-10 text-center">
        <p className="label-engineering text-accent">Error / 404</p>
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tightest text-white sm:text-5xl">
          Page not found.
        </h1>
        <p className="mt-4 max-w-md mx-auto text-white/60">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button variant="gold" size="lg" className="mt-8" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </Container>
    </section>
  );
}
