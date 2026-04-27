// src/pages/assistance/overlay/TT/OrientationSelection.jsx
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";

/** ---------- Assets ---------- */
import Left_en from "../../../../assets/orientations/left.svg";
import Left_fr from "../../../../assets/orientations/left_fr.svg";
import Left_es from "../../../../assets/orientations/left_es.svg";
import Left_de from "../../../../assets/orientations/left_de.svg";

import Right_en from "../../../../assets/orientations/right.svg";
import Right_fr from "../../../../assets/orientations/right_fr.svg";
import Right_es from "../../../../assets/orientations/right_es.svg";
import Right_de from "../../../../assets/orientations/right_de.svg";

import ExclamationIcon from "../../../../assets/exclamation.svg"; // Ensure path is correct

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];

export default function OrientationSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = baseLang(i18n.language);

  const backPath = useMemo(() => {
    const suspension = localStorage.getItem("overlay_suspension");
    return suspension === "TT-distal-seal" 
      ? "/sizing/TTlength-vac" 
      : "/sizing/TTlength";
  }, []);

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

        {/* Orientation Grid */}
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

        {/* Notice Section - Matching the uploaded design */}
        <div className="w-full max-w-sm mx-auto mt-10">
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-200/80">
            <div className="flex items-start gap-3 text-left">
              <img
                src={ExclamationIcon}
                alt="Notice"
                className="shrink-0 w-5 h-5 opacity-100"
              />
              <div className="flex-1">
                <p className="text-[15px] font-bold text-slate-900 leading-tight">
                  {t("orientationTTSizing.note_title")}
                </p>
                <p className="mt-1.5 text-[13px] text-slate-600 leading-snug">
                  <Trans
                    ns="pages"
                    i18nKey="orientationTTSizing.note_body"
                    components={{ 
                        bold: <strong className="font-bold text-[#090C41]" />,
                        underline: <span className="underline" />
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}