// src/pages/assistance/overlay/TT/LengthVac.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Import localized "vac" images
import TLVac_en from "../../../../assets/lengths/TT/vac.svg";
import TLVac_fr from "../../../../assets/lengths/TT/vac_fr.svg";
import TLVac_es from "../../../../assets/lengths/TT/vac_es.svg";
import TLVac_de from "../../../../assets/lengths/TT/vac_de.svg";

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
    // Consistent variable name "length"
    localStorage.setItem("length", res);
    
    //setTimeout(() => {
      // Directing to a shared or Vac-specific orientation page
      //navigate("/sizing/TTorientationVac");
    //}, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TTcircumference-vac" 
      currentStep={3} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-full max-w-md mt-2">
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
      </div>
    </PageWrapper>
  );
}