// src/pages/sizing/liner/tf/Circumference.jsx
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";
// SVG Imports
import tfImperialSvg from "../../../../assets/circumferences/Liner/TF/Imperial.svg";
import tfMetricSvg from "../../../../assets/circumferences/Liner/TF/Metric.svg";

export default function Circumference() {
  const { t } = useTranslation(["pages", "common"]);

  // Unit and dynamic distance / asset selection
  const isImperial = localStorage.getItem("units") === "imperial";
  const distance = isImperial ? "1.5 in" : "4 cm";
  const selectedImage = isImperial ? tfImperialSvg : tfMetricSvg;

  const handleConfirm = (res) => {
    setResult(res);
    localStorage.setItem("circumference", res);
    // Navigate to next step
    //setTimeout(() => navigate("/sizing/TTlength"), 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing/liner/material"
      currentStep={3}
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceLinerSizing.title")}
        </h1>

        {/* 2. Dynamic Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("circumferenceLinerSizing.description", { distance })}
        </p>

        {/* 3. Circumference Image */}
        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt={t("common:pages.circumference_linertf")}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        <div className="w-full">
            <MeasurementInput
                product="tfLiner"
                measurement="circumference"
                onConfirm={handleConfirm}
            />
        </div>
      </div>
    </PageWrapper>
  );
}