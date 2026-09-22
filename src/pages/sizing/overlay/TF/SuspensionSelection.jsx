import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];
const pickLang = (code) => (["fr", "es", "de"].includes(code) ? code : "en");

/** ---------- TF images ---------- */
// Language Agnostic (Root level)
import TFLocking from "../../../../assets/suspensionOptions/TF/TF-distal-locking.svg";
import TFCushion from "../../../../assets/suspensionOptions/TF/TF-cushion.svg";

// EN (Root level)
import TFLanyard_en from "../../../../assets/suspensionOptions/TF/TF-lanyard.svg";
import TFSingleSeal_en from "../../../../assets/suspensionOptions/TF/TF-single-seal.svg";
import TFMultiSeal_en from "../../../../assets/suspensionOptions/TF/TF-multi-seal.svg";

// FR
import TFLanyard_fr from "../../../../assets/suspensionOptions/TF/fr/TF-lanyard.svg";
import TFSingleSeal_fr from "../../../../assets/suspensionOptions/TF/fr/TF-single-seal.svg";
import TFMultiSeal_fr from "../../../../assets/suspensionOptions/TF/fr/TF-multi-seal.svg";

// ES
import TFLanyard_es from "../../../../assets/suspensionOptions/TF/es/TF-lanyard.svg";
import TFSingleSeal_es from "../../../../assets/suspensionOptions/TF/es/TF-single-seal.svg";
import TFMultiSeal_es from "../../../../assets/suspensionOptions/TF/es/TF-multi-seal.svg";

// DE
import TFLanyard_de from "../../../../assets/suspensionOptions/TF/de/TF-lanyard.svg";
import TFSingleSeal_de from "../../../../assets/suspensionOptions/TF/de/TF-single-seal.svg";
import TFMultiSeal_de from "../../../../assets/suspensionOptions/TF/de/TF-multi-seal.svg";

const TF_IMAGES = {
  "tf-distal-locking": TFLocking,
  "tf-cushion": TFCushion,
  "tf-lanyard": { en: TFLanyard_en, fr: TFLanyard_fr, es: TFLanyard_es, de: TFLanyard_de },
  "tf-single-seal": { en: TFSingleSeal_en, fr: TFSingleSeal_fr, es: TFSingleSeal_es, de: TFSingleSeal_de },
  "tf-multi-seal": { en: TFMultiSeal_en, fr: TFMultiSeal_fr, es: TFMultiSeal_es, de: TFMultiSeal_de },
};

export default function SuspensionSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = pickLang(baseLang(i18n.language));

  // Ordered: Distal Locking -> Lanyard -> Cushion -> Single Seal -> Multi Seal
  const options = [
    { id: "TF-distal-locking", tKey: "tf-distal-locking" },
    { id: "TF-lanyard", tKey: "tf-lanyard" },
    { id: "TF-cushion", tKey: "tf-cushion" },
    { id: "TF-single-seal", tKey: "tf-single-seal" },
    { id: "TF-multi-seal", tKey: "tf-multi-seal" },
  ].map((o) => {
    const asset = TF_IMAGES[o.tKey];
    return {
      ...o,
      src: typeof asset === "string" ? asset : asset[lang] || asset.en,
    };
  });

  const handleSelect = (optionId) => {
    if (selected) return;

    setSelected(optionId);
    localStorage.setItem("suspension", optionId);

    // Logic: If single seal or multi seal, go to TFlength-vac, otherwise TFlength
    setTimeout(() => {
      if (optionId === "TF-single-seal" || optionId === "TF-multi-seal") {
        navigate("/sizing/TFcircumference-vac");
      } else {
        navigate("/sizing/TFcircumference");
      }
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/product" 
      currentStep={1} 
      totalSteps={4} 
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
                className={`rounded-md overflow-hidden transition-all duration-150 ${
                  selected === id
                    ? "ring-4 ring-[#090C41]" 
                    : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black"
                }`}
              >
                <img
                  src={src}
                  alt={t(`suspension.${tKey}`, { ns: "common" })}
                  className="w-full h-auto block rounded-md" 
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}