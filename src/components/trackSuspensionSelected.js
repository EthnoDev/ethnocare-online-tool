import { track } from "@vercel/analytics";

// Only these IDs are renamed in analytics; all others are sent unchanged
const SUSPENSION_LABELS = {
  "TF-distal-locking": "TF-pin",
  "TT-locking": "TT-pin",
  "TT-suspension-sleeve": "TT-sleeve",
};

export const trackSuspensionSelected = (suspension) => {
  track("Suspension Selected", {
    suspension: SUSPENSION_LABELS[suspension] ?? suspension,
  });
};
