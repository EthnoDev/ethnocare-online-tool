import { track } from "@vercel/analytics";

// material: "s30" | "s40" | "gel"
export const trackMaterialSelected = (material) => {
  track("Liner Material Selected", { material: String(material).toLowerCase() });
};
