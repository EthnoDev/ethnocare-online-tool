import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import MeasurementInput from "../../../components/MeasurementInput";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];
const pickLang = (code) => (["fr", "es", "de"].includes(code) ? code : "en");

/** ---------- Length Images (Localized) ---------- */
import Length_en from "../../../assets/lengths/Underlay/xx.svg";
//import Length_fr from "../../../assets/lengths/Underlay/xx_fr.svg";
//import Length_es from "../../../assets/lengths/Underlay/xx_es.svg";
//import Length_de from "../../../assets/lengths/Underlay/xx_de.svg";

const LENGTH_IMAGES = { en: Length_en, fr: Length_en, es: Length_en, de: Length_en };

export default function Length() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["pages", "common"]);
  const [length, setLength] = useState("");

  const lang = pickLang(baseLang(i18n.language));

  const handleNext = () => {
    if (!length) return;
    localStorage.setItem("underlay_length", length);
    // Adjust this path based on your actual step 3 filename
    navigate("/sizing/underlay/circumference"); 
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
          {t("underlayLength.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("underlayLength.description")}
        </p>

        {/* 3. Image (No borders/rings) */}
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
            value={length}
            onChange={(val) => setLength(val)}
            placeholder={t("underlayLength.placeholder")}
            label={t("underlayLength.inputLabel")}
            onNext={handleNext}
          />
        </div>
      </div>
    </PageWrapper>
  );
}