// src/pages/assistance/overlay/TT/LengthVac.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Import localized "vac" images
import TLVac_en from "../../../../assets/lengths/TT/vac.svg";
import TLVac_fr from "../../../../assets/lengths/TT/vac_fr.svg";
import TLVac_es from "../../../../assets/lengths/TT/vac_es.svg";
import TLVac_de from "../../../../assets/lengths/TT/vac_de.svg";
import ExclamationIcon from "../../../../assets/exclamation.svg";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];

export default function LengthVac() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("pages");

  // Pick the localized image
  const lang = baseLang(i18n.language);
  const imgMap = {
    en: TLVac_en,
    fr: TLVac_fr,
    es: TLVac_es,
    de: TLVac_de,
  };

  const selectedImage = imgMap[lang] || TLVac_en;

  const handleConfirm = (res) => {
    setResult(res);
    localStorage.setItem("length", res);
    
    setTimeout(() => {
      navigate("/sizing/TTorientation");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TTcircumference-vac" 
      currentStep={3} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-full max-w-md ">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthTTVacSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("lengthTTVacSizing.description")}
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt="Length Measurement Vac"
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        <div className="mt-8">
          <MeasurementInput
            product="ttdistal"
            measurement="length"
            onConfirm={handleConfirm}
          />
        </div>

        {/* Notice Section - Matching the darker design from Length.jsx */}
        <div className="w-full max-w-sm mx-auto mt-10">
          <div className="border border-gray-300 rounded-2xl p-4 bg-gray-200">
            <div className="flex items-start gap-3 text-left">
              <img
                src={ExclamationIcon}
                alt="Notice"
                className="shrink-0 w-5 h-5 opacity-100"
              />
              <div className="flex-1">
                <p className="text-[15px] font-bold text-slate-900 leading-tight">
                  {t("lengthTTVacSizing.note_title")}
                </p>
                <p className="mt-1.5 text-[13px] text-slate-700 leading-snug">
                  <Trans
                    ns="pages"
                    i18nKey="lengthTTVacSizing.note_body"
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