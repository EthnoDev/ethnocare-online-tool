import { track } from "@vercel/analytics";

export const trackBuyClick = (product, sku) => {
  track("Buy Button Clicked", {
    product,
    sku,
  });
};
