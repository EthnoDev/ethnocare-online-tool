import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";
import RedirectLogo from "../../assets/redirect-logo.svg";
import { useTranslation } from "react-i18next";

export default function ReturnAssistanceTool() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const user = localStorage.getItem("user");
  const { t } = useTranslation("pages");

  const description =
    user === "distributor"
      ? t("assistanceToolReturn.descriptionDistributor")
      : t("assistanceToolReturn.descriptionClinic");

  const handleSelect = (key) => {
    if (selected) return;
    setSelected(key);

    localStorage.setItem("assistance_tool", key);

    setTimeout(() => {
      if (key === "yes") {
        // TODO: replace with your real next return page
        // navigate("/return/next-page");
      }

      if (key === "no") {
        window.open("/assistance/product", "_blank", "noopener,noreferrer");
        setSelected(null);
      }
    }, 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo="/return/identification"
      code={true}
      currentStep={2}
      totalSteps={3}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("assistanceToolReturn.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {description}
        </p>

        <div className="mt-8 space-y-5 flex flex-col items-center">
          <SelectableOption
            label={t("assistanceToolReturn.option1")}
            selected={selected === "yes"}
            onClick={() => handleSelect("yes")}
          />

          <SelectableOption
            label={
              <span className="flex items-center justify-center gap-2">
                <span>{t("assistanceToolReturn.option2")}</span>
                <img
                  src={RedirectLogo}
                  alt=""
                  aria-hidden="true"
                  className={`h-4 w-4 transition-colors ${
                    selected === "no"
                      ? "brightness-0 invert"
                      : "opacity-100"
                  }`}
                />
              </span>
            }
            selected={selected === "no"}
            onClick={() => handleSelect("no")}
          />
        </div>
      </div>
    </PageWrapper>
  );
}