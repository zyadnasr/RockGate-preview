import type { MetadataRoute } from "next";
import { COMPANY } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${COMPANY.name} — Construction & Engineering`,
    short_name: COMPANY.name,
    description:
      "Premium construction, engineering and project management services across Egypt.",
    start_url: "/",
    display: "standalone",
    background_color: "#111111",
    theme_color: "#111111",
    icons: [
      {
        src: "/icons/rockgate-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/rockgate-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
