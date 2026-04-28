import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets - Using VAC variants for Distal Seal
import TF_Vac_en from "../../../../assets/lengths/TF/vac.svg";
import TF_Vac_fr from "../../../../assets/lengths/TF/vac_fr.svg";
import TF_Vac_es from "../../../../assets/lengths/TF/vac_es.svg";
import TF_Vac_de from "../../../../assets/lengths/TF/vac_de.svg";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];

export default function LengthVac() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = baseLang(i18n.language);
  const imgMap = {
    en: TF_Vac_en,
    fr: TF_Vac_fr,
    es: TF_Vac_es,
    de: TF_Vac_de,
  };

  const selectedImage = imgMap[lang] || TF_Vac_en;

  const handleConfirm = (res) => {
    localStorage.setItem("length", res);
    setTimeout(() => {
      navigate("/sizing/TFcircumference-vac");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TFsuspension" 
      currentStep={2} 
      totalSteps={4} 
      code={true}
    >
      <div className="w-full max-w-md mt-2">
        {/* 1. Title - Reusing TF keys, ensure they exist in your JSON */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthTFSizing.title", { ns: "pages" })}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("lengthTFSizing.description", { ns: "pages" })}
        </p>

        {/* 3. Image (Vac version) */}
        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt="TF Vacuum Length Measurement"
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Measurement Input - Explicitly set to tfdistal */}
        <div className="mt-8">
          <MeasurementInput
            product="tfdistal"
            measurement="length"
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </PageWrapper>
  );
}