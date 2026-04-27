// src/pages/assistance/overlay/TT/OrientationSelection.jsx
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";

/** ---------- Orientation Assets ---------- */
import Left_en from "../../../../assets/orientations/left.svg";
import Left_fr from "../../../../assets/orientations/left_fr.svg";
import Left_es from "../../../../assets/orientations/left_es.svg";
import Left_de from "../../../../assets/orientations/left_de.svg";

import Right_en from "../../../../assets/orientations/right.svg";
import Right_fr from "../../../../assets/orientations/right_fr.svg";
import Right_es from "../../../../assets/orientations/right_es.svg";
import Right_de from "../../../../assets/orientations/right_de.svg";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];

export default function OrientationSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = baseLang(i18n.language);

  // 1. Determine the dynamic back path based on selection
  const backPath = useMemo(() => {
    const suspension = localStorage.getItem("overlay_suspension");
    return suspension === "TT-distal-seal" 
      ? "/sizing/TTlength-vac" 
      : "/sizing/TTlength";
  }, []);

  // 2. Map images to language and side
  const orientationImages = {
    left: { en: Left_en, fr: Left_fr, es: Left_es, de: Left_de },
    right: { en: Right_en, fr: Right_fr, es: Right_es, de: Right_de },
  };

  const options = [
    { id: "left", tKey: "left" },
    { id: "right", tKey: "right" },
  ].map(opt => ({
    ...opt,
    src: orientationImages[opt.id][lang] || orientationImages[opt.id].en
  }));

  const handleSelect = (optionId) => {
    if (selected) return;
    setSelected(optionId);
    localStorage.setItem("orientation", optionId);

    setTimeout(() => {
      navigate("/sizing/results"); 
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo={backPath} 
      currentStep={4} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-full max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("orientationTTSizing.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("orientationTTSizing.description")}
        </p>

        {/* Decreased gap-x from 8 to 2 and px from 10 to 4 to pull them together */}
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 px-12 max-w-sm mx-auto">
        {options.map(({ id, src }) => (
            <button
            key={id}
            type="button"
            onClick={() => handleSelect(id)}
            className="cursor-pointer focus:outline-none flex justify-center"
            aria-label={t(`common:${id}`, id)}
            >
            <div
                className={`rounded-xl overflow-hidden transition-all duration-150 max-w-[160px] ${
                selected === id
                    ? "ring-4 ring-[#090C41] bg-slate-50" 
                    : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black bg-white"
                }`}
            >
                <img 
                src={src} 
                alt={id} 
                className="w-full h-auto block"
                />
            </div>
            </button>
        ))}
        </div>
      </div>
    </PageWrapper>
  );
}