import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import TTSingleVac from "../../../../assets/circumferences/TT/SingleVac.svg";
import TTMultiVac from "../../../../assets/circumferences/TT/MultiVac.svg";

export default function CircumferenceVac() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  
  // Loaded both "pages" and "common" namespaces
  const { t } = useTranslation(["pages", "common"]);

  // Retrieve selected suspension option from localStorage
  const suspension = localStorage.getItem("suspension");
  const isMultiSeal = suspension === "TT-multi-seal";

  // Dynamic description and image selection based on suspension type
  const descriptionKey = isMultiSeal
    ? "circumferenceTTVacSizing.descriptionMulti"
    : "circumferenceTTVacSizing.descriptionSingle";

  const selectedImage = isMultiSeal ? TTMultiVac : TTSingleVac;

  const handleConfirm = (value) => {
    setResult(value);
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
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceTTVacSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          <Trans
            ns="pages"
            i18nKey={descriptionKey}
            components={{
              bold: <strong className="font-bold text-black" />,
              underline: <span className="underline" />,
              br: <br />
            }}
          />
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt={t("common:pages.circumference_tt_vac")}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        <div className="w-full">
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