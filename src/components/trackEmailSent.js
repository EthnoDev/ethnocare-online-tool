import { track } from "@vercel/analytics";

export const trackEmailSent = () => {
  track("Email Sent");
};
