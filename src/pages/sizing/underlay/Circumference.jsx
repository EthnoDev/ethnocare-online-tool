import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
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
  const isOpen = seal === "open-seal";

  // Logic for units
  const isImperial = localStorage.getItem("units") === "imperial";

  // Select image based on seal type and units
  const selectedImage = isOpen
    ? isImperial
      ? C1ImperialImg
      : C1MetricImg
    : isImperial
    ? CImperialImg
    : CMetricImg;

  // Dynamic title key based on seal type
  const titleKey = isOpen
    ? "circumferenceUnderlaySizing.title2"
    : "circumferenceUnderlaySizing.title";

  // Dynamic distance text: 4 in / 10 cm for open, 1.5 in / 4 cm for closed
  const distance = isOpen
    ? isImperial
      ? "4 in"
      : "10 cm"
    : isImperial
    ? "1.5 in"
    : "4 cm";

  const handleConfirm = (value) => {
    localStorage.setItem("underlay_circumference", value);

    setTimeout(() => {
      navigate(
        isOpen
          ? "/sizing/underlay/circumference-2"
          : "/sizing/underlay/length"
      );
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/underlay/seal" 
      currentStep={2} 
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title (Dynamic based on open/closed seal) */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t(titleKey)}
        </h1>

        {/* 2. Description with dynamic distance and Trans support */}
        <p className="mt-3 text-center text-base text-slate-500">
          <Trans
            ns="pages"
            i18nKey="circumferenceUnderlaySizing.description"
            values={{ distance }}
            components={{
              bold: <strong className="font-bold text-black" />,
              underline: <span className="underline" />,
              br: <br />
            }}
          />
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