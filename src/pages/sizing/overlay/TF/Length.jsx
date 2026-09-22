import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Assets
import TF_Pin_en from "../../../../assets/lengths/TF/pin.svg";
import TF_Pin_fr from "../../../../assets/lengths/TF/pin_fr.svg";
import TF_Pin_es from "../../../../assets/lengths/TF/pin_es.svg";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];

export default function Length() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = baseLang(i18n.language);
  
  // German (de) automatically falls back to TF_Pin_en
  const imgMap = {
    en: TF_Pin_en,
    fr: TF_Pin_fr,
    es: TF_Pin_es,
  };

  const selectedImage = imgMap[lang] || TF_Pin_en;

  const handleConfirm = (res) => {
    localStorage.setItem("length", res);
    setTimeout(() => {
      navigate("/sizing/TFsize");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TFcircumference" 
      currentStep={3} 
      totalSteps={4} 
      code={true}
    >
      <div className="w-full max-w-sm">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthTFSizing.title", { ns: "pages" })}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          <Trans
            ns="pages"
            i18nKey="lengthTFSizing.description"
            components={{
              bold: <strong className="font-bold text-black" />,
              underline: <span className="underline" />,
              br: <br />
            }}
          />
        </p>

        {/* 3. Image */}
        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt={t("common:pages.length_tf")}
            className="w-70 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="w-full">
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