import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";
import { useTranslation } from "react-i18next";

export default function Identification() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // "user/clinic" | "distributor"
  const { t } = useTranslation("pages");

  const handleSelect = (key) => {
    if (selected) return;
    setSelected(key);

    localStorage.setItem("user", key);

    setTimeout(() => {
      navigate("/return/assistance-tool");
    }, 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo="/return"
      code={true}
      currentStep={1}
      totalSteps={3}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("identificationReturn.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("identificationReturn.description")}
        </p>

        <div className="mt-8 space-y-5 flex flex-col items-center">
          <SelectableOption
            label={t("identificationReturn.option1")}
            selected={selected === "user/clinic"}
            onClick={() => handleSelect("user/clinic")}
          />

          <SelectableOption
            label={t("identificationReturn.option2")}
            selected={selected === "distributor"}
            onClick={() => handleSelect("distributor")}
          />
        </div>
      </div>
    </PageWrapper>
  );
}