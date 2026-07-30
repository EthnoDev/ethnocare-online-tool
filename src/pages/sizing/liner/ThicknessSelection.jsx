// src/pages/sizing/liner/ThicknessSelection.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import SelectableOption from "../../../components/SelectableOption";

// Asset Imports - Gel Cushion
import gelCushion3Imperial from "../../../assets/thickness/Gel Cushion/3_imperial.svg";
import gelCushion3Metric from "../../../assets/thickness/Gel Cushion/3_metric.svg";
import gelCushion6Imperial from "../../../assets/thickness/Gel Cushion/6_imperial.svg";
import gelCushion6Metric from "../../../assets/thickness/Gel Cushion/6_metric.svg";
import gelCushion9Imperial from "../../../assets/thickness/Gel Cushion/9_imperial.svg";
import gelCushion9Metric from "../../../assets/thickness/Gel Cushion/9_metric.svg";

// Asset Imports - Gel Locking (Pin)
import gelLocking3Imperial from "../../../assets/thickness/Gel Locking/3_imperial.svg";
import gelLocking3Metric from "../../../assets/thickness/Gel Locking/3_metric.svg";
import gelLocking6Imperial from "../../../assets/thickness/Gel Locking/6_imperial.svg";
import gelLocking6Metric from "../../../assets/thickness/Gel Locking/6_metric.svg";
import gelLocking9Imperial from "../../../assets/thickness/Gel Locking/9_imperial.svg";
import gelLocking9Metric from "../../../assets/thickness/Gel Locking/9_metric.svg";

// Asset Imports - TF Silicone Locking (Only 1 size variation)
import tfSiliconeLockingImperial from "../../../assets/thickness/TF Silicone Locking/imperial.svg";
import tfSiliconeLockingMetric from "../../../assets/thickness/TF Silicone Locking/metric.svg";

// Asset Imports - TT Silicone Cushion
import ttSiliconeCushion3Imperial from "../../../assets/thickness/TT Silicone Cushion/3_imperial.svg";
import ttSiliconeCushion3Metric from "../../../assets/thickness/TT Silicone Cushion/3_metric.svg";
import ttSiliconeCushion6Imperial from "../../../assets/thickness/TT Silicone Cushion/6_imperial.svg";
import ttSiliconeCushion6Metric from "../../../assets/thickness/TT Silicone Cushion/6_metric.svg";

// Asset Imports - TT Silicone Locking
import ttSiliconeLocking3Imperial from "../../../assets/thickness/TT Silicone Locking/3_imperial.svg";
import ttSiliconeLocking3Metric from "../../../assets/thickness/TT Silicone Locking/3_metric.svg";
import ttSiliconeLocking6Imperial from "../../../assets/thickness/TT Silicone Locking/6_imperial.svg";
import ttSiliconeLocking6Metric from "../../../assets/thickness/TT Silicone Locking/6_metric.svg";

