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
import gelCushionDe from "../../../assets/suspensionOptions/Liner/gel/cushion_de.png";
import gelCushionEn from "../../../assets/suspensionOptions/Liner/gel/cushion_en.png";
import gelCushionEs from "../../../assets/suspensionOptions/Liner/gel/cushion_es.png";
import gelCushionFr from "../../../assets/suspensionOptions/Liner/gel/cushion_fr.png";
import gelPinEn from "../../../assets/suspensionOptions/Liner/gel/pin_en.png";

// Silicone Assets
import siliconeCushionDe from "../../../assets/suspensionOptions/Liner/silicone/cushion_de.png";
import siliconeCushionEn from "../../../assets/suspensionOptions/Liner/silicone/cushion_en.png";
import siliconeCushionEs from "../../../assets/suspensionOptions/Liner/silicone/cushion_es.png";
import siliconeCushionFr from "../../../assets/suspensionOptions/Liner/silicone/cushion_fr.png";
import siliconePinEn from "../../../assets/suspensionOptions/Liner/silicone/pin_en.png";

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

  // Determine liner material ('gel' vs 'silicone') & amputation
  const linerMaterial = localStorage.getItem("liner_material");
  const amputation = localStorage.getItem("amputation"); // 'transfemoral' or 'transtibial'

  // Dynamic back navigation route based on amputation type
  const isTransfemoral = amputation === "transfemoral";
  const backPath = isTransfemoral
    ? "/sizing/liner/tf/circumference"
    : "/sizing/liner/tt/circumference";

  const isSilicone = linerMaterial === "s30" || linerMaterial === "s40";
  const materialKey = isSilicone ? "silicone" : "gel";

  // Hide Cushion for Transfemoral Silicone
  const hideCushion = isSilicone && isTransfemoral;

  const handleSelect = (optionId) => {
    if (selected) return;
    setSelected(optionId);
    localStorage.setItem("liner_suspension", optionId);

    setTimeout(() => {
      // Navigate to next step
      navigate("/sizing/liner/thickness");
    }, 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo={backPath}
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
          {/* Option: Cushion (Conditionally Rendered) */}
          {!hideCushion && (
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
          )}

          {/* Option: Pin */}
          <div className="flex flex-col items-center">
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

            {/* Notice rendered only if Pin is the only option available */}
            {hideCushion && (
              <p className="mt-3 text-sm text-slate-600 text-center max-w-[320px]">
                {t("suspensionLinerSizing.notice")}
              </p>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}