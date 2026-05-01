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
  // Get and capitalize only the first letter
  const rawAmputation = localStorage.getItem("amputation") || "tt"; 
  const amputation = rawAmputation.charAt(0).toUpperCase() + rawAmputation.slice(1).toLowerCase();

  // Usually 'product' stores "Overlay" or "Underlay"
  const product = localStorage.getItem("product") || "Overlay"; 
  const suspensionId = localStorage.getItem("overlay_suspension") || "—";
  
  const circumferenceRaw = localStorage.getItem("overlay_raw_circumference") || "—";
  const circumferenceMapped = localStorage.getItem("circumference") || "—";
  
  const lengthRaw = localStorage.getItem("overlay_raw_length") || "—";
  const lengthMapped = localStorage.getItem("length") || "—";
  
  const orientation = localStorage.getItem("orientation") || "—";
  const unit = localStorage.getItem("units") === "imperial" ? "in" : "cm";

  /** ---------- Logic & Formatting ---------- */
  const currentLang = (i18n.language || "en").split("-")[0];

  // Combined Product + Amputation Line
  // This assumes this specific file is for Transtibial (TT)
  const productAmputation = `${product} TT`;

  const suspensionLabel = suspensionId !== "—" 
    ? t(`suspension.${suspensionId.toLowerCase().replace("tt-", "tt-")}`, { ns: "common" }) 
    : "—";

  const orientationLabel = orientation === "—" ? "—" : t(`orientation.${orientation.toLowerCase()}`, { ns: "common" });

  const sizeCode = (circumferenceMapped !== "—" && lengthMapped !== "—" && orientation !== "—")
    ? `OV${circumferenceMapped}-${lengthMapped}-${orientation.charAt(0).toUpperCase()}`
    : "XXXXX";

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
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-[34px] font-semibold font-sans mb-2 text-slate-900">
          {t("TTSizing.title")}
        </h1>

        <div className="flex flex-col items-center mb-6">
          <p className="text-[40px] font-bold font-sans text-[#090C41]">{sizeCode}</p>
          {germanAltCode && (
            <p className="text-[20px] font-bold text-gray-500 font-sans -mt-2">{germanAltCode}</p>
          )}
        </div>

        <div className="w-full max-w-md mx-auto flex flex-row items-start justify-center gap-8 text-left mt-6 mb-10">
          <img
            src={TTProductImg}
            alt="TT Product"
            className="w-[180px] h-auto object-contain rounded-xl"
          />

          <div className="flex flex-col justify-between text-sm text-gray-700 font-sans h-full">
            <div className="space-y-1">
              <p className="text-slate-900"><strong>{t("TTSizing.description")}</strong></p>
              {/* Product + Amputation Line */}
              <p>{t("TTSizing.amp")}: {amputation}</p>
              <p>{t("TTSizing.system")}: {suspensionLabel}</p>
              <p>{t("TTSizing.circumference")}: {circumferenceRaw} {unit}</p>
              <p>{t("TTSizing.length")}: {lengthRaw} {unit}</p>
              <p>{t("TTSizing.orientation")}: {orientationLabel}</p>
            </div>
          </div>
        </div>

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
          <h2 className="text-[25px] font-semibold text-slate-900">{t("TTSizing.email_title")}</h2>
          <p className="text-[12px] text-gray-700 leading-snug mb-2">
            {t("TTSizing.email_description")}
          </p>

          <EmailCapture
            selection={{ sizeCode, product: productAmputation }}
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