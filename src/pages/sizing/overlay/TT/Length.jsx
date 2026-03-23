// src/pages/assistance/overlay/TT/Length.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Import localized "pin" images
import TLPin_en from "../../../../assets/lengths/TT/pin.svg";
import TLPin_fr from "../../../../assets/lengths/TT/pin_fr.svg";
import TLPin_es from "../../../../assets/lengths/TT/pin_es.svg";
import TLPin_de from "../../../../assets/lengths/TT/pin_de.svg";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];

export default function Length() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("pages");

  // Pick the localized image
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
    // Updated variable name to "length"
    localStorage.setItem("length", res);
    
    //setTimeout(() => {
      //navigate("/sizing/TTorientation");
    //}, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TTcircumference" 
      currentStep={3} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-full max-w-md mt-2">
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
      </div>
    </PageWrapper>
  );
}