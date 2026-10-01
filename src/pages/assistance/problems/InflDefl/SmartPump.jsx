import PageWrapper from "../../../../components/PageWrapper";
import { useTranslation } from "react-i18next";
import SmartPumpImg from "../../../../assets/smartPump.svg";

export default function SmartPump() {
  const { t } = useTranslation("pages");

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem/inflation-deflation">
      <div className="w-full max-w-sm flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("smartPumpAssistance.title")}
        </h1>
        <div className="mt-8 flex flex-col items-center">
          <div className="rounded-xl overflow-hidden flex">
            <img
              src={SmartPumpImg}
              alt="Smart Pump"
              className="w-70 h-auto block rounded-xl object-contain"
            />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}