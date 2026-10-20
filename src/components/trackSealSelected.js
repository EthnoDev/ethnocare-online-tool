import { track } from "@vercel/analytics";

// seal: "open-seal" | "closed-seal" -> tracked as "open" | "closed"
export const trackSealSelected = (seal) => {
  track("Underlay Seal Selected", { seal: String(seal).replace("-seal", "") });
};
