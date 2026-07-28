// src/pages/sizing/liner/ThicknessSelection.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import SelectableOption from "../../../components/SelectableOption";

// Asset Imports - Gel Cushion
import gelCushion3Imperial from "../../../assets/thickness/Gel Cushion/3_imperial.svg";
import gelCushion3Metric from "../../../assets/thickness/Gel Cushion/3_metric.svg";

// Asset Imports - Gel Locking (Pin)
import gelLocking3Imperial from "../../../assets/thickness/Gel Locking/3_imperial.svg";
import gelLocking3Metric from "../../../assets/thickness/Gel Locking/3_metric.svg";

// Asset Imports - TF Silicone Locking
import tfSiliconeLockingImperial from "../../../assets/thickness/TF Silicone Locking/imperial.svg";
import tfSiliconeLockingMetric from "../../../assets/thickness/TF Silicone Locking/metric.svg";

// Asset Imports - TT Silicone Cushion
import ttSiliconeCushion3Imperial from "../../../assets/thickness/TT Silicone Cushion/3_imperial.svg";
import ttSiliconeCushion3Metric from "../../../assets/thickness/TT Silicone Cushion/3_metric.svg";

// Asset Imports - TT Silicone Locking
import ttSiliconeLocking3Imperial from "../../../assets/thickness/TT Silicone Locking/3_imperial.svg";
import ttSiliconeLocking3Metric from "../../../assets/thickness/TT Silicone Locking/3_metric.svg";

export default function ThicknessSelection() {
  const { t } = useTranslation(["pages", "common"]);
  const [selectedThickness, setSelectedThickness] = useState(null);

  // 1. Get localStorage variables
  const linerMaterial = localStorage.getItem("liner_material");
  const suspension = localStorage.getItem("liner_suspension"); // 'cushion' or 'pin'
  const isImperial = localStorage.getItem("units") === "imperial";
  const amputation = localStorage.getItem("amputation"); // 'transfemoral' or 'transtibial'

  const isSilicone = linerMaterial === "s30" || linerMaterial === "s40";
  const isCushion = suspension === "cushion";

  // 2. Resolve image based on decision tree
  const getThicknessImage = () => {
    if (!isSilicone) {
      // GEL MATERIAL (Amputation doesn't matter)
      if (isCushion) {
        return isImperial ? gelCushion3Imperial : gelCushion3Metric;
      } else {
        // Locking / Pin
        return isImperial ? gelLocking3Imperial : gelLocking3Metric;
      }
    } else {
      // SILICONE MATERIAL (Amputation matters)
      if (amputation === "transfemoral") {
        return isImperial
          ? tfSiliconeLockingImperial
          : tfSiliconeLockingMetric;
      } else {
        // Transtibial
        if (isCushion) {
          return isImperial
            ? ttSiliconeCushion3Imperial
            : ttSiliconeCushion3Metric;
        } else {
          // Locking / Pin
          return isImperial
            ? ttSiliconeLocking3Imperial
            : ttSiliconeLocking3Metric;
        }
      }
    }
  };

  // 3. Resolve options based on material, amputation, and units
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
            className="w-74 h-auto object-contain rounded-xl"
        />
        </div>

        {/* 4. Options Container (Restricted to exact image width) */}
        <div className="mt-8 flex items-center justify-center gap-3 w-74 mx-auto">
        {options.map((opt) => (
            <div
            key={opt.id}
            className="flex-1 [&>div]:items-stretch [&_button]:w-full"
            >
            <SelectableOption
                compact
                selected={selectedThickness === opt.id}
                onClick={() => setSelectedThickness(opt.id)}
                label={opt.label}
            />
            </div>
        ))}
        </div>

        {/* 5. Secondary Description */}
        <p className="mt-2 text-center text-sm text-slate-500">
        {t("thicknessLinerSizing.description2")}
        </p>
      </div>
    </PageWrapper>
  );
}