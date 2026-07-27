// src/pages/sizing/liner/ThicknessSelection.jsx
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

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

  const selectedImage = getThicknessImage();

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
            alt={t("common:pages.liner_thickness")}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>
      </div>
    </PageWrapper>
  );
}