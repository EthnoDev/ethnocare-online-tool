// src/pages/assistance/overlay/TT/SuspensionSelection.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];
const pickLang = (code) => (["fr", "es", "de"].includes(code) ? code : "en");

/** ---------- TT images (EN/FR/ES/DE) ---------- */
import TTLocking_en from "../../../../assets/suspensionOptions/TT/TT-distal-locking.svg";
import TTLanyard_en from "../../../../assets/suspensionOptions/TT/TT-lanyard.svg";
import TTSleeve_en from "../../../../assets/suspensionOptions/TT/TT-suspension-sleeve.svg";
import TTSeal_en from "../../../../assets/suspensionOptions/TT/TT-distal-seal.svg";
import TTLanyardDistal_en from "../../../../assets/suspensionOptions/TT/TT-distal-lanyard.svg";
import TTCushion_en from "../../../../assets/suspensionOptions/TT/TT-cushion.svg";

// FR
import TTLocking_fr from "../../../../assets/suspensionOptions/TT/fr/TT-distal-locking.svg";
import TTLanyard_fr from "../../../../assets/suspensionOptions/TT/fr/TT-lanyard.svg";
import TTSleeve_fr from "../../../../assets/suspensionOptions/TT/fr/TT-suspension-sleeve.svg";
import TTSeal_fr from "../../../../assets/suspensionOptions/TT/fr/TT-distal-seal.svg";
import TTLanyardDistal_fr from "../../../../assets/suspensionOptions/TT/fr/TT-distal-lanyard.svg";
import TTCushion_fr from "../../../../assets/suspensionOptions/TT/fr/TT-cushion.svg";

// ES
import TTLocking_es from "../../../../assets/suspensionOptions/TT/es/TT-distal-locking.svg";
import TTLanyard_es from "../../../../assets/suspensionOptions/TT/es/TT-lanyard.svg";
import TTSleeve_es from "../../../../assets/suspensionOptions/TT/es/TT-suspension-sleeve.svg";
import TTSeal_es from "../../../../assets/suspensionOptions/TT/es/TT-distal-seal.svg";
import TTLanyardDistal_es from "../../../../assets/suspensionOptions/TT/es/TT-distal-lanyard.svg";
import TTCushion_es from "../../../../assets/suspensionOptions/TT/es/TT-cushion.svg";

// DE
import TTLocking_de from "../../../../assets/suspensionOptions/TT/de/TT-distal-locking.svg";
import TTLanyard_de from "../../../../assets/suspensionOptions/TT/de/TT-lanyard.svg";
import TTSleeve_de from "../../../../assets/suspensionOptions/TT/de/TT-suspension-sleeve.svg";
import TTSeal_de from "../../../../assets/suspensionOptions/TT/de/TT-distal-seal.svg";
import TTLanyardDistal_de from "../../../../assets/suspensionOptions/TT/de/TT-distal-lanyard.svg";
import TTCushion_de from "../../../../assets/suspensionOptions/TT/de/TT-cushion.svg";

const TT_IMAGES = {
  "tt-locking": { en: TTLocking_en, fr: TTLocking_fr, es: TTLocking_es, de: TTLocking_de },
  "tt-lanyard": { en: TTLanyard_en, fr: TTLanyard_fr, es: TTLanyard_es, de: TTLanyard_de },
  "tt-suspension-sleeve": { en: TTSleeve_en, fr: TTSleeve_fr, es: TTSleeve_es, de: TTSleeve_de },
  "tt-distal-seal": { en: TTSeal_en, fr: TTSeal_fr, es: TTSeal_es, de: TTSeal_de },
  "tt-distal-lanyard": { en: TTLanyardDistal_en, fr: TTLanyardDistal_fr, es: TTLanyardDistal_es, de: TTLanyardDistal_de },
  "tt-cushion": { en: TTCushion_en, fr: TTCushion_fr, es: TTCushion_es, de: TTCushion_de },
};

export default function SuspensionSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = pickLang(baseLang(i18n.language));

  const options = [
    { id: "TT-locking", tKey: "tt-locking" },
    { id: "TT-lanyard", tKey: "tt-lanyard" },
    { id: "TT-suspension-sleeve", tKey: "tt-suspension-sleeve" },
    { id: "TT-distal-seal", tKey: "tt-distal-seal" },
    { id: "TT-distal-lanyard", tKey: "tt-distal-lanyard" },
    { id: "TT-cushion", tKey: "tt-cushion" },
  ].map((o) => ({
    ...o,
    src: TT_IMAGES[o.tKey]?.[lang] || TT_IMAGES[o.tKey]?.en,
  }));

  const handleSelect = (optionId) => {
    if (selected) return;

    setSelected(optionId);
    localStorage.setItem("overlay_suspension", optionId);

    setTimeout(() => {
      // Logic: If Distal Seal, handle differently. Otherwise, go to Circumference.
      if (optionId === "TT-distal-seal") {
        navigate("/sizing/TTcircumference-vac");
      } else {
        navigate("/sizing/TTcircumference");
      }
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/sizing/product" currentStep={1} totalSteps={5} code={true}>
      <div className="w-100 max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("suspensionSizing.title", { ns: "pages" })}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("suspensionSizing.description", { ns: "pages" })}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {options.map(({ id, src, tKey }) => (
            <button
              key={id}
              type="button"
              onClick={() => handleSelect(id)}
              className="cursor-pointer focus:outline-none transition-all"
              aria-label={t(`suspension.${tKey}`, { ns: "common" })}
            >
              {/* Added overflow-hidden and matched the AmputationSelection ring logic */}
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