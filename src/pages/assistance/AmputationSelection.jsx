import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";
import { trackAmputationSelected } from "../../components/trackAmputationSelected";

// assets
import TT from "../../assets/amputation/transtibial.svg";
import TF from "../../assets/amputation/transfemoral.svg";
import TF_FR from "../../assets/amputation/transfemoral_FR.svg";
import TF_SOON from "../../assets/amputation/transfemoralSoon.svg";
import TF_SOON_FR from "../../assets/amputation/transfemoralSoon_FR.svg";
import TF_SOON_ES from "../../assets/amputation/transfemoralSoon_ES.svg";
import TF_SOON_DE from "../../assets/amputation/transfemoralSoon_DE.svg";

const tfSoonImages = {
  en: TF_SOON,
  fr: TF_SOON_FR,
  es: TF_SOON_ES,
  de: TF_SOON_DE,
};

export default function AssistanceAmputationSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation(["pages", "common"]);

  const tfImage = i18n.language === "fr" ? TF_FR : TF;
  const language = (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];
  const tfSoonImage = tfSoonImages[language] || TF_SOON;
  const isUnderlay = localStorage.getItem("product") === "underlay";

  const handleSelect = (type) => {
    if (selected) return;

    setSelected(type);
    localStorage.setItem("amputation", type);
    trackAmputationSelected(type);

    setTimeout(() => {
      navigate("/assistance/selection");
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/assistance/product" code={true}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("amputationAssistance.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("amputationAssistance.description")}
        </p>

        <div className="mt-8 space-y-6 flex flex-col items-center">
          <button
            type="button"
            onClick={() => handleSelect("transtibial")}
            className="cursor-pointer focus:outline-none"
            aria-label={t("common:amputation.tt")}
            title={t("common:amputation.tt")}
          >
            <div
              className={`rounded-md ${
                selected === "transtibial"
                  ? "ring-4 ring-[#090C41]"
                  : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black"
              }`}
            >
              <img
                src={TT}
                alt={t("common:amputation.tt")}
                className="w-70 h-auto object-contain rounded-md block"
              />
            </div>
          </button>

          {isUnderlay ? (
            <button
              type="button"
              disabled
              className="cursor-default focus:outline-none"
              aria-label={t("common:amputation.tfSoon")}
            >
              <div className="rounded-md ring-1 ring-gray-300">
                {/* Artwork is wider than Transtibial (285×200 vs 250×200); crop the empty sides to match */}
                <img
                  src={tfSoonImage}
                  alt={t("common:amputation.tfSoon")}
                  className="w-70 aspect-[5/4] object-cover rounded-md block"
                />
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleSelect("transfemoral")}
              className="cursor-pointer focus:outline-none"
              aria-label={t("common:amputation.tf")}
              title={t("common:amputation.tf")}
            >
              <div
                className={`rounded-md ${
                  selected === "transfemoral"
                    ? "ring-4 ring-[#090C41]"
                    : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black"
                }`}
              >
                <img
                  src={tfImage}
                  alt={t("common:amputation.tf")}
                  className="w-70 h-auto object-contain rounded-md block"
                />
              </div>
            </button>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}