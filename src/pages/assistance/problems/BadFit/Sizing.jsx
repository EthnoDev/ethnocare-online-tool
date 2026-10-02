import PageWrapper from "../../../../components/PageWrapper";
import SelectableOption from "../../../../components/SelectableOption";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Sizing() {
  const { t } = useTranslation("pages");
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // Mirrors the options in SizeSelection.jsx, ordered small to large
  const getSizeOptions = (amputation) =>
    amputation === "transfemoral"
      ? {
          circumference: ["32", "38", "40", "44", "48", "52"],
          length: ["SH", "LG", "XL"],
        }
      : { circumference: ["23", "28", "35"], length: ["SH", "LG"] };

  const hasAlternativeSize = (issue) => {
    const options = getSizeOptions(localStorage.getItem("amputation"));
    const isCircumference = issue === "loose" || issue === "tight";
    const list = isCircumference ? options.circumference : options.length;
    const current = localStorage.getItem(
      isCircumference ? "product_circumference" : "product_length"
    );
    const index = list.indexOf(current);
    if (index === -1) return false;

    // Loose/long needs a smaller size; tight/short needs a larger one
    const wantsSmaller = issue === "loose" || issue === "long";
    return wantsSmaller ? index > 0 : index < list.length - 1;
  };

  const handleSelect = (issue) => {
    if (selected) return;
    setSelected(issue);

    const hasCode = localStorage.getItem("product_code") !== "N/A";
    const route =
      hasCode && hasAlternativeSize(issue)
        ? "/assistance/problem/bad-fit/verify-size"
        : "/assistance/problem/other";

    setTimeout(() => navigate(route), 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem/bad-fit">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("sizingBadFitAssistance.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("sizingBadFitAssistance.description")}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-6">
          {["loose", "tight", "long", "short"].map((issue) => (
            <SelectableOption
              key={issue}
              compact
              fullWidth
              label={t(`sizingBadFitAssistance.${issue}`)}
              selected={selected === issue}
              onClick={() => handleSelect(issue)}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
