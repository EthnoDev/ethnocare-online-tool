import { track } from "@vercel/analytics";

export const trackDistributorsCompleted = () => {
  track("Distributors Completed");
};
