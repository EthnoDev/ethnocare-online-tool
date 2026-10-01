import PageWrapper from "../../../../components/PageWrapper";
import { useTranslation } from "react-i18next";
import SeeMore from "../../../../components/SeeMore";
import SmartPumpImg from "../../../../assets/smartPump.svg";

export default function SmartPump() {
  const { t } = useTranslation(["pages", "common"]);

  const productCode = localStorage.getItem("product_code") || "N/A";
  const savedProblemKey = localStorage.getItem("problem_key");
  const savedDetailKey = localStorage.getItem("detail_key");

  const translatedProblem = savedProblemKey ? t(savedProblemKey) : "N/A";

  let translatedDetail = "N/A";
  if (savedDetailKey) {
    try {
      const parsed = JSON.parse(savedDetailKey);
      translatedDetail = Array.isArray(parsed)
        ? parsed.map((key) => t(key)).join(", ")
        : t(parsed);
    } catch {
      translatedDetail = t(savedDetailKey);
    }
  }

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
        <SeeMore
          className="w-full"
          summary={{
            heading: t("contactForm.summaryHeadingDefault", { ns: "common" }),
            product: productCode,
            issue: translatedProblem,
            detail: translatedDetail,
          }}
        />
      </div>
    </PageWrapper>
  );
}