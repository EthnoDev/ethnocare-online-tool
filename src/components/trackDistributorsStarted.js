import { track } from "@vercel/analytics";

export const trackDistributorsStarted = () => {
  track("Distributors Started");
};
