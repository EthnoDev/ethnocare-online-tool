// src/pages/sizing/liner/Length.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import SelectableOption from "../../../components/SelectableOption";
import LinerRedirectionPopup2 from "../../../components/LinerRedirectionPopup2";

// Asset Imports
import gelSvg from "../../../assets/lengths/Liner/gel.svg";
import siliconeSvg from "../../../assets/lengths/Liner/silicone.svg";

// Helper function matching MeasurementInput's Gel mapping rules
const mapGelCircumference = (rawVal, isImperial) => {
  const numericVal = parseFloat(rawVal);
  if (isNaN(numericVal)) return null;

  // Convert to cm if input was saved in inches
  const valCm = isImperial ? numericVal * 2.54 : numericVal;

  const matches = [];
  if (valCm >= 15 && valCm <= 22) matches.push("S");
  if (valCm >= 19 && valCm <= 29) matches.push("M");
  if (valCm >= 23 && valCm <= 37) matches.push("L");
  if (valCm >= 27 && valCm <= 40) matches.push("XL");
  if (valCm >= 31 && valCm <= 53) matches.push("XXL");

  return matches.length > 0 ? matches.join(",") : null;
};

export default function Length() {
  const { t } = useTranslation(["pages", "common"]);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Determine back navigation path based on saved amputation type
  const amputation = localStorage.getItem("amputation");
  const isTransfemoral = amputation === "transfemoral";
  const backPath = isTransfemoral
    ? "/sizing/liner/tf/circumference"
    : "/sizing/liner/tt/circumference";

  // Product key used for storing liner measurements
  const productKey = isTransfemoral ? "tfLiner" : "ttLiner";

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
  const handleLeftSelect = () => {
    if (isSilicone) {
      setSelectedOption("small");
      setTimeout(() => {
        setShowPopup(true);
        setSelectedOption(null);
      }, 200);
    } else {
      setSelectedOption("home");
      setTimeout(() => {
        navigate("/");
      }, 200);
    }
  };

  const handleConfirmSelect = () => {
    setSelectedOption("confirm");
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
          {/* Left Option: Dynamic (Small for Silicone, Home for Gel) - Outline Style */}
          <div className="flex-1">
            <SelectableOption
              compact
              selected={selectedOption === (isSilicone ? "small" : "home")}
              onClick={handleLeftSelect}
              label={isSilicone ? t("common:cta.small") : t("common:cta.home")}
            />
          </div>

          {/* Right Option: Always Confirm - Solid Dark Blue Style */}
          <div className="flex-1 [&_button]:bg-[#090C41] [&_button]:text-white [&_button]:border-[#090C41] [&_button]:hover:bg-[#1a1e6f]">
            <SelectableOption
              compact
              variant="solid"
              selected={selectedOption === "confirm"}
              onClick={handleConfirmSelect}
              label={t("common:cta.confirm")}
            />
          </div>
        </div>
      </div>

      {/* 5. Too Small Popup (Silicone Flow) */}
      {showPopup && (
        <LinerRedirectionPopup2
          onClose={() => setShowPopup(false)}
          onSelectGel={() => {
            // 1. Switch material to gel
            localStorage.setItem("liner_material", "gel");

            // 2. Retrieve raw circumference saved from previous step
            const rawCircumference = localStorage.getItem("raw_circumference");

            // 3. Recalculate Gel size mapping
            const mappedGelSize = mapGelCircumference(rawCircumference, isImperial);

            if (mappedGelSize) {
              // Store mapped size under both generic and product-specific keys
              localStorage.setItem("circumference", mappedGelSize);
            }

            // 4. Navigate to suspension page
            navigate("/sizing/liner/suspension");
          }}
          onHome={() => {
            navigate("/");
          }}
        />
      )}
    </PageWrapper>
  );
}