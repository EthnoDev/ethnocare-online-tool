import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import SingleSealImg from "../../../../assets/circumferences/TF/singleSeal.svg";
import MultiSealImg from "../../../../assets/circumferences/TF/multiSeal.svg";

export default function CircumferenceVac() {
  const navigate = useNavigate();
  const { t } = useTranslation(["pages", "common"]);

  // Retrieve stored suspension and unit values
  const suspension = localStorage.getItem("suspension");
  const isImperial = localStorage.getItem("units") === "imperial";
  
  const isMultiSeal = suspension === "TF-multi-seal";

  // Dynamic Image & Description Key
  const selectedImage = isMultiSeal ? MultiSealImg : SingleSealImg;
  const descriptionKey = isMultiSeal
    ? "circumferenceTFVacSizing.descriptionMulti"
    : "circumferenceTFVacSizing.descriptionSingle";

  const distance = isImperial ? "2.4 in" : "6 cm";

  const handleConfirm = (res) => {
    localStorage.setItem("circumference", res);
    setTimeout(() => {
      navigate("/sizing/TFlength-vac");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TFsuspension" 
      currentStep={2} 
      totalSteps={4} 
      code={true}
    >
      <div className="w-full max-w-sm">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceTFVacSizing.title", { ns: "pages" })}
        </h1>

        {/* 2. Description (Switches between descriptionSingle and descriptionMulti with Trans support) */}
        <p className="mt-3 text-center text-base text-slate-500">
          <Trans
            ns="pages"
            i18nKey={descriptionKey}
            values={{ distance }}
            components={{
              bold: <strong className="font-bold text-black" />,
              underline: <span className="underline" />,
              br: <br />
            }}
          />
        </p>

        {/* 3. Image (Switches between Single Seal and Multi Seal) */}
        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt={t("common:pages.circumference_tf_vac")}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="w-full">
          <MeasurementInput
            product="tfdistal"
            measurement="circumference"
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </PageWrapper>
  );
}