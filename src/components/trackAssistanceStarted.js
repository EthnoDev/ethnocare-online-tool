import { track } from "@vercel/analytics";

export const trackAssistanceStarted = () => {
  track("Assistance Started");
};
