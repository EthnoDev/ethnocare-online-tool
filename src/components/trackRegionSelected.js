import { track } from "@vercel/analytics";

const REGION_LABELS = {
  africa: "africa",
  asia: "asia",
  europe: "europe",
  middleEast: "middle east",
  northAmerica: "north america",
  oceania: "oceania",
  southAmerica: "south america",
};

export const trackRegionSelected = (regionKey) => {
  track("Region Selected", { region: REGION_LABELS[regionKey] ?? regionKey });
};
