import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";
import MeasurementInput from "../../../../components/MeasurementInput";

// Single Seal Assets
import TF_SingleSeal_en from "../../../../assets/lengths/TF/singleSeal.svg";
import TF_SingleSeal_fr from "../../../../assets/lengths/TF/singleSeal_fr.svg";
import TF_SingleSeal_es from "../../../../assets/lengths/TF/singleSeal_es.svg";

// Multi Seal Assets
import TF_MultiSeal_en from "../../../../assets/lengths/TF/multiSeal.svg";
import TF_MultiSeal_fr from "../../../../assets/lengths/TF/multiSeal_fr.svg";
import TF_MultiSeal_es from "../../../../assets/lengths/TF/multiSeal_es.svg";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];

export default function LengthVac() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = baseLang(i18n.language);
  const suspension = localStorage.getItem("suspension");
  const isMultiSeal = suspension === "TF-multi-seal";

  // Map images by language for Single and Multi seal
  const singleSealMap = {
    en: TF_SingleSeal_en,
    fr: TF_SingleSeal_fr,
    es: TF_SingleSeal_es,
  };

  const multiSealMap = {
    en: TF_MultiSeal_en,
    fr: TF_MultiSeal_fr,
    es: TF_MultiSeal_es,
  };

  // German ('de') automatically falls back to English ('en') via map[lang] || default
  const imgMap = isMultiSeal ? multiSealMap : singleSealMap;
  const selectedImage = imgMap[lang] || (isMultiSeal ? TF_MultiSeal_en : TF_SingleSeal_en);

  // Dynamic description key based on suspension type
  const descriptionKey = isMultiSeal
    ? "lengthTFVacSizing.descriptionMulti"
    : "lengthTFVacSizing.descriptionSingle";

  const handleConfirm = (res) => {
    localStorage.setItem("length", res);
    setTimeout(() => {
      navigate("/sizing/TFsize");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TFcircumference-vac" 
      currentStep={3} 
      totalSteps={4} 
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthTFVacSizing.title", { ns: "pages" })}
        </h1>

        {/* 2. Description (Switches between descriptionSingle and descriptionMulti with Trans support) */}
        <p className="mt-3 text-center text-base text-slate-500">
          <Trans
            ns="pages"
            i18nKey={descriptionKey}
            components={{
              bold: <strong className="font-bold text-black" />,
              underline: <span className="underline" />,
              br: <br />
            }}
          />
        </p>

        {/* 3. Image (Single Seal / Multi Seal variant based on suspension & lang) */}
        <div className="mt-8 flex justify-center">
          <img
            src={selectedImage}
            alt={t("common:pages.length_tf_vac")}
            className="w-74 h-auto object-contain rounded-xl"
          />
        </div>

        {/* 4. Measurement Input */}
        <div className="w-full">
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