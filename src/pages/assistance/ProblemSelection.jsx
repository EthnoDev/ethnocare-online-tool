// src/pages/assistance/ProblemSelection.jsx
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { useTranslation } from "react-i18next";

export default function ProblemSelection() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");

  return (
    <PageWrapper
      showBack={true}
      backTo="/assistance/size"
      code={true}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("problemAssistance.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("problemAssistance.description")}
        </p>
      </div>
    </PageWrapper>
  );
}