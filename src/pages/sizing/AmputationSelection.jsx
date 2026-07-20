// src/pages/sizing/SizingAmputationSelection.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";

// assets
import TT from "../../assets/amputation/transtibial.png";
import TF from "../../assets/amputation/transfemoral.png";
import TF_FR from "../../assets/amputation/transfemoral_FR.png";

export default function SizingAmputationSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  
  // Single hook setup calling both namespaces and exposing i18n
  const { t, i18n } = useTranslation(["pages", "common"]);

  const tfImage = i18n.language === "fr" ? TF_FR : TF;

  const handleSelect = (type) => {
    if (selected) return;

    setSelected(type);
    localStorage.setItem("amputation", type);

    setTimeout(() => {
      navigate("/sizing/product");
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/sizing/units" code={true}>
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("amputationSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("amputationSizing.description")}
        </p>

        <div className="mt-8 space-y-6 flex flex-col items-center">
          {/* Transtibial Option */}
          <button
            type="button"
            onClick={() => handleSelect("transtibial")}
            className="cursor-pointer focus:outline-none"
            aria-label={t("common:amputation.tt")}
            title={t("common:amputation.tt")}
          >
            <div
              className={`rounded-xl ${
                selected === "transtibial"
                  ? "ring-4 ring-[#090C41]"
                  : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black"
              }`}
            >
              <img
                src={TT}
                alt={t("common:amputation.tt")}
                className="w-60 h-auto object-contain rounded-xl block"
              />
            </div>
          </button>

          {/* Transfemoral Option */}
          <button
            type="button"
            onClick={() => handleSelect("transfemoral")}
            className="cursor-pointer focus:outline-none"
            aria-label={t("common:amputation.tf")}
            title={t("common:amputation.tf")}
          >
            <div
              className={`rounded-xl ${
                selected === "transfemoral"
                  ? "ring-4 ring-[#090C41]"
                  : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black"
              }`}
            >
              <img
                src={tfImage}
                alt={t("common:amputation.tf")}
                className="w-60 h-auto object-contain rounded-xl block"
              />
            </div>
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}