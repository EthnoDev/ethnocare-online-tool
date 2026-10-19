import { track } from "@vercel/analytics";

export const trackSizingStarted = () => {
  track("Sizing Started");
};
