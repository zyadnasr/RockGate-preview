import { Marquee } from "@/components/animations/marquee";

const ITEMS = ["15+ years operating", "500+ projects delivered", "150+ engineers & managers", "98% client satisfaction", "Cairo · Egypt"];

/** Quiet proof band used instead of repeating the service catalogue. */
export function Ticker() {
  return <Marquee items={ITEMS} dark className="border-y border-white/10 bg-[#0a0a0a]" />;
}
