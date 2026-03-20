// src/pages/assistance/AssistanceSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";

// assets
import RedirectLogo from "../../assets/redirect-logo.svg";

export default function AssistanceSelection() {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();
  
  const [selected, setSelected] = useState(null);
  const [isRouting, setIsRouting] = useState(false);

  const handleSelect = (value) => {
    if (isRouting) return; 
    
    setSelected(value);
    setIsRouting(true);

    setTimeout(() => {
      if (value === "User Guide") {
        // Logic for PDF opening can go here later
        // window.open("/path-to-pdf.pdf", "_blank");
        setIsRouting(false);
        setSelected(null);
      } else if (value === "Assistance") {
        // Navigate to the size selection page
        navigate("/assistance/size");
        setIsRouting(false);
      }
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/assistance/product" 
      code={true}
    >
      <div className="w-full max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("assistanceAssistance.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("assistanceAssistance.description")}
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          {/* User Guide Option */}
          <SelectableOption
            label={
              <span className="flex items-center justify-center gap-1">
                {t("assistanceAssistance.option1")}
                <img
                  src={RedirectLogo}
                  alt=""
                  aria-hidden="true"
                  className={`h-4 w-4 ml-1 transition-all ${
                    selected === "User Guide"
                      ? "brightness-0 invert"
                      : "opacity-100"
                  }`}
                />
              </span>
            }
            selected={selected === "User Guide"}
            onClick={() => handleSelect("User Guide")}
            className={isRouting ? "pointer-events-none opacity-80" : ""}
          />

          {/* Assistance Flow Option */}
          <SelectableOption
            label={t("assistanceAssistance.option2")}
            selected={selected === "Assistance"}
            onClick={() => handleSelect("Assistance")}
            className={isRouting ? "pointer-events-none opacity-80" : ""}
            aria-disabled={isRouting}
          />
        </div>
      </div>
    </PageWrapper>
  );
}