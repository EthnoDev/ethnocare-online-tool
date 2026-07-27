// src/pages/sizing/liner/ThicknessSelection.jsx
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

export default function ThicknessSelection() {
  const { t } = useTranslation(["pages", "common"]);

  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing/liner/suspension"
      currentStep={6}
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("thicknessLinerSizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("thicknessLinerSizing.description")}
        </p>

        {/* Dynamic content will be added here */}
      </div>
    </PageWrapper>
  );
}