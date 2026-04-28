import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import VacCImg from "../../../../assets/circumferences/TF/vacC.svg";
import VacIImg from "../../../../assets/circumferences/TF/vacI.svg";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];

export default function CircumferenceVac() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["pages", "common"]);

  // Logic to determine if we show Metric (C) or Imperial (I) image
  const isImperial = localStorage.getItem("units") === "imperial";
  const selectedImage = isImperial ? VacIImg : VacCImg;
  const distance = isImperial ? "2.4 in" : "6 cm";

  const handleConfirm = (res) => {
    localStorage.setItem("circumference", res);
    //setTimeout(() => {
      // Step 3 -> 4: Final step is usually Orientation or Results
      //navigate("/sizing/TForientation");
    //}, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TFlength-vac" 
      currentStep={3} 
      totalSteps={4} 
      code={true}
    >
      <div className="w-full max-w-md mt-2">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceTFVacSizing.title", { ns: "pages" })}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("circumferenceTFVacSizing.description", { ns: "pages", distance })}
        </p>

        {/* 3. Image (Switches between Inch and CM version) */}
        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt="TF Vacuum Circumference Measurement"
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="mt-8 flex flex-col items-center">
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