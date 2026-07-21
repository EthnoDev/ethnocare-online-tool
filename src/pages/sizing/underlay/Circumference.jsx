import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import MeasurementInput from "../../../components/MeasurementInput";

// Assets
import MetricImg from "../../../assets/circumferences/Underlay/Metric.svg";
import ImperialImg from "../../../assets/circumferences/Underlay/Imperial.svg";

export default function Circumference() {
  const navigate = useNavigate();
  const { t } = useTranslation(["pages", "common"]);

  // Retrieve seal selection from localStorage
  const seal = localStorage.getItem("underlay_seal");

  // Dynamic back path and step based on seal type
  const backTo = seal === "closed-seal" ? "/sizing/underlay/length" : "/sizing/underlay/seal";
  const currentStep = seal === "closed-seal" ? 3 : 2;

  // Logic for units and image selection
  const isImperial = localStorage.getItem("units") === "imperial";
  const selectedImage = isImperial ? ImperialImg : MetricImg;
  
  // Dynamic distance text: 3.9 in for imperial, 10 cm for metric
  const distance = isImperial ? "3.9 in" : "10 cm";

  const handleConfirm = (value) => {
    localStorage.setItem("underlay_circumference", value);
    
    // Dynamic navigation based on seal type
    setTimeout(() => {
      navigate(
        seal === "closed-seal"
          ? "/sizing/underlay/size"
          : "/sizing/underlay/circumference-2"
      ); 
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo={backTo} 
      currentStep={currentStep} 
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceUnderlaySizing.title")}
        </h1>

        {/* 2. Description with updated 3.9 in / 10 cm distance */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("circumferenceUnderlaySizing.description", { distance })}
        </p>

        {/* 3. Image (Conditional based on units) */}
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