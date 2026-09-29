import PageWrapper from "../../../../components/PageWrapper";
import ContactForm from "../../../../components/ContactForm";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Return() {
  const navigate = useNavigate();
  const { t } = useTranslation(["pages", "common"]);
  const [isRestarting, setIsRestarting] = useState(false);

  const productCode = localStorage.getItem("product_code") || "N/A";
  const savedProblemKey = localStorage.getItem("problem_key");
  const savedDetailKey = localStorage.getItem("detail_key");

  const translatedProblem = savedProblemKey ? t(savedProblemKey) : "N/A";

  let translatedDetail = "N/A";
  if (savedDetailKey) {
    try {
      const parsed = JSON.parse(savedDetailKey);
      if (Array.isArray(parsed)) {
        translatedDetail = parsed.map((key) => t(key)).join(", ");
      } else {
        translatedDetail = t(parsed);
      }
    } catch (error) {
      translatedDetail = t(savedDetailKey);
    }
  }

  const handleRestart = () => {
    if (isRestarting) return;

    setIsRestarting(true);
    setTimeout(() => {
      navigate("/assistance/problem");
    }, 200);
  };

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem/air-loss/pump-maintenance">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("returnAssistance.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("returnAssistance.description")}
        </p>

        <div className="mt-8 text-left space-y-6">
          <div>
            <p className="text-base font-semibold">{t("common:contactForm.question")}</p>
            <p className="text-sm">{t("common:contactForm.order")}</p>
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

        <div className="flex justify-center mt-6">
          <button
            onClick={handleRestart}
            className={`px-6 py-3 text-base rounded-md border font-sans font-bold transition-all cursor-pointer
              ${isRestarting
                ? "bg-[#090C41] text-white border-[#090C41]"
                : "bg-white text-black border-gray-300 hover:border-black"
              }`}
          >
            {t("cta.restart2", { ns: "common" })}
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
