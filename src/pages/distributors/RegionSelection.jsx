import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";

const UNDERLAY_REGIONS = ["europe", "northAmerica", "oceania", "southAmerica"];
const OVERLAY_REGIONS = [...UNDERLAY_REGIONS, "africa", "asia", "middleEast"];

export default function DistributorsRegionSelection() {
  const { t, i18n } = useTranslation("pages");
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const product = localStorage.getItem("product");
  const regionKeys = product === "underlay" ? UNDERLAY_REGIONS : OVERLAY_REGIONS;

  // Sorted by the translated label so the order is alphabetical in every language
  const regions = regionKeys
    .map((key) => ({ key, label: t(`regionDistributors.regions.${key}`) }))
    .sort((a, b) => a.label.localeCompare(b.label, i18n.language));

  const handleSelect = (region) => {
    if (selected) return;

    setSelected(region);
    localStorage.setItem("region", region);

    setTimeout(() => {
      navigate("/distributors/list");
    }, 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo="/distributors/product"
      code={true}
      currentStep={3}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("regionDistributors.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("regionDistributors.description")}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6">
          {regions.map(({ key, label }) => (
            <SelectableOption
              key={key}
              fullWidth
              label={label}
              selected={selected === key}
              onClick={() => handleSelect(key)}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
