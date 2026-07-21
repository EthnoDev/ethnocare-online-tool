// src/pages/sizing/liner/ActivityLevelSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import ActivityLevelOption from "../../../components/ActivityLevelOption";

export default function ActivityLevelSelection() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");

  // Initializing with "" ensures no option is visually selected when landing/returning
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleSelect = (level) => {
    setSelectedLevel(level);
    localStorage.setItem("liner_activity_level", level);

    // Timeout delay consistent with the rest of your app selection flows
    setTimeout(() => {
      navigate("/sizing/liner/material");
    }, 200);
  };

  const activityOptions = [
    {
      level: "K1",
      description: t("activityLevelLinerSizing.k1_description"),
    },
    {
      level: "K2",
      description: t("activityLevelLinerSizing.k2_description"),
    },
    {
      level: "K3",
      description: t("activityLevelLinerSizing.k3_description"),
    },
    {
      level: "K4",
      description: t("activityLevelLinerSizing.k4_description"),
    },
  ];

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/product" 
      currentStep={1} 
      code={true}
    >
      <div className="w-full max-w-md">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("activityLevelLinerSizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("activityLevelLinerSizing.description")}
        </p>

        {/* 3. Activity Level Options */}
        <div className="mt-8 space-y-6 flex flex-col items-center">
          {activityOptions.map((opt) => (
            <ActivityLevelOption
              key={opt.level}
              level={opt.level}
              description={opt.description}
              selected={selectedLevel === opt.level}
              onClick={() => handleSelect(opt.level)}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}