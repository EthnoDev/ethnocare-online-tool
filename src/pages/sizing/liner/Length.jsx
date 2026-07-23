// src/pages/sizing/liner/Length.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import SelectableOption from "../../../components/SelectableOption";

// Asset Imports
import gelSvg from "../../../assets/lengths/Liner/gel.svg";
import siliconeSvg from "../../../assets/lengths/Liner/silicone.svg";

export default function Length() {
  const { t } = useTranslation(["pages", "common"]);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);

  // Determine back navigation path based on saved amputation type
  const amputation = localStorage.getItem("amputation");
  const backPath =
    amputation === "transfemoral"
      ? "/sizing/liner/tf/circumference"
      : "/sizing/liner/tt/circumference";

  // Determine dynamic distance string based on units & material
  const isImperial = localStorage.getItem("units") === "imperial";
  const linerMaterial = localStorage.getItem("liner_material");
  const isSilicone = linerMaterial === "s30" || linerMaterial === "s40";

  let distance = "";
  if (isSilicone) {
    distance = isImperial ? "13.8 in ± 0.8 in" : "35 cm ± 2 cm";
  } else {
    // Gel
    distance = isImperial ? "15.7 in ± 0.8 in" : "40 cm ± 2 cm";
  }

  // Select image based on material
  const selectedImage = isSilicone ? siliconeSvg : gelSvg;

  // Handlers for option selections
  const handleSmallSelect = () => {
    setSelectedOption("small");
    localStorage.setItem("length_choice", "small");
  };

  const handleConfirmSelect = () => {
    setSelectedOption("confirm");

    // Navigate to suspension page with smooth feedback delay
    setTimeout(() => {
      navigate("/sizing/liner/suspension");
    }, 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo={backPath}
      currentStep={4}
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthLinerSizing.title")}
        </h1>

        {/* 2. Description with dynamic distance translation */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("lengthLinerSizing.description", { distance })}
        </p>

        {/* 3. Length Image */}
        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt={isSilicone ? "Silicone Liner Length" : "Gel Liner Length"}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Horizontal Options */}
        <div className="mt-8 flex items-center justify-center">
          <div className="flex-1">
            <SelectableOption
              compact
              selected={selectedOption === "small"}
              onClick={handleSmallSelect}
              label={t("common:cta.small")}
            />
          </div>

          <div className="flex-1">
            <SelectableOption
              compact
              selected={selectedOption === "confirm"}
              onClick={handleConfirmSelect}
              label={t("common:cta.confirm")}
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}