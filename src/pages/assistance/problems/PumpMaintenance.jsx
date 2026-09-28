import PageWrapper from "../../../components/PageWrapper";
import SelectableOption from "../../../components/SelectableOption";
import { useTranslation } from "react-i18next";
import leakTestVideo from "../../../assets/videos/leak-test.mp4";

export default function PumpMaintenance() {
  const { t } = useTranslation("pages");

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem/air-loss">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("pumpMaintenanceAssistance.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("pumpMaintenanceAssistance.description")}
        </p>

        <video
          src={leakTestVideo}
          controls
          playsInline
          className="w-full h-auto mt-8 rounded-xl"
        />

        <div className="mt-6">
          <SelectableOption
            label={t("pumpMaintenanceAssistance.next")}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
