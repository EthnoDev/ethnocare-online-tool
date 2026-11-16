import { track } from "@vercel/analytics";

// Only these IDs are renamed in analytics; all others are sent unchanged
const SUSPENSION_LABELS = {
  "TF-distal-locking": "TF-pin",
  "TT-locking": "TT-pin",
  "TT-suspension-sleeve": "TT-sleeve",
};

export const trackSuspensionSelected = (suspension, product) => {
  const eventName = product === "Overlay"
    ? `Overlay ${suspension.startsWith("TF-") ? "TF" : "TT"} Suspension Selected`
    : `${product} Suspension Selected`;

  track(eventName, {
    suspension: SUSPENSION_LABELS[suspension] ?? suspension,
  });
};
