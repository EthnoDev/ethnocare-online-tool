import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import MeasurementInput from "../../../components/MeasurementInput";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];
const pickLang = (code) => (["fr", "es", "de"].includes(code) ? code : "en");

/** ---------- Length Images (Localized from assets/lengths/Underlay/) ---------- */
import Length_en from "../../../assets/lengths/Underlay/en.svg";
import Length_fr from "../../../assets/lengths/Underlay/fr.svg";
import Length_es from "../../../assets/lengths/Underlay/es.svg";
import Length_de from "../../../assets/lengths/Underlay/de.svg";

const LENGTH_IMAGES = { 
  en: Length_en, 
  fr: Length_fr, 
  es: Length_es, 
  de: Length_de 
};

export default function Length() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["pages", "common"]);

  // Determine current language key
  const lang = pickLang(baseLang(i18n.language));

  const handleConfirm = (value) => {
    // Store the value returned from the component
    localStorage.setItem("underlay_length", value);
    setTimeout(() => {
      navigate("/sizing/underlay/circumference");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/underlay/seal" 
      currentStep={2} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-100 max-w-md mt-2 flex flex-col items-center">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthUnderlaySizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("lengthUnderlaySizing.description")}
        </p>

        {/* 3. Image (Localized, No borders/rings) */}
        <div className="mt-8 flex justify-center">
          <img
            src={LENGTH_IMAGES[lang] || LENGTH_IMAGES.en}
            alt="Length Measurement Diagram"
            className="h-auto w-full block max-w-[320px]"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="mt-10 w-full">
          <MeasurementInput
            product="underlaytt"
            measurement="length"
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </PageWrapper>
  );
}