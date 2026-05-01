// src/pages/assistance/overlay/TT/CircumferenceVac.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import TTCircumferenceVac from "../../../../assets/circumferences/TT/vac.svg";

export default function CircumferenceVac() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation("pages");

  const handleConfirm = (value) => {
    setResult(value);
    // Consistent with your previous file's key "circumference"
    localStorage.setItem("circumference", value);
    
    setTimeout(() => {
      navigate("/sizing/TTlength-vac"); 
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TTsuspension" 
      currentStep={2} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceTTVacSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("circumferenceTTVacSizing.description")}
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src={TTCircumferenceVac}
            alt="Circumference TT Distal Seal"
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        <div className="mt-8">
          <MeasurementInput
            product="ttdistal"
            measurement="circumference"
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </PageWrapper>
  );
}