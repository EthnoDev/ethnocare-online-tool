import PageWrapper from "../../../../components/PageWrapper";
import SelectableOption from "../../../../components/SelectableOption";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import YouTubeEmbed from "../../../../components/YouTubeEmbed";

export default function PumpMaintenance() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (selected) return;

    setSelected("next");
    setTimeout(() => {
      navigate("/assistance/problem/air-loss/return");
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem/air-loss">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("pumpMaintenanceAssistance.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("pumpMaintenanceAssistance.description")}
        </p>

        <YouTubeEmbed
          videoId="mxA4KCOqC-U"
          title={t("pumpMaintenanceAssistance.title")}
          className="mt-8"
        />

        <div className="mt-6">
          <SelectableOption
            label={t("pumpMaintenanceAssistance.next")}
            selected={selected === "next"}
            onClick={handleNext}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
