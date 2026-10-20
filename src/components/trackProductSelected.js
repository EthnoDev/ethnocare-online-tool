import { track } from "@vercel/analytics";

// product: "overlay" | "underlay" | "liner" (case-insensitive)
export const trackProductSelected = (product) => {
  track("Product Selected", { product: String(product).toLowerCase() });
};
