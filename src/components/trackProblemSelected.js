import { track } from "@vercel/analytics";

const PROBLEM_LABELS = {
  pressurePoints: "pressure points",
  tibialPressurePoint: "tibial pressure point",
  badFit: "bad fit",
  airLoss: "air loss",
  inflationDeflation: "inflation/deflation",
  other: "other",
};

export const trackProblemSelected = (problemKey) => {
  track("Assistance Problem Selected", {
    problem: PROBLEM_LABELS[problemKey] ?? problemKey,
  });
};
