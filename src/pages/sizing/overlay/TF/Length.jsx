import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import TF_Pin_en from "../../../../assets/lengths/TF/pin.svg";
import TF_Pin_fr from "../../../../assets/lengths/TF/pin_fr.svg";
import TF_Pin_es from "../../../../assets/lengths/TF/pin_es.svg";
import TF_Pin_de from "../../../../assets/lengths/TF/pin_de.svg";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];

export default function Length() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = baseLang(i18n.language);
  const imgMap = {
    en: TF_Pin_en,
    fr: TF_Pin_fr,
    es: TF_Pin_es,
    de: TF_Pin_de,
  };

  const selectedImage = imgMap[lang] || TF_Pin_en;

  const handleConfirm = (res) => {
    localStorage.setItem("length", res);
    setTimeout(() => {
      navigate("/sizing/TFcircumference");
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
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthTFSizing.title", { ns: "pages" })}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("lengthTFSizing.description", { ns: "pages" })}
        </p>

        {/* 3. Image */}
        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt="TF Length Measurement"
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="mt-8">
          <MeasurementInput
            product="tfstandard"
            measurement="length"
            onConfirm={handleConfirm}
          />
        </div>
      </div>
    </PageWrapper>
  );
}