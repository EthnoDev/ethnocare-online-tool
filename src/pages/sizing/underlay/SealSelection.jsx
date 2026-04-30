import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];
const pickLang = (code) => (["fr", "es", "de"].includes(code) ? code : "en");

/** ---------- Seal Images (Localized) ---------- */
import Open_en from "../../../assets/seals/open.svg";
import Open_fr from "../../../assets/seals/open_fr.svg";
import Open_es from "../../../assets/seals/open_es.svg";
import Open_de from "../../../assets/seals/open_de.svg";

import Closed_en from "../../../assets/seals/closed.svg";
import Closed_fr from "../../../assets/seals/closed_fr.svg";
import Closed_es from "../../../assets/seals/closed_es.svg";
import Closed_de from "../../../assets/seals/closed_de.svg";

const SEAL_IMAGES = {
  open: { en: Open_en, fr: Open_fr, es: Open_es, de: Open_de },
  closed: { en: Closed_en, fr: Closed_fr, es: Closed_es, de: Closed_de },
};

export default function SealSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = pickLang(baseLang(i18n.language));

  const handleSelect = (optionId) => {
    if (selected) return;
    setSelected(optionId);
    localStorage.setItem("underlay_seal", optionId);

    setTimeout(() => {
      navigate("/sizing/underlay/length");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/product" 
      currentStep={1} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-100 max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("sealUnderlaySizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("sealUnderlaySizing.description")}
        </p>

        <div className="mt-10 flex flex-col items-center gap-10">
          
          {/* Option: Open Seal */}
          <button
            type="button"
            onClick={() => handleSelect("open-seal")}
            className="cursor-pointer focus:outline-none transition-all w-fit flex flex-col items-center group"
          >
            <div
              className={`rounded-xl overflow-hidden transition-all duration-150 flex ${
                selected === "open-seal"
                  ? "ring-4 ring-[#090C41]" 
                  : "ring-1 ring-gray-300 group-hover:ring-2 group-hover:ring-black"
              }`}
            >
              <img
                src={SEAL_IMAGES.open[lang] || SEAL_IMAGES.open.en}
                alt="Open Seal"
                className="h-auto w-full block rounded-xl max-w-[320px] object-cover" 
              />
            </div>
            <div className="mt-4 text-center">
              {/* Text color is now strictly slate-500 with no conditional logic */}
              <p className="text-sm max-w-[300px] leading-snug text-slate-500">
                {t("sealUnderlaySizing.open_description")}
              </p>
            </div>
          </button>

          {/* Option: Closed Seal */}
          <button
            type="button"
            onClick={() => handleSelect("closed-seal")}
            className="cursor-pointer focus:outline-none transition-all w-fit flex flex-col items-center group"
          >
            <div
              className={`rounded-xl overflow-hidden transition-all duration-150 flex ${
                selected === "closed-seal"
                  ? "ring-4 ring-[#090C41]" 
                  : "ring-1 ring-gray-300 group-hover:ring-2 group-hover:ring-black"
              }`}
            >
              <img
                src={SEAL_IMAGES.closed[lang] || SEAL_IMAGES.closed.en}
                alt="Closed Seal"
                className="h-auto w-full block rounded-xl max-w-[320px] object-cover" 
              />
            </div>
            <div className="mt-4 text-center">
              {/* Text color is now strictly slate-500 with no conditional logic */}
              <p className="text-sm max-w-[300px] leading-snug text-slate-500">
                {t("sealUnderlaySizing.closed_description")}
              </p>
            </div>
          </button>

        </div>
      </div>
    </PageWrapper>
  );
}