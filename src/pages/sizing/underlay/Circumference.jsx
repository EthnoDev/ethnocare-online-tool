// src/pages/assistance/underlay/Circumference.jsx
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import MeasurementInput from "../../../components/MeasurementInput";

// Assets
import C1ImperialImg from "../../../assets/circumferences/Underlay/C1Imperial.svg";
import C1MetricImg from "../../../assets/circumferences/Underlay/C1Metric.svg";
import CImperialImg from "../../../assets/circumferences/Underlay/CImperial.svg";
import CMetricImg from "../../../assets/circumferences/Underlay/CMetric.svg";

export default function Circumference() {
  const navigate = useNavigate();
  const { t } = useTranslation(["pages", "common"]);

  // Retrieve seal selection from localStorage
  const seal = localStorage.getItem("underlay_seal");

  // Logic for units
  const isImperial = localStorage.getItem("units") === "imperial";

  // Select image based on seal type and units
  const isOpen = seal === "open-seal";
  const selectedImage = isOpen
    ? isImperial
      ? C1ImperialImg
      : C1MetricImg
    : isImperial
    ? CImperialImg
    : CMetricImg;

  // Dynamic distance text: 3.9 in for imperial, 10 cm for metric
  const distance = isImperial ? "3.9 in" : "10 cm";

  const handleConfirm = (value) => {
    localStorage.setItem("underlay_circumference", value);

    setTimeout(() => {
      navigate(
        seal === "closed-seal"
          ? "/sizing/underlay/length"
          : "/sizing/underlay/circumference-2"
      );
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/underlay/seal" 
      currentStep={1} 
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceUnderlaySizing.title")}
        </h1>

        {/* 2. Description with dynamic distance */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("circumferenceUnderlaySizing.description", { distance })}
        </p>

        {/* 3. Image (Conditional based on seal & units) */}
        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt={t("pages.circumference_udtt", { ns: "common" })}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="w-full">
          <MeasurementInput
            product="underlaytt"
            measurement="circumference"
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </PageWrapper>
  );
}