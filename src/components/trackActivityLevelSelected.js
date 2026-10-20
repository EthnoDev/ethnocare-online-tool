import { track } from "@vercel/analytics";

// level: "K1" | "K2" | "K3" | "K4"
export const trackActivityLevelSelected = (level) => {
  track("Activity Level Selected", { level: String(level).toLowerCase() });
};
