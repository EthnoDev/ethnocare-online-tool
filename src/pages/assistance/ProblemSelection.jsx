// src/pages/assistance/ProblemSelection.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { useTranslation } from "react-i18next";
import SelectableOption from "../../components/SelectableOption";

export default function ProblemSelection() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");

  const amputation = localStorage.getItem("amputation");

  const [selectedProblemKey, setSelectedProblemKey] = useState(null);

  const transtibialProblems = [
    { key: "tibialPressurePoint", label: t("problemAssistance.tibialPressurePoint"), route: "/assistance/tibial-point" },
    { key: "badFit",              label: t("problemAssistance.badFit"),              route: "/assistance/bad-fit" },
    { key: "airLoss",             label: t("problemAssistance.airLoss"),             route: "/assistance/air-loss" },
    { key: "inflationDeflation",  label: t("problemAssistance.inflationDeflation"),  route: "/assistance/infdef-issues" },
    { key: "other",               label: t("problemAssistance.other"),               route: "/assistance/other-issues" },
  ];

  const transfemoralProblems = [
    { key: "airLoss",            label: t("problemAssistance.airLoss"),            route: "/assistance/air-loss" },
    { key: "badFit",             label: t("problemAssistance.badFit"),             route: "/assistance/bad-fit" },
    { key: "inflationDeflation", label: t("problemAssistance.inflationDeflation"), route: "/assistance/infdef-issues" },
    { key: "other",              label: t("problemAssistance.other"),              route: "/assistance/other-issues" },
  ];

  const problems = amputation === "transtibial" ? transtibialProblems : transfemoralProblems;

  const handleSelect = (problem) => {
    setSelectedProblemKey(problem.key);
    localStorage.setItem("problem_key", `pages:identifyProblem.${problem.key}`);
    navigate(problem.route);
  };

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

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {problems.map((problem) => (
            <SelectableOption
              key={problem.key}
              label={problem.label}
              selected={selectedProblemKey === problem.key}
              onClick={() => handleSelect(problem)}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}