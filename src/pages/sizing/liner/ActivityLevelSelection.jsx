// src/pages/sizing/liner/ActivityLevelSelection.jsx
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

export default function ActivityLevelSelection() {
  const { t } = useTranslation("pages");

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/product" 
      currentStep={1} 
      code={true}
    >
      <div className="w-full max-w-md flex flex-col items-center font-sans">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("activityLevelSizing.title", "Select Activity Level")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t(
            "activityLevelSizing.description",
            "Choose the activity level that best matches the patient's daily routine."
          )}
        </p>

        {/* Options / Form elements will go here */}
      </div>
    </PageWrapper>
  );
}