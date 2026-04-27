import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import EmailCapture from "../../../../components/EmailCapture";

// Assets
import TTProductImg from "../../../../assets/products/tt.png";

export default function SizeTT() {
  const navigate = useNavigate();
  const [isRestarting, setIsRestarting] = useState(false);
  const { t, i18n } = useTranslation(["pages", "common"]);

  /** ---------- Data Retrieval ---------- */
  const product = localStorage.getItem("product") || "Transtibial";
  const suspensionId = localStorage.getItem("overlay_suspension") || "—";
  
  // Clean keys based on your updated files
  const circumferenceRaw = localStorage.getItem("overlay_raw_circumference") || "—";
  const circumferenceMapped = localStorage.getItem("circumference") || "—";
  
  const lengthRaw = localStorage.getItem("overlay_raw_length") || "—";
  const lengthMapped = localStorage.getItem("length") || "—";
  
  const orientation = localStorage.getItem("orientation") || "—";
  const unit = localStorage.getItem("units") === "imperial" ? "in" : "cm";

  /** ---------- Logic & Formatting ---------- */
  const currentLang = (i18n.language || "en").split("-")[0];

  // Suspension Label Translation
  const suspensionLabel = suspensionId !== "—" 
    ? t(`suspension.${suspensionId.toLowerCase().replace("tt-", "tt-")}`, { ns: "common" }) 
    : "—";

  // Orientation Label Translation
  const orientationLabel = orientation !== "—" 
    ? t(`common:${orientation.toLowerCase()}`, { defaultValue: orientation }) 
    : "—";

  // Generate Size Code: e.g., OV28-SH-R
  const sizeCode = (circumferenceMapped !== "—" && lengthMapped !== "—" && orientation !== "—")
    ? `OV${circumferenceMapped}-${lengthMapped}-${orientation.charAt(0).toUpperCase()}`
    : "XXXXX";

  // German specific mapping (if applicable)
  const germanSizeMap = {
    "OV35-SH-L": "211B18=1LL", "OV35-SH-R": "211B18=1LR",
    "OV28-SH-L": "211B18=1ML", "OV28-SH-R": "211B18=1MR",
    "OV23-SH-L": "211B18=1SL", "OV23-SH-R": "211B18=1SR",
    "OV35-LG-L": "211B18=2LL", "OV35-LG-R": "211B18=2LR",
    "OV28-LG-L": "211B18=2ML", "OV28-LG-R": "211B18=2MR",
    "OV23-LG-L": "211B18=2SL", "OV23-LG-R": "211B18=2SR",
  };
  const germanAltCode = currentLang === "de" ? germanSizeMap[sizeCode] || "" : "";

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => navigate("/sizing/product"), 200);
  };

  return (
    <PageWrapper showBack backTo="/sizing/TTorientation" currentStep={5} totalSteps={5} code={true}>
      <div className="w-full max-w-2xl mt-2 text-center">
        <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-2">
          {t("TTSizing.title")}
        </h1>

        {/* Size Code Display */}
        <div className="flex flex-col items-center my-6">
          <p className="text-5xl font-black text-[#090C41] tracking-tight">{sizeCode}</p>
          {germanAltCode && (
            <p className="text-lg font-bold text-slate-400 mt-1">{germanAltCode}</p>
          )}
        </div>

        {/* Summary Table & Image */}
        <div className="w-full max-w-lg mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-8 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <img
            src={TTProductImg}
            alt="TT Product"
            className="w-32 h-auto object-contain rounded-lg"
          />

          <div className="flex-1 space-y-2 text-sm text-slate-600">
            <p className="text-slate-900 font-bold border-b border-slate-200 pb-1 mb-2">
              {t("TTSizing.description")}
            </p>
            <p><strong>{t("TTSizing.product")}:</strong> {product}</p>
            <p><strong>{t("TTSizing.system")}:</strong> {suspensionLabel}</p>
            <p><strong>{t("TTSizing.circumference")}:</strong> {circumferenceRaw} {unit}</p>
            <p><strong>{t("TTSizing.length")}:</strong> {lengthRaw} {unit}</p>
            <p><strong>{t("TTSizing.orientation")}:</strong> {orientationLabel}</p>
          </div>
        </div>

        {/* Restart Button */}
        <div className="mt-8">
          <button
            onClick={handleRestart}
            className={`px-8 py-3 rounded-xl border font-bold transition-all cursor-pointer ${
              isRestarting
                ? "bg-[#090C41] text-white border-[#090C41]"
                : "bg-white text-slate-900 border-slate-200 hover:border-slate-900"
            }`}
          >
            {t("cta.restart", { ns: "common" })}
          </button>
        </div>

        {/* Email Capture Section */}
        <div className="mt-12 text-left max-w-md mx-auto border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900">{t("TTSizing.save_title")}</h2>
          <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
            {t("TTSizing.save_description")}
          </p>

          <EmailCapture
            selection={{ sizeCode, product }}
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