import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import TTCircumferenceC from "../../../../assets/circumferences/TT/pinC.svg";
import TTCircumferenceI from "../../../../assets/circumferences/TT/pinI.svg";

export default function Circumference() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  
  // Loaded both "pages" and "common" namespaces
  const { t } = useTranslation(["pages", "common"]);

  // Logic for units and image selection
  const isImperial = localStorage.getItem("units") === "imperial";
  const selectedImage = isImperial ? TTCircumferenceI : TTCircumferenceC;
  const distance = isImperial ? "1.5 in" : "4 cm";
  const descriptionKey = `circumferenceTTSizing.description_${isImperial ? "imperial" : "metric"}`;

  const handleConfirm = (res) => {
    setResult(res);
    localStorage.setItem("circumference", res);
    // Navigate to next step
    setTimeout(() => navigate("/sizing/TTlength"), 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TTsuspension" 
      currentStep={2} 
      totalSteps={5}
      code={true}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceTTSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          <Trans
            ns="pages"
            i18nKey={descriptionKey}
            values={{ distance }}
            components={{
              bold: <strong className="font-bold text-black" />
            }}
          />
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt={t("common:pages.circumference_tt")}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        <div className="w-full">
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