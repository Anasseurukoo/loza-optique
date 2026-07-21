import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Loza Optique",
    short_name: "LOZA",
    description:
      "Loza Optique à Casablanca — montures, conseil, mesure et ajustement.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f1e7",
    theme_color: "#071d22",
    icons: [
      {
        src: "/brand/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
