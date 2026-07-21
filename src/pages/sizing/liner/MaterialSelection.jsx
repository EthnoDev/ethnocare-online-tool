// src/pages/sizing/liner/MaterialSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

// Import material SVGs per language
import gelDe from "../../../assets/materials/gel_de.svg";
import gelEn from "../../../assets/materials/gel_en.svg";
import gelEs from "../../../assets/materials/gel_es.svg";
import gelFr from "../../../assets/materials/gel_fr.svg";

import s30De from "../../../assets/materials/s30_de.svg";
import s30En from "../../../assets/materials/s30_en.svg";
import s30Es from "../../../assets/materials/s30_es.svg";
import s30Fr from "../../../assets/materials/s30_fr.svg";

import s40De from "../../../assets/materials/s40_de.svg";
import s40En from "../../../assets/materials/s40_en.svg";
import s40Es from "../../../assets/materials/s40_es.svg";
import s40Fr from "../../../assets/materials/s40_fr.svg";

const IMAGE_MAP = {
  gel: { de: gelDe, en: gelEn, es: gelEs, fr: gelFr },
  s30: { de: s30De, en: s30En, es: s30Es, fr: s30Fr },
  s40: { de: s40De, en: s40En, es: s40Es, fr: s40Fr },
};

export default function MaterialSelection() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("pages");

  // Read stored values
  const rawAmputation = (localStorage.getItem("amputation") || "").toLowerCase();
  const isTranstibial = rawAmputation === "transtibial" || rawAmputation === "tt";
  const isTransfemoral = rawAmputation === "transfemoral" || rawAmputation === "tf";

  const activityLevel = (localStorage.getItem("liner_activity_level") || "").toUpperCase();

  // Fresh selection state (starts unselected)
  const [, setSelectedMaterial] = useState("");

  // Helper to pick correct SVG language asset
  const getLanguageKey = () => {
    const lang = (i18n.language || "en").toLowerCase();
    if (lang.startsWith("fr")) return "fr";
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("de")) return "de";
    return "en";
  };

  const currentLang = getLanguageKey();

  // Determine available options based on mapping rules
  const availableOptions = [];

  // 1. S30 -> TT + (K1, K2)
  if (isTranstibial && ["K1", "K2"].includes(activityLevel)) {
    availableOptions.push({
      key: "s30",
      imgSrc: IMAGE_MAP.s30[currentLang] || IMAGE_MAP.s30.en,
    });
  }

  // 2. S40 -> TT + (K1, K2, K3, K4) OR TF + (K1, K2, K3)
  if (
    (isTranstibial && ["K1", "K2", "K3", "K4"].includes(activityLevel)) ||
    (isTransfemoral && ["K1", "K2", "K3"].includes(activityLevel))
  ) {
    availableOptions.push({
      key: "s40",
      imgSrc: IMAGE_MAP.s40[currentLang] || IMAGE_MAP.s40.en,
    });
  }

  // 3. GEL -> TT + (K1, K2, K3) OR TF + (K1, K2, K3)
  if (
    (isTranstibial && ["K1", "K2", "K3"].includes(activityLevel)) ||
    (isTransfemoral && ["K1", "K2", "K3"].includes(activityLevel))
  ) {
    availableOptions.push({
      key: "gel",
      imgSrc: IMAGE_MAP.gel[currentLang] || IMAGE_MAP.gel.en,
    });
  }

  const handleSelect = (materialKey) => {
    setSelectedMaterial(materialKey);
    localStorage.setItem("liner_material", materialKey);

    const targetPath = isTranstibial
      ? "/sizing/liner/tt/circumference"
      : "/sizing/liner/tf/circumference";

    setTimeout(() => {
      navigate(targetPath);
    }, 200);
  };

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

        {/* 3. Filtered Material Options */}
        <div className="mt-8 space-y-6 flex flex-col items-center">
          {availableOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => handleSelect(opt.key)}
              className="cursor-pointer focus:outline-none"
            >
              <img
                src={opt.imgSrc}
                alt={opt.key}
                className="w-60 h-auto object-contain transition-opacity hover:opacity-70"
              />
            </button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}