// src/pages/sizing/liner/MaterialSelection.jsx
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

export default function MaterialSelection() {
  const { t } = useTranslation("pages");

  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing/liner/activity-level"
      currentStep={2}
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("materialLinerSizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("materialLinerSizing.description")}
        </p>

        {/* Options / Form elements will go here */}
      </div>
    </PageWrapper>
  );
}