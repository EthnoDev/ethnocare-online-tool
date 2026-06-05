import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

/** ---------- Assets ---------- */
import ImperialImg from "../../../../assets/circumferences/Liner/TT/Imperial.svg";
import MetricImg from "../../../../assets/circumferences/Liner/TT/Metric.svg";

export default function LinerTTCircumference() {
  const navigate = useNavigate();
  const { t } = useTranslation(["pages", "common"]);

  /** ---------- Data Retrieval ---------- */
  const units = localStorage.getItem("units");
  const isImperial = units === "imperial";
  const distance = isImperial ? "1.6 in" : "4 cm";
  
  // Decide which image to show
  const displayImage = isImperial ? ImperialImg : MetricImg;

  const [value, setValue] = useState("");

  const handleNext = (inputValue) => {
    if (!inputValue) return;

    // Save the raw circumference measurement
    localStorage.setItem("circumference", inputValue);

    // Navigate to the next step (usually Length)
    setTimeout(() => {
      navigate("/sizing/liner/tt/length");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/product" 
      currentStep={1} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceLinerTTSizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("circumferenceLinerTTSizing.description", { ns: "pages", distance })}
        </p>

        {/* 3. Dynamic Image */}
        <div className="mt-8 flex justify-center">
          <img
            src={displayImage}
            alt={`Circumference measurement in ${units}`}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="w-full">
          <MeasurementInput
            product="tfstandard"
            measurement="circumference"
            onConfirm={handleNext}
          />
        </div>
      </div>
    </PageWrapper>
  );
}