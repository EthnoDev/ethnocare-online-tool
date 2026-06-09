// src/pages/assistance/BadFit.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../../../components/PageWrapper";
import SelectableOption from "../../../components/SelectableOption";
import { useTranslation } from "react-i18next";

export default function BadFit() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // "sizing" | "overlay-movement"
  const { t } = useTranslation("pages");

  const handleSelect = (fitIssue) => {
    if (selected) return; // Prevent double clicks
    setSelected(fitIssue);

    // Dynamic update for the parent problem key based on sub-selection
    localStorage.setItem("problem_key", `pages:badFitAssistance.${fitIssue}`);

    // 🔴 Commented out detail storage for now
    // localStorage.setItem("detail", fitIssue); 
    // localStorage.setItem("detail_key", `pages:badFitAssistance.${fitIssue}`);

    // Navigation logic with standard 200ms delay
    setTimeout(() => {
      if (fitIssue === "overlay-movement") {
        navigate("/assistance/problem/moving");
      }
      // You can add your "sizing" destination condition here later if needed
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/assistance/problem"
    >
      <div className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("badFitAssistance.title")}
        </h1>

        {/* Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("badFitAssistance.description")}
        </p>

        {/* Options Container - Restored to Vertical Layout */}
        <div className="mt-8 space-y-6 flex flex-col items-center">
          <SelectableOption
            label={t("badFitAssistance.option1")}
            selected={selected === "sizing"}
            onClick={() => handleSelect("sizing")}
          />

          <SelectableOption
            label={t("badFitAssistance.option2")}
            selected={selected === "overlay-movement"}
            onClick={() => handleSelect("overlay-movement")}
          />
        </div>
      </div>
    </PageWrapper>
  );
}