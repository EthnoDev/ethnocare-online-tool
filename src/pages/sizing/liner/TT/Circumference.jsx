// src/pages/sizing/liner/tt/Circumference.jsx
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";

export default function Circumference() {
  const { t } = useTranslation("pages");

  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing/liner/material"
      currentStep={3}
      code={true}
    >
      <div className="w-full max-w-md flex flex-col items-center font-sans">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("ttLinerCircumferenceSizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("ttLinerCircumferenceSizing.description")}
        </p>

        {/* Options / Form elements will go here */}
      </div>
    </PageWrapper>
  );
}