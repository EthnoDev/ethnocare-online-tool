// src/pages/sizing/UnitsSelection.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";
import { useTranslation } from "react-i18next";

const getNextSizingPath = (product, amputation) => {
  if (product === "Liner") return "/sizing/liner/activity";
  if (product === "Underlay") return "/sizing/TTsuspension";
  if (product === "Overlay") {
    if (amputation === "transtibial") return "/sizing/TTsuspension";
    if (amputation === "transfemoral") return "/sizing/TFsuspension";
  }
  return "/sizing/product";
};

export default function SizingUnitsSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null); // "imperial" | "metric"
  const { t } = useTranslation("pages");

  const handleSelect = (unit) => {
    if (selected) return; // prevent double clicks
    setSelected(unit);

    localStorage.setItem("units", unit); // "imperial" or "metric"

    const nextPath = getNextSizingPath(
      localStorage.getItem("product"),
      localStorage.getItem("amputation")
    );

    setTimeout(() => {
      navigate(nextPath);
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/sizing/amputation" code={true}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("unitsSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("unitsSizing.description")}
        </p>

        <div className="mt-8 space-y-6 flex flex-col items-center">
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
