// src/pages/sizing/Welcome.jsx
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
      navigate("/sizing/units");
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/" code={true}>
      <div className="w-full max-w-md mt-2">
        <h1 className="text-4xl font-bold text-center text-slate-900 leading-tight">
          {t("welcomeSizing.title")}
        </h1>

        <p className="mt-6 text-center text-base text-slate-500 leading-relaxed px-8">
          {t("welcomeSizing.description")}
        </p>

        <div className="mt-10 flex justify-center">
          <SelectableOption
            label={t("welcomeSizing.startButton")}
            selected={isStarting}
            onClick={handleStart}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
