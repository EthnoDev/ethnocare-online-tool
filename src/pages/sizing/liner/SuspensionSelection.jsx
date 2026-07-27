// src/pages/sizing/liner/SuspensionSelection.jsx
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

// Asset Imports - Gel
import gelCushionDe from "../../../assets/suspensionOptions/Liner/gel/cushion_de.svg";
import gelCushionEn from "../../../assets/suspensionOptions/Liner/gel/cushion_en.svg";
import gelCushionEs from "../../../assets/suspensionOptions/Liner/gel/cushion_es.svg";
import gelCushionFr from "../../../assets/suspensionOptions/Liner/gel/cushion_fr.svg";
import gelPinEn from "../../../assets/suspensionOptions/Liner/gel/pin_en.svg";

// Asset Imports - Silicone
import siliconeCushionDe from "../../../assets/suspensionOptions/Liner/silicone/cushion_de.svg";
import siliconeCushionEn from "../../../assets/suspensionOptions/Liner/silicone/cushion_en.svg";
import siliconeCushionEs from "../../../assets/suspensionOptions/Liner/silicone/cushion_es.svg";
import siliconeCushionFr from "../../../assets/suspensionOptions/Liner/silicone/cushion_fr.svg";
import siliconePinEn from "../../../assets/suspensionOptions/Liner/silicone/pin_en.svg";

const gelCushionMap = {
  de: gelCushionDe,
  en: gelCushionEn,
  es: gelCushionEs,
  fr: gelCushionFr,
};

const siliconeCushionMap = {
  de: siliconeCushionDe,
  en: siliconeCushionEn,
  es: siliconeCushionEs,
  fr: siliconeCushionFr,
};

export default function SuspensionSelection() {
  const { t, i18n } = useTranslation(["pages", "common"]);

  // Determine liner material ('gel' vs 'silicone')
  const linerMaterial = localStorage.getItem("liner_material");
  const isSilicone = linerMaterial === "s30" || linerMaterial === "s40";

  // Determine active language (defaults to 'en' if not found in map)
  const lang = (i18n.language || "en").substring(0, 2).toLowerCase();
  const validLang = ["de", "en", "es", "fr"].includes(lang) ? lang : "en";

  // Select appropriate Cushion and Pin SVGs based on material and language
  const cushionSvg = isSilicone
    ? siliconeCushionMap[validLang]
    : gelCushionMap[validLang];

  const pinSvg = isSilicone ? siliconePinEn : gelPinEn;

  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing/liner/length"
      currentStep={5}
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("suspensionLinerSizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("suspensionLinerSizing.description")}
        </p>

        {/* 3. Vertical Suspension Images */}
        <div className="mt-8 flex flex-col gap-4 items-center">
          <img
            src={cushionSvg}
            alt="Cushion Suspension Option"
            className="w-full h-auto object-contain rounded-xl"
          />
          <img
            src={pinSvg}
            alt="Pin Suspension Option"
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>
      </div>
    </PageWrapper>
  );
}