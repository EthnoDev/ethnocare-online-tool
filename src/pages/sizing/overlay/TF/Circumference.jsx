import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import PinCImg from "../../../../assets/circumferences/TF/pinC.svg";
import PinIImg from "../../../../assets/circumferences/TF/pinI.svg";

export default function Circumference() {
  const navigate = useNavigate();
  const { t } = useTranslation(["pages", "common"]);

  // Logic to determine if we show Metric (C) or Imperial (I) image
  const isImperial = localStorage.getItem("units") === "imperial";
  const selectedImage = isImperial ? PinIImg : PinCImg;
  const distance = isImperial ? "3.1 in" : "8 cm";

  const handleConfirm = (res) => {
    localStorage.setItem("circumference", res);
    setTimeout(() => {
      navigate("/sizing/TFsize");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TFlength" 
      currentStep={3} 
      totalSteps={4} 
      code={true}
    >
      <div className="w-full max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceTFVacSizing.title", { ns: "pages" })}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("circumferenceTFVacSizing.description", { ns: "pages", distance })}
        </p>

        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt="TF Circumference Measurement"
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        <div className="mt-8 flex flex-col items-center">
          <MeasurementInput
            product="tfstandard"
            measurement="circumference"
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </PageWrapper>
  );
}