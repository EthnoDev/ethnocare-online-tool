// src/pages/assistance/overlay/TT/Circumference.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import TTCircumferenceC from "../../../../assets/circumferences/TT/pinC.svg";
import TTCircumferenceI from "../../../../assets/circumferences/TT/pinI.svg";

export default function Circumference() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation("pages");

  // Logic for units and image selection
  const isImperial = localStorage.getItem("units") === "imperial";
  const selectedImage = isImperial ? TTCircumferenceI : TTCircumferenceC;
  const distance = isImperial ? "1.5 in" : "4 cm";

  const handleConfirm = (res) => {
    setResult(res);
    localStorage.setItem("circumference", res);
    // Navigate to next step
    //setTimeout(() => navigate("/assistance/overlay/TT/length"), 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TTsuspension" 
      currentStep={2} 
      totalSteps={5}
      code={true}
    >
      <div className="w-full max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
            {t("circumferenceTTSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t(`circumferenceTTSizing.description_${isImperial ? "imperial" : "metric"}`, { distance })}
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt="Circumference"
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        <div className="mt-8">
          <MeasurementInput
            product="ttstandard"
            measurement="circumference"
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </PageWrapper>
  );
}