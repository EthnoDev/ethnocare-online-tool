// src/pages/assistance/overlay/TT/Length.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import TLPin_en from "../../../../assets/lengths/TT/pin.svg";
import TLPin_fr from "../../../../assets/lengths/TT/pin_fr.svg";
import TLPin_es from "../../../../assets/lengths/TT/pin_es.svg";
import TLPin_de from "../../../../assets/lengths/TT/pin_de.svg";
import ExclamationIcon from "../../../../assets/exclamation.svg";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];

export default function Length() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("pages");

  const lang = baseLang(i18n.language);
  const imgMap = {
    en: TLPin_en,
    fr: TLPin_fr,
    es: TLPin_es,
    de: TLPin_de,
  };

  const selectedImage = imgMap[lang] || TLPin_en;

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
      backTo="/sizing/TTcircumference" 
      currentStep={3} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
            {t("lengthTTSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("lengthTTSizing.description")}
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt="Length Measurement"
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        <div className="mt-8">
          <MeasurementInput
            product="ttstandard"
            measurement="length"
            onConfirm={handleConfirm}
          />
        </div>

        {/* Note Section - Specific to Length Measurement */}
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
                  {t("lengthTTSizing.note_title")}
                </p>
                <p className="mt-1.5 text-[13px] text-slate-600 leading-snug">
                  <Trans
                    ns="pages"
                    i18nKey="lengthTTSizing.note_body"
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