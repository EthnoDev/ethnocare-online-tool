import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];
const pickLang = (code) => (["fr", "es", "de"].includes(code) ? code : "en");

/** ---------- TT images ---------- */
// Language Agnostic (Root level only)
import TTLocking from "../../../../assets/suspensionOptions/TT/TT-distal-locking.svg";
import TTCushion from "../../../../assets/suspensionOptions/TT/TT-cushion.svg";

// EN (Root level)
import TTLanyard_en from "../../../../assets/suspensionOptions/TT/TT-lanyard.svg";
import TTDistalSeal_en from "../../../../assets/suspensionOptions/TT/TT-distal-seal.svg";
import TTSingleSeal_en from "../../../../assets/suspensionOptions/TT/TT-single-seal.svg";
import TTMultiSeal_en from "../../../../assets/suspensionOptions/TT/TT-multi-seal.svg";
import TTSleeve_en from "../../../../assets/suspensionOptions/TT/TT-suspension-sleeve.svg";

// FR
import TTLanyard_fr from "../../../../assets/suspensionOptions/TT/fr/TT-lanyard.svg";
import TTDistalSeal_fr from "../../../../assets/suspensionOptions/TT/fr/TT-distal-seal.svg";
import TTSingleSeal_fr from "../../../../assets/suspensionOptions/TT/fr/TT-single-seal.svg";
import TTMultiSeal_fr from "../../../../assets/suspensionOptions/TT/fr/TT-multi-seal.svg";
import TTSleeve_fr from "../../../../assets/suspensionOptions/TT/fr/TT-suspension-sleeve.svg";

// ES
import TTLanyard_es from "../../../../assets/suspensionOptions/TT/es/TT-lanyard.svg";
import TTDistalSeal_es from "../../../../assets/suspensionOptions/TT/es/TT-distal-seal.svg";
import TTSingleSeal_es from "../../../../assets/suspensionOptions/TT/es/TT-single-seal.svg";
import TTMultiSeal_es from "../../../../assets/suspensionOptions/TT/es/TT-multi-seal.svg";
import TTSleeve_es from "../../../../assets/suspensionOptions/TT/es/TT-suspension-sleeve.svg";

// DE
import TTLanyard_de from "../../../../assets/suspensionOptions/TT/de/TT-lanyard.svg";
import TTDistalSeal_de from "../../../../assets/suspensionOptions/TT/de/TT-distal-seal.svg";
import TTSingleSeal_de from "../../../../assets/suspensionOptions/TT/de/TT-single-seal.svg";
import TTMultiSeal_de from "../../../../assets/suspensionOptions/TT/de/TT-multi-seal.svg";
import TTSleeve_de from "../../../../assets/suspensionOptions/TT/de/TT-suspension-sleeve.svg";

const TT_IMAGES = {
  "tt-locking": TTLocking,
  "tt-cushion": TTCushion,
  "tt-suspension-sleeve": { en: TTSleeve_en, fr: TTSleeve_fr, es: TTSleeve_es, de: TTSleeve_de },
  "tt-lanyard": { en: TTLanyard_en, fr: TTLanyard_fr, es: TTLanyard_es, de: TTLanyard_de },
  "tt-distal-seal": { en: TTDistalSeal_en, fr: TTDistalSeal_fr, es: TTDistalSeal_es, de: TTDistalSeal_de },
  "tt-single-seal": { en: TTSingleSeal_en, fr: TTSingleSeal_fr, es: TTSingleSeal_es, de: TTSingleSeal_de },
  "tt-multi-seal": { en: TTMultiSeal_en, fr: TTMultiSeal_fr, es: TTMultiSeal_es, de: TTMultiSeal_de },
};

export default function SuspensionSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = pickLang(baseLang(i18n.language));
  const product = localStorage.getItem("product");
  const isUnderlay = product === "Underlay";

  const rawOptions = [
    { id: "TT-locking", tKey: "tt-locking" },
    { id: "TT-lanyard", tKey: "tt-lanyard" },
    { id: "TT-cushion", tKey: "tt-cushion" },
    { id: "TT-suspension-sleeve", tKey: "tt-suspension-sleeve" },
    { id: "TT-distal-seal", tKey: "tt-distal-seal" },
    { id: "TT-single-seal", tKey: "tt-single-seal" },
    { id: "TT-multi-seal", tKey: "tt-multi-seal" },
  ];

  // Underlay: Hide single seal & multi seal (show distal seal)
  // Overlay: Hide distal seal (show single seal & multi seal)
  const options = rawOptions
    .filter((o) => {
      if (isUnderlay) {
        return o.id !== "TT-single-seal" && o.id !== "TT-multi-seal";
      }
      return o.id !== "TT-distal-seal";
    })
    .map((o) => {
      const asset = TT_IMAGES[o.tKey];
      return {
        ...o,
        src: typeof asset === "string" ? asset : asset[lang] || asset.en,
      };
    });

  const handleSelect = (optionId) => {
    if (selected) return;

    setSelected(optionId);
    localStorage.setItem("suspension", optionId);

    setTimeout(() => {
      // 1. Underlay logic
      if (isUnderlay) {
        navigate("/sizing/underlay/seal");
        return;
      }

      // 2. Overlay logic
      if (optionId === "TT-single-seal" || optionId === "TT-multi-seal") {
        navigate("/sizing/TTcircumference-vac");
      } else {
        navigate("/sizing/TTcircumference");
      }
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/product" 
      currentStep={isUnderlay ? null : 1} 
      totalSteps={isUnderlay ? null : 5} 
      code={true}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("suspensionSizing.title", { ns: "pages" })}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("suspensionSizing.description", { ns: "pages" })}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6">
          {options.map(({ id, src, tKey }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleSelect(id)}
              className="cursor-pointer focus:outline-none transition-all"
              aria-label={t(`suspension.${tKey}`, { ns: "common" })}
            >
              <div
                className={`rounded-xl overflow-hidden transition-all duration-150 ${
                  selected === id
                    ? "ring-4 ring-[#090C41]" 
                    : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black"
                }`}
              >
                <img
                  src={src}
                  alt={t(`suspension.${tKey}`, { ns: "common" })}
                  className="w-full h-auto block rounded-xl" 
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}