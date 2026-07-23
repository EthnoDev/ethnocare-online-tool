// src/pages/sizing/liner/Length.jsx
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

export default function Length() {
  const { t } = useTranslation(["pages", "common"]);

  // Determine back navigation path based on saved amputation type
  const amputation = localStorage.getItem("amputation");
  const backPath =
    amputation === "transfemoral"
      ? "/sizing/liner/tf/circumference"
      : "/sizing/liner/tt/circumference";

  return (
    <PageWrapper
      showBack={true}
      backTo={backPath}
      currentStep={4}
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("lengthLinerSizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("lengthLinerSizing.description")}
        </p>
      </div>
    </PageWrapper>
  );
}