// src/pages/assistance/underlay/SealSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import { trackSealSelected } from "../../../components/trackSealSelected";

/** ---------- Helpers ---------- */
const baseLang = (code) => (code || "en").split("-")[0];
const pickLang = (code) => (["fr", "es", "de"].includes(code) ? code : "en");

/** ---------- Seal Images (Localized) ---------- */
import Open_en from "../../../assets/seals/open.png";
import Open_fr from "../../../assets/seals/open_fr.png";
import Open_es from "../../../assets/seals/open_es.png";
import Open_de from "../../../assets/seals/open_de.png";

import Closed_en from "../../../assets/seals/closed.png";
import Closed_fr from "../../../assets/seals/closed_fr.png";
import Closed_es from "../../../assets/seals/closed_es.png";
import Closed_de from "../../../assets/seals/closed_de.png";

const SEAL_IMAGES = {
  open: { en: Open_en, fr: Open_fr, es: Open_es, de: Open_de },
  closed: { en: Closed_en, fr: Closed_fr, es: Closed_es, de: Closed_de },
};

export default function SealSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation(["pages", "common"]);

  const lang = pickLang(baseLang(i18n.language));
  const suspension = localStorage.getItem("suspension");
  const isSleeve = suspension === "TT-suspension-sleeve";
  const options = isSleeve ? ["closed", "open"] : ["open", "closed"];

  const handleSelect = (optionId) => {
    if (selected) return;
    setSelected(optionId);
    localStorage.setItem("underlay_seal", optionId);
    trackSealSelected(optionId);

    setTimeout(() => {
      navigate("/sizing/underlay/circumference");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/TTsuspension" 
      currentStep={null}
      code={true}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("sealUnderlaySizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("sealUnderlaySizing.description")}
        </p>

        <div className="mt-8 flex flex-col items-center space-y-6">
          {options.map((option) => (
            <div
              key={option}
              className="w-fit flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => handleSelect(`${option}-seal`)}
                className={`cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 rounded-xl overflow-hidden transition-all duration-150 flex ${
                  selected === `${option}-seal`
                    ? "ring-4 ring-[#090C41]" 
                    : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black"
                }`}
              >
                <img
                  src={SEAL_IMAGES[option][lang] || SEAL_IMAGES[option].en}
                  alt={t(`common:seal.${option}-title`)}
                  className="h-auto w-full block rounded-md max-w-xs object-cover" 
                />
              </button>
              <div className="mt-2 text-center">
                <p className="text-sm max-w-xs leading-snug text-slate-500 italic">
                  <Trans
                    ns="pages"
                    i18nKey={`sealUnderlaySizing.${option}_${
                      isSleeve ? "exception" : "description"
                    }`}
                    components={{
                      underline: (
                        <a
                          href="/User%20Guides/UDTT_OPEN-VACUUM-INSTRUCTIONS.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer underline underline-offset-4 decoration-[1px] hover:font-bold"
                        />
                      ),
                    }}
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}