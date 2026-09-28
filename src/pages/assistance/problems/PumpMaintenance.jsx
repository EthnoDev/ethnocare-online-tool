import PageWrapper from "../../../components/PageWrapper";
import { useTranslation } from "react-i18next";

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
      </div>
    </PageWrapper>
  );
}
