// src/pages/sizing/liner/tf/Circumference.jsx
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../../components/PageWrapper";

export default function Circumference() {
  const { t } = useTranslation(["pages", "common"]);

  // Unit and dynamic distance calculation
  const isImperial = localStorage.getItem("units") === "imperial";
  const distance = isImperial ? "1.5 in" : "4 cm";

  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing/liner/material"
      currentStep={3}
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("circumferenceLinerSizing.title")}
        </h1>

        {/* 2. Dynamic Description using single "description" key */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("circumferenceLinerSizing.description", { distance })}
        </p>

        {/* Options / Form elements will go here */}
      </div>
    </PageWrapper>
  );
}