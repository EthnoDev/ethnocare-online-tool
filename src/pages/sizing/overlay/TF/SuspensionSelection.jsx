// src/pages/assistance/overlay/TF/SuspensionSelection.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];
const pickLang = (code) => (["fr", "es", "de"].includes(code) ? code : "en");

/** ---------- TF images (EN/FR/ES/DE) ---------- */
// EN
import TFLocking_en from "../../../../assets/suspensionOptions/TF/TF-distal-locking.svg";
import TFLanyard_en from "../../../../assets/suspensionOptions/TF/TF-lanyard.svg";
import TFSeal_en from "../../../../assets/suspensionOptions/TF/TF-distal-seal.svg";
import TFCushion_en from "../../../../assets/suspensionOptions/TF/TF-cushion.svg";

// FR
import TFLocking_fr from "../../../../assets/suspensionOptions/TF/fr/TF-distal-locking.svg";
import TFLanyard_fr from "../../../../assets/suspensionOptions/TF/fr/TF-lanyard.svg";
import TFSeal_fr from "../../../../assets/suspensionOptions/TF/fr/TF-distal-seal.svg";
import TFCushion_fr from "../../../../assets/suspensionOptions/TF/fr/TF-cushion.svg";

// ES
import TFLocking_es from "../../../../assets/suspensionOptions/TF/es/TF-distal-locking.svg";
import TFLanyard_es from "../../../../assets/suspensionOptions/TF/es/TF-lanyard.svg";
import TFSeal_es from "../../../../assets/suspensionOptions/TF/es/TF-distal-seal.svg";
import TFCushion_es from "../../../../assets/suspensionOptions/TF/es/TF-cushion.svg";

// DE
import TFLocking_de from "../../../../assets/suspensionOptions/TF/de/TF-distal-locking.svg";
import TFLanyard_de from "../../../../assets/suspensionOptions/TF/de/TF-lanyard.svg";
import TFSeal_de from "../../../../assets/suspensionOptions/TF/de/TF-distal-seal.svg";
import TFCushion_de from "../../../../assets/suspensionOptions/TF/de/TF-cushion.svg";

const TF_IMAGES = {
  "tf-distal-locking": { en: TFLocking_en, fr: TFLocking_fr, es: TFLocking_es, de: TFLocking_de },
  "tf-lanyard": { en: TFLanyard_en, fr: TFLanyard_fr, es: TFLanyard_es, de: TFLanyard_de },
  "tf-distal-seal": { en: TFSeal_en, fr: TFSeal_fr, es: TFSeal_es, de: TFSeal_de },
  "tf-cushion": { en: TFCushion_en, fr: TFCushion_fr, es: TFCushion_es, de: TFCushion_de },
};

export default function SuspensionSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = pickLang(baseLang(i18n.language));

  const options = [
    { id: "TF-distal-locking", tKey: "tf-distal-locking" },
    { id: "TF-lanyard", tKey: "tf-lanyard" },
    { id: "TF-distal-seal", tKey: "tf-distal-seal" },
    { id: "TF-cushion", tKey: "tf-cushion" },
  ].map((o) => ({
    ...o,
    src: TF_IMAGES[o.tKey]?.[lang] || TF_IMAGES[o.tKey]?.en,
  }));

  const handleSelect = (optionId) => {
    if (selected) return;

    setSelected(optionId);
    localStorage.setItem("overlay_suspension", optionId);

    //setTimeout(() => {
      //navigate("/sizing/size"); // Or your specific next step
    //}, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/product" 
      currentStep={1} 
      totalSteps={4} 
      code={true}
    >
      <div className="w-100 max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("suspensionSizing.title", { ns: "pages" })}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("suspensionSizing.description", { ns: "pages" })}
        </p>

        {/* Layout matches TT exactly: gap-4, no extra px-10 padding */}
        <div className="mt-8 grid grid-cols-2 gap-4">
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