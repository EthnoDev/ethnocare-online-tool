import PageWrapper from "../../../../components/PageWrapper";
import SelectableOption from "../../../../components/SelectableOption";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function InflDefl() {
  const { t } = useTranslation("pages");
  const [selected, setSelected] = useState(null);

  const options = ["deflate", "inflateInteg", "inflateExtern", "pressure"];

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("inflDeflAssistance.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("inflDeflAssistance.description")}
        </p>

        <div className="mt-8 flex flex-col items-center space-y-6">
          {options.map((option) => (
            <SelectableOption
              key={option}
              label={t(`inflDeflAssistance.${option}`)}
              selected={selected === option}
              onClick={() => setSelected(option)}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}