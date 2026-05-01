import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

// Assets
import UTTProductImg from "../../../assets/products/utt.png";

export default function SizeUnderlay() {
  const navigate = useNavigate();
  const [isRestarting, setIsRestarting] = useState(false);
  const { t } = useTranslation(["pages", "common"]);

  /** ---------- Data Retrieval ---------- */
  const product = "Underlay";
  const unit = localStorage.getItem("units") === "imperial" ? "in" : "cm";
  
  // Get and capitalize only the first letter
  const rawAmputation = localStorage.getItem("amputation") || "tt"; 
  const amputation = rawAmputation.charAt(0).toUpperCase() + rawAmputation.slice(1).toLowerCase();

  const sealId = localStorage.getItem("underlay_seal") || "—"; 
  const siliconeId = localStorage.getItem("underlay_silicone") || "—"; 
  
  const circumferenceRaw = localStorage.getItem("overlay_raw_circumference") || "—"; 
  const circumferenceMapped = localStorage.getItem("underlay_circumference") || "—";
  
  const lengthRaw = localStorage.getItem("overlay_raw_length") || "—";
  const lengthMapped = localStorage.getItem("underlay_length") || "—";

  /** ---------- Logic & Formatting ---------- */
  
  // Using the common namespace pattern from your example
  const sealLabel = sealId !== "—" 
    ? t(`seal.${sealId.toLowerCase()}`, { ns: "common" }) 
    : "—";

  const siliconeLabel = siliconeId !== "—" 
    ? t(`silicone.${siliconeId.toLowerCase()}`, { ns: "common" }) 
    : "—";

  // Size Code Logic: UDTT-[Circumference]-[Length]
  const sizeCode = (circumferenceMapped !== "—" && lengthMapped !== "—")
    ? `UDTT-${circumferenceMapped}-${lengthMapped}`
    : "UDTT-XX-XX";

  const handleRestart = () => {
    setIsRestarting(true);
    setTimeout(() => navigate("/sizing/product"), 200);
  };

  return (
    <PageWrapper 
      showBack 
      backTo="/sizing/underlay/silicone" 
      currentStep={5} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-full max-w-2xl text-center">
        {/* 1. Title */}
        <h1 className="text-[34px] font-semibold font-sans mb-2 text-slate-900">
          {t("UnderlaySizing.title")}
        </h1>

        {/* 2. Primary Size Code */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-[40px] font-bold font-sans text-[#090C41]">{sizeCode}</p>
        </div>

        {/* 3. Product Summary Card */}
        <div className="w-full max-w-md mx-auto flex flex-row items-start justify-center gap-8 text-left mt-6 mb-10">
          <img
            src={UTTProductImg}
            alt="Underlay TT Product"
            className="w-[180px] h-auto object-contain "
          />

          <div className="flex flex-col justify-between text-sm text-gray-700 font-sans h-full">
            <div className="space-y-1">
              <p className="text-slate-900"><strong>{t("UnderlaySizing.description")}</strong></p>
              
              <p>{t("UnderlaySizing.amp")}: {amputation}</p>
              
              <p>
                {t("UnderlaySizing.circumference")}: {circumferenceRaw} {unit}
              </p>
              
              <p>
                {t("UnderlaySizing.length")}: {lengthRaw} {unit}
              </p>

              {/* Localized Seal and Silicone labels */}
              <p>{t("UnderlaySizing.seal")}: {sealLabel}</p>
              <p>{t("UnderlaySizing.silicone")}: {siliconeLabel}</p>
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