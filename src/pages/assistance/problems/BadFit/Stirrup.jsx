import PageWrapper from "../../../../components/PageWrapper";
import { useTranslation } from "react-i18next";
import SeeMore from "../../../../components/SeeMore";

// assets
import StirrupImg from "../../../../assets/stirrup.png";

export default function Stirrup() {
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
    <PageWrapper 
      showBack={true} 
      backTo="/assistance/problem/bad-fit/moving"
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("stirrupAssistance.title")}
        </h1>

        {/* Content Container */}
        <div className="mt-8 flex flex-col items-center">
          
          {/* Illustrated Asset Box */}
          <div className="rounded-xl overflow-hidden flex">
            <img
              src={StirrupImg}
              alt="Stirrup"
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