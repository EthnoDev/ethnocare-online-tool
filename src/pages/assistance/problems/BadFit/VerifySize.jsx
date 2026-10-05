import PageWrapper from "../../../../components/PageWrapper";
import ContactForm from "../../../../components/ContactForm";
import { useTranslation } from "react-i18next";
import RedirectLogo from "../../../../assets/redirect-logo.svg";

export default function VerifySize() {
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
    <PageWrapper showBack={true} backTo="/assistance/problem/bad-fit/sizing">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("verifySizeAssistance.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("verifySizeAssistance.description")}
        </p>
        <p className="mt-8 text-left text-xl font-semibold">
          {t("verifySizeAssistance.step1")}
        </p>
        <p className="text-left text-sm text-slate-600">
          {t("verifySizeAssistance.descriptionStep1")}
        </p>
        <div className="mt-2 flex justify-center">
          <a
            href="/sizing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-black bg-black px-6 py-3 font-sans text-base font-bold text-white transition-colors hover:border-[#090C41] hover:bg-[#090C41]"
          >
            <span>{t("verifySizeAssistance.startButton")}</span>
            <img
              src={RedirectLogo}
              alt=""
              aria-hidden="true"
              className="ml-2 h-4 w-5 invert"
            />
          </a>
        </div>
        <p className="mt-6 text-left text-xl font-semibold">
          {t("verifySizeAssistance.step2")}
        </p>
        <p className="text-left text-sm text-slate-600">
          {t("verifySizeAssistance.descriptionStep2")}
        </p>
        <p className="mt-8 text-xs text-slate-600">
          {t("verifySizeAssistance.additionalInfo")}
        </p>
        <div className="mt-1">
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
