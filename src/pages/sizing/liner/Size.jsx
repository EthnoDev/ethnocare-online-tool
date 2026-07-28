// src/pages/sizing/liner/Size.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

// Product Assets
import cushionGelLinerImg from "../../../assets/products/cushionGelLiner.svg";
import cushionSilLinerImg from "../../../assets/products/cushionSilLiner.svg";
import pinGelLinerImg from "../../../assets/products/pinGelLiner.svg";
import pinSilLinerImg from "../../../assets/products/pinSilLiner.svg";

export default function SizeLiner() {
  const navigate = useNavigate();
  const [isRestarting, setIsRestarting] = useState(false);
  const { t, i18n } = useTranslation(["pages", "common"]);

  /** ---------- Data Retrieval ---------- */
  const unit = localStorage.getItem("units") === "imperial" ? "in" : "cm";

  // Amputation
  const rawAmputation = localStorage.getItem("amputation") || "tf"; 
  let amputation = rawAmputation.charAt(0).toUpperCase() + rawAmputation.slice(1).toLowerCase();

  if (amputation.toLowerCase() === "transfemoral" && i18n.language.startsWith("fr")) {
    amputation = "Transfémoral";
  }

  // Activity Level
  const rawActivity = localStorage.getItem("liner_activity_level") || "—";
  const activityLevel = rawActivity !== "—" ? rawActivity.toUpperCase() : "—";
    
  // Material
  const linerMaterial = localStorage.getItem("liner_material") || "—"; // 's30', 's40', or 'gel'
  const materialLabel = linerMaterial !== "—" ? linerMaterial.toUpperCase() : "—";

  // Circumference & Length
  const circumferenceMapped = localStorage.getItem("liner_circumference") || localStorage.getItem("raw_circumference") || "XX";
  const circumferenceRaw = localStorage.getItem("raw_circumference") || "—";
  const lengthRaw = localStorage.getItem("raw_length") || "—";

  // Suspension
  const suspension = localStorage.getItem("liner_suspension") || "—"; // 'cushion' or 'pin'
  const suspensionLabel =
    suspension !== "—"
      ? t(`suspension.${suspension}`, { ns: "common", defaultValue: suspension.charAt(0).toUpperCase() + suspension.slice(1) })
      : "—";

  // Thickness
  const thicknessRaw = localStorage.getItem("liner_thickness") || "—"; // e.g., '3mm', '6mm', '3-6mm', '3-9mm', or just numbers '3', '6'
  // Extract digits/hyphens for code formatting (e.g., "3mm" -> "3", "3-6mm" -> "3-6")
  const thicknessCode = thicknessRaw.replace(/[^0-9-]/g, "") || "X";

  // Material & System Checks
  const isSilicone = linerMaterial === "s30" || linerMaterial === "s40";
  const isCushion = suspension === "cushion";
  const isPin = suspension === "pin";
  const suspensionCode = isCushion ? "C" : isPin ? "L" : "X";

  const ampKey = rawAmputation.toLowerCase();

  /** ---------- Size Code Logic ---------- */
  const getSizeCode = () => {
    // 1. Transtibial + S30 (Pin or Cushion)
    if (ampKey === "transtibial" && linerMaterial === "s30") {
      return `LNR-SIL-${suspensionCode}-${thicknessCode}-${circumferenceMapped}-30`;
    }

    // 2. Transtibial + S40 (Pin or Cushion) -> Fixed thickness 3
    if (ampKey === "transtibial" && linerMaterial === "s40") {
      return `LNR-SIL-${suspensionCode}-3-${circumferenceMapped}-40`;
    }

    // 3. Transfemoral + S40 + Pin -> Fixed thickness 2
    if (ampKey === "transfemoral" && linerMaterial === "s40" && isPin) {
      return `LNR-TF-SIL-L-2-${circumferenceMapped}-40`;
    }

    // 4. Transtibial OR Transfemoral + Gel (Pin or Cushion)
    if ((ampKey === "transtibial" || ampKey === "transfemoral") && (linerMaterial === "gel" || !isSilicone)) {
      return `LNR-GEL-${suspensionCode}-${thicknessCode}-${circumferenceMapped}`;
    }

    // Fallback default format
    return `LNR-${circumferenceMapped}`;
  };

  const sizeCode = getSizeCode();

  /** ---------- Product Image Selection ---------- */
  const getProductImage = () => {
    if (isSilicone) {
      return isCushion ? cushionSilLinerImg : pinSilLinerImg;
    } else {
      return isCushion ? cushionGelLinerImg : pinGelLinerImg;
    }
  };

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => navigate("/sizing/product"), 200);
  };

  return (
    <PageWrapper 
      showBack 
      backTo="/sizing/liner/thickness" 
      currentStep={7} 
      code={true}
    >
      <div className="w-full max-w-2xl text-center">
        {/* 1. Title */}
        <h1 className="text-3xl font-semibold font-sans mb-2 text-slate-900">
          {t("LinerSizing.title")}
        </h1>

        {/* 2. Primary Size Code Display */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-4xl font-bold font-sans text-[#090C41]">{sizeCode}</p>
        </div>

        {/* 3. Product Summary Card */}
        <div className="w-full max-w-md mx-auto flex flex-row items-start justify-center gap-8 text-left mt-6 mb-10">
          <img
            src={getProductImage()}
            alt="Liner Product"
            className="w-[140px] h-auto object-contain rounded-xl"
          />

          <div className="flex flex-col justify-between text-sm text-gray-700 font-sans h-full">
            <div className="space-y-1">
              <p className="text-slate-900">
                <strong>{t("LinerSizing.description")}</strong>
              </p>
              
              <p>{t("LinerSizing.amp")}: {amputation}</p>
              <p>{t("LinerSizing.activityLevel")}: {activityLevel}</p>
              <p>{t("LinerSizing.material")}: {materialLabel}</p>
              <p>
                {t("LinerSizing.circumference")}: {circumferenceRaw} {unit}
              </p>
              <p>
                {t("LinerSizing.length")}: {lengthRaw} {unit}
              </p>
              <p>{t("LinerSizing.suspension")}: {suspensionLabel}</p>
              <p>{t("LinerSizing.thickness")}: {thicknessRaw}</p>
            </div>
          </div>
        </div>

        {/* 4. Restart Button */}
        <div className="flex justify-center">
          <button
            onClick={handleRestart}
            className={`px-6 py-3 text-base rounded-md border font-sans font-bold transition-all cursor-pointer uppercase
              ${isRestarting
                ? "bg-[#090C41] text-white border-[#090C41]"
                : "bg-white text-black border-gray-300 hover:border-black"
              }`}
          >
            {t("cta.restart", { ns: "common" })}
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}