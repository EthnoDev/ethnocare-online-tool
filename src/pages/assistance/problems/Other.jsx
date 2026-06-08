// src/pages/assistance/problems/Other.jsx
import PageWrapper from "../../../components/PageWrapper";
import ContactForm from "../../../components/ContactForm";
import { useTranslation } from "react-i18next";

export default function Other() {
  const { t } = useTranslation(["pages", "common"]);

  const productCode = localStorage.getItem("product_code") || "N/A";
  const savedProblemKey = localStorage.getItem("problem_key");
  const savedDetailKey = localStorage.getItem("detail_key");

  const translatedProblem = savedProblemKey ? t(savedProblemKey) : "N/A";

  let translatedDetail = "N/A";
  if (savedDetailKey) {
    try {
      const parsed = JSON.parse(savedDetailKey);
      if (Array.isArray(parsed)) {
        translatedDetail = parsed.map((k) => t(k)).join(", ");
      } else {
        translatedDetail = t(parsed);
      }
    } catch (e) {
      translatedDetail = t(savedDetailKey);
    }
  }

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("otherAssistance.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("otherAssistance.description")}
        </p>

        <div className="mt-8 text-left space-y-6">
        <div>
          <p className="text-sm font-semibold">{t("common:contactForm.question")}</p>
          <p className="text-xs">{t("common:contactForm.order")}</p>
        </div>

        <ContactForm
          summary={{
            heading: t("common:contactForm.summaryHeadingDefault"),
            product: productCode,
            issue: translatedProblem,
            detail: translatedDetail,
          }}
          onSubmit={({ message, email }) => {}}
        />
        </div>
      </div>
    </PageWrapper>
  );
}