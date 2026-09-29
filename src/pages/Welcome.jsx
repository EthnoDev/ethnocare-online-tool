import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import SelectableOption from "../components/SelectableOption";
import PageTransitionWrapper from "../components/PageTransitionWrapper";
import RedirectLogo from "../assets/redirect-logo.svg";
import { useTranslation } from "react-i18next";

export default function Welcome() {
  const navigate = useNavigate();
  const [goingTo, setGoingTo] = useState(null);
  const [showRecommendationNotice, setShowRecommendationNotice] = useState(false);
  const { t } = useTranslation("pages");

  useEffect(() => {
    if (!showRecommendationNotice) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setShowRecommendationNotice(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showRecommendationNotice]);

  const delayedNav = (key, action) => {
    if (goingTo) return;
    setGoingTo(key);

    setTimeout(() => {
      action?.();
    }, 200);
  };

  return (
    <PageWrapper showBack={false} backTo="/" code={true}>
      <div className="w-full max-w-sm ">
        <h1 className="text-4xl font-bold text-center text-slate-900 leading-tight">
          {t("welcome.title")}
        </h1>

        <p className="mt-3 text-center text-xl text-slate-500">
          {t("welcome.description")}
        </p>

        <div className="mt-8 space-y-6">
          <SelectableOption
            label={t("welcome.option1")}
            description={t("welcome.description1")}
            selected={goingTo === "sizing"}
            onClick={() =>
              delayedNav("sizing", () => navigate("/sizing/units"))
            }
          />

          <SelectableOption
            label={t("welcome.option2")}
            description={t("welcome.description2")}
            selected={goingTo === "assistance"}
            onClick={() =>
              delayedNav("assistance", () => navigate("/assistance/amputation"))
            }
          />

          <SelectableOption
            label={t("welcome.option3")}
            description={t("welcome.description3")}
            selected={goingTo === "return"}
            onClick={() =>
              delayedNav("return", () => navigate("/return/identification"))
            }
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

        <div className="mt-12">
          <SelectableOption
            label={t("welcome.option5")}
            description={t("welcome.description5")}
            variant="solid"
            onClick={() => setShowRecommendationNotice(true)}
          />
        </div>
      </div>

      {showRecommendationNotice && (
        <>
          <div
            className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowRecommendationNotice(false)}
          />
          <div
            className="fixed inset-0 z-20 flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recommendation-notice-title"
          >
            <PageTransitionWrapper>
              <div className="w-full max-w-xs rounded-xl bg-white p-6 text-center font-sans shadow-xl">
                <h2
                  id="recommendation-notice-title"
                  className="text-2xl font-bold text-slate-900"
                >
                  {t("welcomeRecommendationNotice.title")}
                </h2>
                <p className="mt-2 text-sm leading-snug text-slate-600">
                  {t("welcomeRecommendationNotice.description")}
                </p>
                <button
                  type="button"
                  autoFocus
                  onClick={() => setShowRecommendationNotice(false)}
                  className="mt-5 cursor-pointer rounded-md border border-black bg-black px-6 py-2 font-medium text-white transition-colors hover:bg-[#090C41]"
                >
                  {t("welcomeRecommendationNotice.closeButton")}
                </button>
              </div>
            </PageTransitionWrapper>
          </div>
        </>
      )}
    </PageWrapper>
  );
}
