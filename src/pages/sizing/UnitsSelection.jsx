// src/pages/sizing/UnitsSelection.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";
import { useTranslation } from "react-i18next";

export default function SizingUnitsSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // "imperial" | "metric"
  const { t } = useTranslation("pages");

  const handleSelect = (unit) => {
    if (selected) return; // prevent double clicks
    setSelected(unit);

    // ✅ save for future pages
    localStorage.setItem("units", unit); // "imperial" or "metric"

    setTimeout(() => {
      navigate("/sizing/amputation"); // ✅ goes to AmputationSelection.jsx
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/sizing" code={true}>
      <div className="w-full max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("unitsSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("unitsSizing.description")}
        </p>

        <div className="mt-8 space-y-5 flex flex-col items-center">
          <SelectableOption
            label={t("unitsSizing.option1")}
            selected={selected === "imperial"}
            onClick={() => handleSelect("imperial")}
          />

          <SelectableOption
            label={t("unitsSizing.option2")}
            selected={selected === "metric"}
            onClick={() => handleSelect("metric")}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
