import { MapPin, Crosshair } from "lucide-react";

interface MapPlaceholderProps {
  lat: number;
  lng: number;
  location: string;
}

/**
 * Styled map placeholder — blueprint-grid panel with coordinates.
 * No iframe, no API key, no network dependency.
 * Can be swapped for a Google Maps embed later.
 */
export function MapPlaceholder({ lat, lng, location }: MapPlaceholderProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
      <div className="pointer-events-none absolute inset-0 blueprint-grid-soft opacity-30" aria-hidden="true" />
      <div className="relative flex flex-col items-center justify-center gap-4 py-16 px-6 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-accent/30 bg-accent/10">
          <MapPin className="h-6 w-6 text-accent" />
        </span>
        <div>
          <p className="font-display text-lg font-semibold text-foreground">{location}</p>
          <p className="mt-1 font-mono text-xs text-muted-foreground tnum">
            <Crosshair className="mr-1 inline h-3 w-3 text-accent" />
            {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
          </p>
        </div>
        <a
          href={`https://maps.google.com/?q=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
