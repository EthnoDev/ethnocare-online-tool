import { track } from "@vercel/analytics";

export const trackSizingCompleted = (product, sku) => {
  track("Sizing Completed", {
    product,
    sku,
  });
};
