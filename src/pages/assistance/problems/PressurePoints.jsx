// src/pages/assistance/PressurePoints.jsx
import { useMemo } from "react";
import PageWrapper from "../../../components/PageWrapper";
import ContactForm from "../../../components/ContactForm";
import PressurePointsTT from "../../../assets/pressurePointsTT.svg";
import PressurePointsTF from "../../../assets/pressurePointsTF.svg";
import { useTranslation } from "react-i18next";

export default function PressurePoints() {
  const { t } = useTranslation(["pages", "common"]);

  const productCode = localStorage.getItem("product_code") || "N/A";
  const product = useMemo(() => localStorage.getItem("amputation"), []);

  const savedKey = localStorage.getItem("problem_key");
  const translatedProblem = savedKey ? t(savedKey) : "N/A";

  const pressureImage = product === "transtibial" ? PressurePointsTT : PressurePointsTF;

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
            {t("pressurePointsAssistance.title")}</h1>
        <p className="mt-3 text-center text-base text-slate-500">
            {t("pressurePointsAssistance.description")}
        </p>

        <div className="mt-8 text-left space-y-6">
        <img
          src={pressureImage}
          alt="Pressure points guide"
          className="w-52 sm:w-56 h-auto mx-auto"
        />

        <div>
          <p className="text-sm font-semibold">{t("common:contactForm.question")}</p>
          <p className="text-xs">{t("common:contactForm.order")}</p>
        </div>

        <ContactForm
          summary={{
            heading: t("common:contactForm.summaryHeadingDefault"),
            product: productCode,
            issue: translatedProblem,
            detail: "N/A",
          }}
          onSubmit={({ message, email }) => {}}
        />

        </div>
      </div>
    </PageWrapper>
  );
}