import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import SelectableOption from "../components/SelectableOption";
import RedirectLogo from "../assets/redirect-logo.svg";
import { useTranslation } from "react-i18next";

export default function Welcome() {
  const navigate = useNavigate();
  const [goingTo, setGoingTo] = useState(null);
  const { t } = useTranslation("pages");

  const delayedNav = (key, action) => {
    if (goingTo) return;
    setGoingTo(key);

    setTimeout(() => {
      action?.();
    }, 200);
  };

  return (
    <PageWrapper showBack={false} backTo="/" code={true}>
      <div className="w-full max-w-md mt-6">
        <h1 className="text-4xl font-bold text-center text-slate-900 leading-tight">
          {t("welcome.title")}
        </h1>

        <p className="mt-5 text-center text-lg text-slate-500">
          {t("welcome.description")}
        </p>

        <div className="mt-8 space-y-6">
          <SelectableOption
            label={t("welcome.option1")}
            description={t("welcome.description1")}
            selected={goingTo === "sizing"}
            onClick={() => delayedNav("sizing", () => navigate("/sizing"))}
          />

          <SelectableOption
            label={t("welcome.option2")}
            description={t("welcome.description2")}
            selected={goingTo === "assistance"}
            onClick={() => delayedNav("assistance", () => navigate("/assistance"))}
          />

          <SelectableOption
            label={t("welcome.option3")}
            description={t("welcome.description3")}
            selected={goingTo === "return"}
            onClick={() => delayedNav("return", () => navigate("/return"))}
          />

          <SelectableOption
            label={
              <span className="flex items-center justify-center gap-2">
                <span>{t("welcome.option4")}</span>
                <img
                  src={RedirectLogo}
                  alt=""
                  aria-hidden="true"
                  className={`h-4 w-4 transition-colors ${
                    goingTo === "faq"
                      ? "brightness-0 invert" // turns SVG white
                      : "opacity-100"
                  }`}
                />
              </span>
            }
            description={t("welcome.description4")}
            selected={goingTo === "faq"}
            onClick={() =>
              delayedNav("faq", () => {
                window.open(
                  "https://ethnocare.ca/pages/information",
                  "_blank",
                  "noopener,noreferrer"
                );
                setGoingTo(null);
              })
            }
          />
        </div>

        <div className="mt-20">
          <SelectableOption
            label={t("welcome.option5")}
            description={t("welcome.description5")}
            variant="solid"
            selected={goingTo === "recommendation"}
            onClick={() =>
              delayedNav("recommendation", () =>
                navigate("/recommendation")
              )
            }
          />
        </div>
      </div>
    </PageWrapper>
  );
}