export default function ThicknessSelection() {
  const navigate = useNavigate();
  const { t } = useTranslation(["pages", "common"]);

  const [selectedThickness, setSelectedThickness] = useState(null);
  const [confirmSelected, setConfirmSelected] = useState(false);
  const [error, setError] = useState("");

  const optionsRef = useRef(null);

  // 1. Get localStorage variables
  const linerMaterial = localStorage.getItem("liner_material");
  const suspension = localStorage.getItem("liner_suspension"); // 'cushion' or 'pin'
  const isImperial = localStorage.getItem("units") === "imperial";
  const amputation = localStorage.getItem("amputation"); // 'transfemoral' or 'transtibial'

  const isSilicone = linerMaterial === "s30" || linerMaterial === "s40";
  const isCushion = suspension === "cushion";

  // 2. Map imported SVG images into clean lookup dictionaries
  const gelCushionImages = {
    "3mm_imperial": gelCushion3Imperial,
    "3mm_metric": gelCushion3Metric,
    "6mm_imperial": gelCushion6Imperial,
    "6mm_metric": gelCushion6Metric,
    "9mm_imperial": gelCushion9Imperial,
    "9mm_metric": gelCushion9Metric,
  };

  const gelLockingImages = {
    "3mm_imperial": gelLocking3Imperial,
    "3mm_metric": gelLocking3Metric,
    "6mm_imperial": gelLocking6Imperial,
    "6mm_metric": gelLocking6Metric,
    "9mm_imperial": gelLocking9Imperial,
    "9mm_metric": gelLocking9Metric,
  };

  const ttSiliconeCushionImages = {
    "3mm_imperial": ttSiliconeCushion3Imperial,
    "3mm_metric": ttSiliconeCushion3Metric,
    "6mm_imperial": ttSiliconeCushion6Imperial,
    "6mm_metric": ttSiliconeCushion6Metric,
  };

  const ttSiliconeLockingImages = {
    "3mm_imperial": ttSiliconeLocking3Imperial,
    "3mm_metric": ttSiliconeLocking3Metric,
    "6mm_imperial": ttSiliconeLocking6Imperial,
    "6mm_metric": ttSiliconeLocking6Metric,
  };

  // 3. Helper to normalize selected label back to a millimeter key ('3mm', '6mm', '9mm', '2mm') for SVG lookup
  const getNormalizedThicknessKey = () => {
    if (!selectedThickness) return "3mm";

    // Imperial to mm mapping
    if (selectedThickness.includes("0.11")) return "3mm";
    if (selectedThickness.includes("0.23")) return "6mm";
    if (selectedThickness.includes("0.35")) return "9mm";
    if (selectedThickness.includes("0.07")) return "2mm";

    // Metric parsing
    return selectedThickness.replace(/\s+/g, ""); // "3 mm" -> "3mm"
  };

  // 4. Resolve dynamic image based on selected state + decision tree
  const getThicknessImage = () => {
    const activeThickness = getNormalizedThicknessKey();
    const unitKey = isImperial ? "imperial" : "metric";
    const imageKey = `${activeThickness}_${unitKey}`;

    if (!isSilicone) {
      // GEL MATERIAL
      if (isCushion) {
        return gelCushionImages[imageKey] || gelCushion3Metric;
      } else {
        // Locking / Pin
        return gelLockingImages[imageKey] || gelLocking3Metric;
      }
    } else {
      // SILICONE MATERIAL
      if (amputation === "transfemoral") {
        // TF Silicone (Has no 3mm/6mm variants)
        return isImperial
          ? tfSiliconeLockingImperial
          : tfSiliconeLockingMetric;
      } else {
        // Transtibial
        if (isCushion) {
          return (
            ttSiliconeCushionImages[imageKey] || ttSiliconeCushion3Metric
          );
        } else {
          // Locking / Pin
          return (
            ttSiliconeLockingImages[imageKey] || ttSiliconeLocking3Metric
          );
        }
      }
    }
  };

  // 5. Resolve options based on material, amputation, and units
  const getThicknessOptions = () => {
    if (!isSilicone) {
      // GEL: 3 options
      return isImperial
        ? [
            { id: "3mm", label: "0.11 in" },
            { id: "6mm", label: "0.23 in" },
            { id: "9mm", label: "0.35 in" },
          ]
        : [
            { id: "3mm", label: "3 mm" },
            { id: "6mm", label: "6 mm" },
            { id: "9mm", label: "9 mm" },
          ];
    } else {
      // SILICONE
      if (amputation === "transfemoral") {
        // TF Silicone: 1 option
        return isImperial
          ? [{ id: "2mm", label: "0.07 in" }]
          : [{ id: "2mm", label: "2 mm" }];
      } else {
        // TT Silicone: 2 options
        return isImperial
          ? [
              { id: "3mm", label: "0.11 in" },
              { id: "6mm", label: "0.23 in" },
            ]
          : [
              { id: "3mm", label: "3 mm" },
              { id: "6mm", label: "6 mm" },
            ];
      }
    }
  };

  const selectedImage = getThicknessImage();
  const options = getThicknessOptions();

  const validate = () => {
    if (!selectedThickness) {
      setError("thicknessLinerSizing.error"); 
      return optionsRef.current;
    }
    return null;
  };

  const handleConfirm = () => {
    setConfirmSelected(true);
    setTimeout(() => setConfirmSelected(false), 200);

    const firstErrorEl = validate();
    if (firstErrorEl) {
      firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Save unit-aware selection (opt.label) to localStorage
    localStorage.setItem("liner_thickness", selectedThickness);

    // Navigate to final size result page
    setTimeout(() => {
      navigate("/sizing/liner/size");
    }, 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing/liner/suspension"
      currentStep={6}
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("thicknessLinerSizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("thicknessLinerSizing.description")}
        </p>

        {/* 3. Image Display */}
        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt={t("common:pages.thickness_liner")}
            className="w-74 h-auto object-contain rounded-xl transition-all duration-200"
          />
        </div>

        {/* 4. Options Container */}
        <div
          ref={optionsRef}
          className="mt-8 flex flex-col items-center w-74 mx-auto"
          aria-invalid={!!error}
        >
          <div className="flex items-center justify-center gap-3 w-full">
            {options.map((opt) => (
              <div
                key={opt.id}
                className="flex-1 [&>div]:items-stretch [&_button]:w-full"
              >
                <SelectableOption
                  compact
                  selected={selectedThickness === opt.label}
                  onClick={() => {
                    setSelectedThickness(opt.label);
                    if (error) setError("");
                  }}
                  label={opt.label}
                />
              </div>
            ))}
          </div>

          {/* Validation Error Message */}
          {error && (
            <p
              className="mt-3 text-center text-sm text-red-600"
              role="alert"
              aria-live="polite"
            >
              {t(error)}
            </p>
          )}
        </div>

        {/* 5. Secondary Description */}
        <p className="mt-2 text-center text-sm text-slate-500">
          {t("thicknessLinerSizing.description2")}
        </p>

        {/* 6. Confirm Button */}
        <div className="mt-12 w-74 mx-auto [&>div]:items-stretch [&_button]:w-full">
          <SelectableOption
            label={t("common:cta.confirm")}
            selected={confirmSelected}
            onClick={handleConfirm}
          />
        </div>
      </div>
    </PageWrapper>
  );
}