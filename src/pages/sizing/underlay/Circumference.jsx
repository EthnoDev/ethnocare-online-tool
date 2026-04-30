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

  // Logic for units and image selection
  const isImperial = localStorage.getItem("units") === "imperial";
  const selectedImage = isImperial ? ImperialImg : MetricImg;
  
  // Updated distance variables: 3.9 in for imperial, 10 cm for metric
  const distance = isImperial ? "3.9 in" : "10 cm";

  const handleConfirm = (value) => {
    localStorage.setItem("underlay_circumference", value);
    
    // 200ms delay before navigation
    setTimeout(() => {
      navigate("/sizing/underlay/silicone"); 
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/underlay/length" 
      currentStep={3} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-100 max-w-md mt-2 flex flex-col items-center">
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
            alt={`${isImperial ? "imperial" : "metric"} circumference diagram`}
            className="h-auto w-full block max-w-[320px]"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="mt-10 w-full">
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