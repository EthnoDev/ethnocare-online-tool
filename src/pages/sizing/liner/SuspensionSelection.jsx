// src/pages/sizing/liner/SuspensionSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];
const pickLang = (code) => (["fr", "es", "de"].includes(code) ? code : "en");

/** ---------- Suspension Images (Localized) ---------- */
// Gel Assets
import gelCushionDe from "../../../assets/suspensionOptions/Liner/gel/cushion_de.svg";
import gelCushionEn from "../../../assets/suspensionOptions/Liner/gel/cushion_en.svg";
import gelCushionEs from "../../../assets/suspensionOptions/Liner/gel/cushion_es.svg";
import gelCushionFr from "../../../assets/suspensionOptions/Liner/gel/cushion_fr.svg";
import gelPinEn from "../../../assets/suspensionOptions/Liner/gel/pin_en.svg";

// Silicone Assets
import siliconeCushionDe from "../../../assets/suspensionOptions/Liner/silicone/cushion_de.svg";
import siliconeCushionEn from "../../../assets/suspensionOptions/Liner/silicone/cushion_en.svg";
import siliconeCushionEs from "../../../assets/suspensionOptions/Liner/silicone/cushion_es.svg";
import siliconeCushionFr from "../../../assets/suspensionOptions/Liner/silicone/cushion_fr.svg";
import siliconePinEn from "../../../assets/suspensionOptions/Liner/silicone/pin_en.svg";

const SUSPENSION_IMAGES = {
  gel: {
    cushion: { en: gelCushionEn, fr: gelCushionFr, es: gelCushionEs, de: gelCushionDe },
    pin: { en: gelPinEn, fr: gelPinEn, es: gelPinEn, de: gelPinEn },
  },
  silicone: {
    cushion: { en: siliconeCushionEn, fr: siliconeCushionFr, es: siliconeCushionEs, de: siliconeCushionDe },
    pin: { en: siliconePinEn, fr: siliconePinEn, es: siliconePinEn, de: siliconePinEn },
  },
};

export default function SuspensionSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = pickLang(baseLang(i18n.language));

  // Determine liner material ('gel' vs 'silicone')
  const linerMaterial = localStorage.getItem("liner_material");
  const isSilicone = linerMaterial === "s30" || linerMaterial === "s40";
  const materialKey = isSilicone ? "silicone" : "gel";

  const handleSelect = (optionId) => {
    if (selected) return;
    setSelected(optionId);
    localStorage.setItem("liner_suspension", optionId);

    //setTimeout(() => {
      // Navigate to your next step (e.g. final result/summary page)
    //  navigate("/sizing/liner/result");
    //}, 200);
  };

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

        {/* 3. Option Selection Container */}
        <div className="mt-8 flex flex-col items-center space-y-6">
          {/* Option: Cushion */}
          <button
            type="button"
            onClick={() => handleSelect("cushion")}
            className="cursor-pointer focus:outline-none transition-all w-fit flex flex-col items-center group"
          >
            <div
              className={`rounded-xl overflow-hidden transition-all duration-150 flex ${
                selected === "cushion"
                  ? "ring-4 ring-[#090C41]"
                  : "ring-1 ring-gray-300 group-hover:ring-2 group-hover:ring-black"
              }`}
            >
              <img
                src={
                  SUSPENSION_IMAGES[materialKey].cushion[lang] ||
                  SUSPENSION_IMAGES[materialKey].cushion.en
                }
                alt={t("common:suspension.cushion")}
                className="h-auto w-full block rounded-xl max-w-[320px] object-cover"
              />
            </div>
          </button>

          {/* Option: Pin */}
          <button
            type="button"
            onClick={() => handleSelect("pin")}
            className="cursor-pointer focus:outline-none transition-all w-fit flex flex-col items-center group"
          >
            <div
              className={`rounded-xl overflow-hidden transition-all duration-150 flex ${
                selected === "pin"
                  ? "ring-4 ring-[#090C41]"
                  : "ring-1 ring-gray-300 group-hover:ring-2 group-hover:ring-black"
              }`}
            >
              <img
                src={
                  SUSPENSION_IMAGES[materialKey].pin[lang] ||
                  SUSPENSION_IMAGES[materialKey].pin.en
                }
                alt={t("common:suspension.pin")}
                className="h-auto w-full block rounded-xl max-w-[320px] object-cover"
              />
            </div>
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}