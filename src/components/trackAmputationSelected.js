import { track } from "@vercel/analytics";

// type: "transtibial" | "transfemoral"
export const trackAmputationSelected = (type) => {
  track("Amputation Selected", { type });
};
