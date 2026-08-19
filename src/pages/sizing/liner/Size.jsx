// src/pages/sizing/liner/Size.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import EmailCapture from "../../../components/EmailCapture";

// Product Assets
import cushionGelLinerImg from "../../../assets/products/cushionGelLiner.png";
import cushionSilLinerImg from "../../../assets/products/cushionSilLiner.png";
import pinGelLinerImg from "../../../assets/products/pinGelLiner.png";
import pinSilLinerImg from "../../../assets/products/pinSilLiner.png";

// UI Assets
import RedirectLogo from "../../../assets/redirect-logo.svg";

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
  const materialLabel =
    linerMaterial !== "—"
      ? linerMaterial.charAt(0).toUpperCase() + linerMaterial.slice(1)
      : "—";

  // Circumference & Length
  const circumferenceMapped = localStorage.getItem("circumference") || "XX";
  const circumferenceRaw = localStorage.getItem("raw_circumference") || "—";
  const lengthRaw = localStorage.getItem("raw_length") || "—";

  // Suspension
  const suspension = localStorage.getItem("liner_suspension") || "—"; // 'cushion' or 'pin'
  const suspensionLabel =
    suspension !== "—"
      ? t(`suspension.${suspension}`, { ns: "common", defaultValue: suspension.charAt(0).toUpperCase() + suspension.slice(1) })
      : "—";

  // Thickness (Raw label displayed in summary card, e.g. "0.11 in" or "3 mm")
  const thicknessRaw = localStorage.getItem("liner_thickness") || "—";

  /** ---------- Metric Thickness Conversion for SKU Code ---------- */
  const getMetricThicknessCode = (raw) => {
    if (!raw || raw === "—") return "X";

    // Imperial value checks
    if (raw.includes("0.11")) return "3";
    if (raw.includes("0.23")) return "6";
    if (raw.includes("0.35")) return "9";
    if (raw.includes("0.07")) return "2";

    // Metric fallback: extract numbers/hyphens (e.g. "3 mm" -> "3", "3-6mm" -> "3-6")
    const cleaned = raw.replace(/[^0-9-]/g, "");
    return cleaned || "X";
  };

  const thicknessCode = getMetricThicknessCode(thicknessRaw);

  // Material & System Checks
  const isSilicone = linerMaterial === "s30" || linerMaterial === "s40";
  const isCushion = suspension === "cushion";
  const isPin = suspension === "pin";
  const suspensionCode = isCushion ? "C" : isPin ? "L" : "X";

  const ampKey = rawAmputation.toLowerCase();

  /** ---------- Size Code Logic ---------- */
  const productAmputation = t("common:products.underlay tt");

  const getSizeCode = () => {
    // Split circumferenceMapped by commas
    const parts = circumferenceMapped.split(",").map((p) => p.trim());
    const commaCount = parts.length - 1;

    let primaryCircumference = circumferenceMapped;

    if (commaCount === 1) {
      primaryCircumference = parts[0];
    } else if (commaCount === 2) {
      primaryCircumference = parts[1];
    }

    if (ampKey === "transtibial" && linerMaterial === "s30") {
      return `LNR-SIL-${suspensionCode}-${thicknessCode}-${primaryCircumference}-30`;
    }

    if (ampKey === "transtibial" && linerMaterial === "s40") {
      return `LNR-SIL-${suspensionCode}-3-${primaryCircumference}-40`;
    }

    if (ampKey === "transfemoral" && linerMaterial === "s40" && isPin) {
      return `LNR-TF-SIL-L-2-${primaryCircumference}-40`;
    }

    if ((ampKey === "transtibial" || ampKey === "transfemoral") && (linerMaterial === "gel" || !isSilicone)) {
      // Format 6mm and 9mm as tapered profiles (3-6 and 3-9)
      let gelThicknessFormatted = thicknessCode;
      if (thicknessCode === "6") gelThicknessFormatted = "3-6";
      if (thicknessCode === "9") gelThicknessFormatted = "3-9";

      return `LNR-GEL-${suspensionCode}-${gelThicknessFormatted}-${primaryCircumference}`;
    }

    return `LNR-${primaryCircumference}`;
  };

  const sizeCode = getSizeCode();

  /** ---------- Alternate Size Codes Logic ---------- */
  const getAlternateSizeCodes = () => {
    const parts = circumferenceMapped.split(",").map((p) => p.trim());
    if (parts.length <= 1) return [];

    // Helper to format a SKU with a specific circumference part
    const formatSku = (circPart) => {
      if (ampKey === "transtibial" && linerMaterial === "s30") {
        return `LNR-SIL-${suspensionCode}-${thicknessCode}-${circPart}-30`;
      }
      if (ampKey === "transtibial" && linerMaterial === "s40") {
        return `LNR-SIL-${suspensionCode}-3-${circPart}-40`;
      }
      if (ampKey === "transfemoral" && linerMaterial === "s40" && isPin) {
        return `LNR-TF-SIL-L-2-${circPart}-40`;
      }
      if ((ampKey === "transtibial" || ampKey === "transfemoral") && (linerMaterial === "gel" || !isSilicone)) {
        let gelThicknessFormatted = thicknessCode;
        if (thicknessCode === "6") gelThicknessFormatted = "3-6";
        if (thicknessCode === "9") gelThicknessFormatted = "3-9";

        return `LNR-GEL-${suspensionCode}-${gelThicknessFormatted}-${circPart}`;
      }
      return `LNR-${circPart}`;
    };

    // 1 comma -> 2 parts -> primary took index 0, so alternate is index 1
    if (parts.length === 2) {
      return [formatSku(parts[1])];
    }

    // 2 commas -> 3 parts -> primary took index 1, so alternates are index 0 and index 2
    if (parts.length === 3) {
      return [formatSku(parts[0]), formatSku(parts[2])];
    }

    return [];
  };

  const alternateSizeCodes = getAlternateSizeCodes();

  /** ---------- Product Image Selection ---------- */
  const getProductImage = () => {
    if (isSilicone) {
      return isCushion ? cushionSilLinerImg : pinSilLinerImg;
    } else {
      return isCushion ? cushionGelLinerImg : pinGelLinerImg;
    }
  };

  /** ---------- Dynamic Alt Text ---------- */
  const getProductImageAlt = () => {
    if (ampKey === "transfemoral") {
      return t("products.liner tf", { ns: "common" });
    }
    return t("products.liner tt", { ns: "common" });
  };

  /** ---------- Dynamic PDF Handlers ---------- */
  const handleOpenSizingChart = () => {
    const isFrench = i18n.language?.startsWith("fr");
    const chartPath = isFrench
      ? "/Sizing Charts/LNR_SIZING-CHART_FR.pdf"
      : "/Sizing Charts/LNR_SIZING-CHART_EN.pdf";
    openPdf(chartPath);
  };

  const handleOpenCatalog = () => {
    openPdf("/Sizing Charts/LNR_CATALOGUE_EN.pdf");
  };

  const openPdf = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => navigate("/sizing/product"), 200);
  };

  return (
    <PageWrapper 
      showBack 
      backTo="/sizing/liner/thickness" 
      code={true}
    >
      <div className="w-full max-w-2xl text-center">
        {/* 1. Title */}
        <h1 className="text-3xl font-semibold font-sans mb-2 text-slate-900">
          {t("LinerSizing.title")}
        </h1>

        {/* 2. Primary Size Code Display & Length */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-4xl font-bold font-sans">{sizeCode}</p>
          <p className="text-lg font-medium text-slate-800 font-sans">
            {t("LinerSizing.length")} {lengthRaw} {unit}
          </p>
        </div>

        {/* 3. Product Summary Card */}
        <div className="w-full max-w-md mx-auto flex flex-row items-stretch justify-center gap-8 text-left mt-8 mb-6">
          
          {/* Left Column: Fixed width image container */}
          <div className="shrink-0 flex items-center justify-center">
            <img
              src={getProductImage()}
              alt={getProductImageAlt()}
              className="h-full w-[160px] object-contain rounded-xl"
            />
          </div>

          {/* Right Column: Defines the natural height of the card */}
          <div className="flex flex-col justify-between text-sm text-gray-700 font-sans flex-1">
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
              <p>{t("LinerSizing.suspension")}: {suspensionLabel}</p>
              <p>{t("LinerSizing.thickness")}: {thicknessRaw}</p>
            </div>

            {/* Product Documentation Section */}
            <div className="p-4 border border-gray-200 rounded-2xl bg-gray-200/80">
              <h2 className="text-base font-bold text-slate-900 mb-1">
                {t("LinerSizing.prodDocTitle")}
              </h2>
              <p className="text-sm text-slate-700 leading-snug mb-2">
                {t("LinerSizing.prodDocDescription")}
              </p>

              <div className="flex flex-col gap-1.5 items-start">
                <button
                  type="button"
                  onClick={handleOpenSizingChart}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <span className="text-sm underline underline-offset-4 decoration-[1px]">
                    {t("LinerSizing.prodDocLinerSizing")}
                  </span>
                  <img
                    src={RedirectLogo}
                    alt=""
                    aria-hidden="true"
                    className="h-3 w-4 ml-0 mt-0"
                  />
                </button>

                <button
                  type="button"
                  onClick={handleOpenCatalog}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <span className="text-sm underline underline-offset-4 decoration-[1px]">
                    {t("LinerSizing.prodDocLinerCatalog")}
                  </span>
                  <img
                    src={RedirectLogo}
                    alt=""
                    aria-hidden="true"
                    className="h-3 w-4 ml-0 mt-0"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3b. Conditional Title & Alternate Options Section */}
        {alternateSizeCodes.length > 0 && (
          <div className="w-full max-w-md mx-auto text-left mb-6 font-sans">
            <p className="text-base font-bold text-slate-900 mb-1">
              {t("LinerSizing.otherTitle")}
            </p>
            <div className="flex flex-col gap-1">
              {alternateSizeCodes.map((altCode, index) => (
                <p key={index} className="text-lg font-semibold font-sans text-black">
                  {altCode}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* 4. Restart Button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={handleRestart}
            className={`px-6 py-3 text-base rounded-md border font-sans font-bold transition-all cursor-pointer uppercase
              ${isRestarting
                ? "bg-[#090C41] text-[#090C41]"
                : "bg-white text-black border-gray-300 hover:border-black"
              }`}
          >
            {t("cta.restart", { ns: "common" })}
          </button>
        </div>

        {/* 5. Email Capture Section */}
        <div className="mt-10 text-left font-sans max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-slate-900">
            {t("LinerSizing.email_title")}
          </h2>

          <p className="text-xs text-gray-700 leading-snug mb-2">
            {t("LinerSizing.email_description")}
          </p>

          <EmailCapture
            selection={{
              sizeCode,
              product: productAmputation,
            }}
            onConfirm={(email) => {
              localStorage.setItem("saved_size_code", sizeCode);
              console.log("Result saved for:", email);
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
}