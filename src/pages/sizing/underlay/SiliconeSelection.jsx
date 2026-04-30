import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../../components/PageWrapper";
import SelectableOption from "../../../components/SelectableOption";

/** ---------- Assets ---------- */
import SiliconeImg from "../../../assets/silicone.svg";

export default function SiliconeSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation(["pages", "common"]);

  const handleSelect = (optionId) => {
    if (selected) return; // Prevent double clicks
    setSelected(optionId);
    
    // Save selection
    localStorage.setItem("underlay_silicone", optionId);

    // Testing destination with 200ms delay
    setTimeout(() => {
      navigate("/sizing/underlay/circumference");
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/sizing/underlay/circumference" 
      currentStep={4} 
      totalSteps={5} 
      code={true}
    >
      <div className="w-100 max-w-md mt-2 flex flex-col items-center">
        {/* 1. Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("siliconeUnderlaySizing.title")}
        </h1>

        {/* 2. Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("siliconeUnderlaySizing.description")}
        </p>

        {/* 3. Image */}
        <div className="mt-8 flex justify-center">
          <img
            src={SiliconeImg}
            alt="Silicone Selection Diagram"
            className="h-auto w-full block max-w-[320px]"
          />
        </div>

        {/* 4. Description under the image */}
        <div className="mt-4 text-center">
          <p className="text-sm max-w-[300px] leading-snug text-slate-500 italic">
            {t("siliconeUnderlaySizing.image_caption")}
          </p>
        </div>

        {/* 5. Horizontal Options */}
        <div className="mt-10 flex flex-row items-center justify-center gap-4 ">
          <SelectableOption
            label={t("siliconeUnderlaySizing.option1")}
            selected={selected === "standard"}
            onClick={() => handleSelect("standard")}
          />

          <SelectableOption
            label={t("siliconeUnderlaySizing.option2")}
            selected={selected === "distal"}
            onClick={() => handleSelect("distal")}
          />
        </div>
      </div>
    </PageWrapper>
  );
}