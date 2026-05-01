import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import EmailCapture from "../../../../components/EmailCapture";

// Assets
import TFProductImg from "../../../../assets/products/tf.png";
import ExclamationIcon from "../../../../assets/exclamation.svg";

export default function SizeTF() {
  const navigate = useNavigate();
  const [isRestarting, setIsRestarting] = useState(false);
  const { t, i18n } = useTranslation(["pages", "common"]);

  /** ---------- Data Retrieval ---------- */
  // Get and capitalize only the first letter
  const rawAmputation = localStorage.getItem("amputation") || "tf"; 
  
  // 1. Initial capitalization (e.g., "transfemoral" -> "Transfemoral")
  let amputation = rawAmputation.charAt(0).toUpperCase() + rawAmputation.slice(1).toLowerCase();

  // 2. Small change: Handle French accent for Transfémoral
  if (amputation.toLowerCase() === "transfemoral" && i18n.language.startsWith("fr")) {
    amputation = "Transfémoral";
  }

  const product = localStorage.getItem("product") || "Overlay"; 
  const suspensionId = localStorage.getItem("overlay_suspension") || "—";
  
  const circumferenceMapped = localStorage.getItem("tfstandard_circumference") || localStorage.getItem("tfdistal_circumference") || "—";
  const circumferenceRaw = localStorage.getItem("overlay_raw_circumference") || "—";
  
  const lengthMapped = localStorage.getItem("tfstandard_length") || localStorage.getItem("tfdistal_length") || "—";
  const lengthRaw = localStorage.getItem("overlay_raw_length") || "—";
  
  const unit = localStorage.getItem("units") === "imperial" ? "in" : "cm";

  /** ---------- Logic & Formatting ---------- */
  const currentLang = (i18n.language || "en").split("-")[0];
  const productAmputation = `${product} TF`;

  const isDistalSeal = suspensionId === "TF-distal-seal";
  const isCushion    = suspensionId === "TF-cushion";
  const suffix = isDistalSeal ? "VAC" : "PIN";

  const suspensionLabel = suspensionId !== "—" 
    ? t(`suspension.${suspensionId.toLowerCase()}`, { ns: "common" }) 
    : "—";

  const sizeCode = (circumferenceMapped !== "—" && lengthMapped !== "—")
    ? `OVTF-${circumferenceMapped}-${lengthMapped}-${suffix}`
    : "XXXXX";

  const germanSizeMap = {
    "OVTF-32-XL-PIN": "211B27=1L1", "OVTF-38-XL-PIN": "211B27=1L2", "OVTF-40-XL-PIN": "211B27=1L3",
    "OVTF-44-XL-PIN": "211B27=1L4", "OVTF-48-XL-PIN": "211B27=1L5", "OVTF-52-XL-PIN": "211B27=1L6",
    "OVTF-32-LG-PIN": "211B27=1M1", "OVTF-38-LG-PIN": "211B27=1M2", "OVTF-40-LG-PIN": "211B27=1M3",
    "OVTF-44-LG-PIN": "211B27=1M4", "OVTF-48-LG-PIN": "211B27=1M5", "OVTF-52-LG-PIN": "211B27=1M6",
    "OVTF-32-SH-PIN": "211B27=1S1", "OVTF-38-SH-PIN": "211B27=1S2", "OVTF-40-SH-PIN": "211B27=1S3",
    "OVTF-44-SH-PIN": "211B27=1S4", "OVTF-48-SH-PIN": "211B27=1S5", "OVTF-52-SH-PIN": "211B27=1S6",
    "OVTF-32-LG-VAC": "211B27=2M1", "OVTF-38-LG-VAC": "211B27=2M2", "OVTF-40-LG-VAC": "211B27=2M3",
    "OVTF-44-LG-VAC": "211B27=2M4", "OVTF-48-LG-VAC": "211B27=2M5", "OVTF-52-LG-VAC": "211B27=2M6",
    "OVTF-32-SH-VAC": "211B27=2S1", "OVTF-38-SH-VAC": "211B27=2S2", "OVTF-40-SH-VAC": "211B27=2S3",
    "OVTF-44-SH-VAC": "211B27=2S4", "OVTF-48-SH-VAC": "211B27=2S5", "OVTF-52-SH-VAC": "211B27=2S6",
  };
  const germanAltCode = currentLang === "de" ? germanSizeMap[sizeCode] || "" : "";

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => navigate("/sizing/product"), 200);
  };

  return (
    <PageWrapper 
      showBack 
      backTo={isDistalSeal ? "/sizing/TFcircumference-vac" : "/sizing/TFcircumference"} 
      currentStep={4} 
      totalSteps={4} 
      code={true}
    >
      <div className="w-full max-w-2xl mt-4 text-center">
        <h1 className="text-[34px] font-semibold font-sans mb-2 text-slate-900">
          {t("TFSizing.title")}
        </h1>

        <div className="flex flex-col items-center mb-6">
          <p className="text-[40px] font-bold font-sans text-[#090C41]">{sizeCode}</p>
          {germanAltCode && (
            <p className="text-[20px] font-bold text-gray-500 font-sans -mt-2">{germanAltCode}</p>
          )}
        </div>

        <div className="w-full max-w-md mx-auto flex flex-row items-start justify-center gap-8 text-left mt-6 mb-8">
          <img
            src={TFProductImg}
            alt="TF Product"
            className="w-[180px] h-auto object-contain rounded-xl shadow-sm"
          />

          <div className="flex flex-col justify-between text-sm text-gray-700 font-sans h-full">
            <div className="space-y-1">
              <p className="text-slate-900"><strong>{t("TFSizing.description")}</strong></p>
              <p>{t("TFSizing.amp")}: {amputation}</p>
              <p>{t("TFSizing.system")}: {suspensionLabel}</p>
              <p>{t("TFSizing.circumference")}: {circumferenceRaw} {unit}</p>
              <p>{t("TFSizing.length")}: {lengthRaw} {unit}</p>
            </div>
          </div>
        </div>

        {/* Cushion Specific Note */}
        {isCushion && (
          <div className="w-full max-w-md mx-auto mt-2 mb-10">
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-200/80">
              <div className="flex items-start gap-3 text-left">
                <img src={ExclamationIcon} alt="Notice" className="shrink-0 w-5 h-5" />
                <div className="flex-1">
                  <p className="text-[15px] font-bold text-slate-900 leading-tight">
                    {t("TFSizing.note_cushion_title")}
                  </p>
                  <p className="mt-1.5 text-[13px] text-slate-600 leading-snug">
                    <Trans
                      ns="pages"
                      i18nKey="TFSizing.note_cushion_body"
                      components={{ bold: <strong className="font-bold underline text-[#090C41]" /> }}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

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

        <div className="mt-10 text-left font-sans max-w-md mx-auto">
          <h2 className="text-[25px] font-semibold text-slate-900">{t("TFSizing.email_title")}</h2>
          <p className="text-[12px] text-gray-700 leading-snug mb-2">
            {t("TFSizing.email_description")}
          </p>

          <EmailCapture
            selection={{ sizeCode, product: productAmputation }}
            onConfirm={(email) => {
              localStorage.setItem("saved_size_code", sizeCode);
              console.log("TF Result saved for:", email);
            }}
          />
        </div>
      </div>
    </PageWrapper>
  );
}