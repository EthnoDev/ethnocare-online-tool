// src/pages/assistance/underlay/Length.jsx
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import MeasurementInput from "../../../components/MeasurementInput";

// Length Image
import NewLengthImg from "../../../assets/lengths/Underlay/newLength.svg";

export default function Length() {
  const navigate = useNavigate();
  const { t } = useTranslation(["pages", "common"]);

  // Retrieve selected seal type from localStorage
  const seal = localStorage.getItem("underlay_seal");

  // Dynamic back path based on seal type
  const backTo = seal === "closed-seal" 
    ? "/sizing/underlay/circumference" 
    : "/sizing/underlay/circumference-2";

  const handleConfirm = (value) => {
    // Store the value returned from the component
    localStorage.setItem("underlay_length", value);

    setTimeout(() => {
      navigate("/sizing/underlay/size");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo={backTo} 
      currentStep={seal === "closed-seal" ? 3 : 4} 
      code={true}
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthUnderlaySizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("lengthUnderlaySizing.description")}
        </p>

        {/* 3. Image */}
        <div className="mt-8 flex justify-center">
          <img
            src={NewLengthImg}
            alt={t("common:pages.length_udtt")}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="w-full">
          <MeasurementInput
            product="underlaytt"
            measurement="length"
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </PageWrapper>
  );
}