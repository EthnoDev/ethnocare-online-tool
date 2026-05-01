// src/pages/recommendation/Welcome.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";
import { useTranslation } from "react-i18next";

export default function Welcome() {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);
  const { t } = useTranslation("pages");

  const handleStart = () => {
    if (isStarting) return;
    setIsStarting(true);

    setTimeout(() => {
      // later: navigate("/recommendation/step-1");
      alert("Recommendation flow coming soon");
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/" code={true}>
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-slate-900 leading-tight">
          {t("welcomeRecommendation.title")}
        </h1>

        <p className="mt-6 text-center text-base text-slate-500 leading-relaxed px-8">
          {t("welcomeRecommendation.description")}
        </p>

        <div className="mt-10 flex justify-center">
          <SelectableOption
            label={t("welcomeRecommendation.startButton")}
            selected={isStarting}
            onClick={handleStart}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
