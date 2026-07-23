// src/pages/sizing/liner/SuspensionSelection.jsx
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

export default function SuspensionSelection() {
  const { t } = useTranslation(["pages", "common"]);

  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing/liner/length"
      currentStep={5}
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("suspensionLinerSizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("suspensionLinerSizing.description")}
        </p>
      </div>
    </PageWrapper>
  );
}