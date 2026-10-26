import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import EthnocareLogo from "../assets/ethnocare-logo.svg";
import LanguageButton from "./LanguageButton";
import DownloadLogo from "../assets/download.svg";
import SelectableOption from "./SelectableOption";
import SizingChartsPopup from "./SizingPdfPopup";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

export default function PageWrapper({
  children,
  showBack = false,
  backTo = "/",
  backFallback = "/",
  currentStep = null,
  code = false,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation("common");

  const [chartsOpen, setChartsOpen] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState(null);
  const openCharts = () => setChartsOpen(true);
  const closeCharts = () => setChartsOpen(false);

  useEffect(() => {
    if (navigationTarget === null) return;

    const timer = setTimeout(() => {
      navigate(navigationTarget);
      setNavigationTarget(null);
    }, 200);

    return () => clearTimeout(timer);
  }, [navigationTarget, navigate]);

  const handleNavigate = (target) => {
    setNavigationTarget((current) => current === null ? target : current);
  };

  // Route-based visibility checks
  const showContactCard = location.pathname.startsWith("/assistance");
  const showSizingCharts = location.pathname.startsWith("/sizing");

  // Dynamic totalSteps calculation based on stored selection
  const product = localStorage.getItem("product") || "";
  const underlaySeal = localStorage.getItem("underlay_seal") || "";
  const amputation = (localStorage.getItem("amputation") || "").toLowerCase();

  let totalSteps;
  if (product === "Underlay") {
    totalSteps = underlaySeal === "open-seal" ? 5 : 4;
  } else if (product === "Overlay") {
    totalSteps = (amputation === "transfemoral" || amputation === "tf") ? 4 : 5;
  } else if (product === "Liner") {
    totalSteps = 6;
  } else {
  }

  // Distributors flow has its own fixed step count
  if (location.pathname.startsWith("/distributors")) {
    totalSteps = 3;
  }

  // --- Language-dependent PDF suffix helpers ---
  const getOverlayPdfSuffix = () => {
    const lang = i18n.language || "en";
    if (lang.startsWith("fr")) return "FR";
    if (lang.startsWith("es")) return "ES";
    if (lang.startsWith("de")) return "DE";
    return "EN";
  };

  const getUnderlayPdfSuffix = () => {
    const lang = i18n.language || "en";
    if (lang.startsWith("fr")) return "FR";
    return "EN";
  };

  const overlayPdfSuffix = getOverlayPdfSuffix();
  const underlayPdfSuffix = getUnderlayPdfSuffix();

  const ttPdfPath = `/Sizing%20Charts/OVTT_SIZING-CHART_${overlayPdfSuffix}.pdf`;
  const tfPdfPath = `/Sizing%20Charts/OVTF_SIZING-CHART_${overlayPdfSuffix}.pdf`;
  const underlayTtPdfPath = `/Sizing%20Charts/UDTT_SIZING-CHART_${underlayPdfSuffix}.pdf`;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gray-50 px-6 pt-4 pb-6 flex flex-col items-center"
    >
      {code && (
        <div className="-mx-6 w-screen bg-black text-white text-center font-sans font-semibold py-2">
          {t("cta.header")}
        </div>
      )}

      {/* Top navigation and progress */}
      <div className="w-full grid grid-cols-2 items-center mt-2 gap-3 sm:grid-cols-3 sm:gap-0">
        <div className="col-start-1 row-start-1 flex justify-start">
          {showBack && (
            <button
              onClick={() => {
                if (typeof backTo === "number") {
                  // location.key is "default" when there is no in-app history (direct load)
                  if (location.key !== "default") handleNavigate(backTo);
                  else handleNavigate(backFallback);
                } else {
                  handleNavigate(backTo);
                }
              }}
              disabled={navigationTarget !== null}
              className="flex items-center gap-2 text-lg text-black font-sans cursor-pointer"
              aria-label={t("cta.back_description")}
              title={t("cta.back_description")}
            >
              <span className="text-xl">←</span> {t("cta.back")}
            </button>
          )}
        </div>

        <div className="col-span-2 row-start-2 flex justify-center sm:col-span-1 sm:col-start-2 sm:row-start-1">
          {currentStep !== null && (
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          )}
        </div>

        <div className="col-start-2 row-start-1 flex justify-end sm:col-start-3">
          <button
            type="button"
            onClick={() => handleNavigate("/")}
            disabled={navigationTarget !== null}
            className="group flex h-11 w-11 items-center justify-center rounded-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            aria-label={t("cta.home")}
            title={t("cta.home")}
          >
            <svg viewBox="0 0 13 14" aria-hidden="true" className="h-5 w-5">
              {/* Outline icon, from home.svg */}
              <path d="M6.25994 0.0790067L0.153875 4.74567C0.058148 4.81832 -0.000469889 4.93637 2.83779e-06 5.05557V13.6111C2.25348e-05 13.8147 0.187676 14 0.393942 14H4.53031C4.73657 14 4.92423 13.8147 4.92424 13.6111V8.94446H8.07576V13.6111C8.07578 13.8147 8.26343 14 8.4697 14H12.6061C12.8123 14 13 13.8147 13 13.6111V5.05557C13 4.93637 12.9419 4.81832 12.8461 4.74567L6.74007 0.0790067C6.56061 -0.0317097 6.40605 -0.0208208 6.25994 0.0790067ZM6.5 0.875023L12.2121 5.24394V13.2222H8.86364V8.55557C8.86362 8.35195 8.67597 8.1667 8.4697 8.16668H4.53031C4.32404 8.1667 4.13639 8.35195 4.13637 8.55557V13.2222H0.787881V5.24394L6.5 0.875023Z" />
              {/* Solid fill, shown on hover/press */}
              <path
                className="opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100"
                d="M6.25994 0.0790067L0.153875 4.74567C0.058148 4.81832 -0.000469889 4.93637 2.83779e-06 5.05557V13.6111C2.25348e-05 13.8147 0.187676 14 0.393942 14H4.53031C4.73657 14 4.92423 13.8147 4.92424 13.6111V8.94446H8.07576V13.6111C8.07578 13.8147 8.26343 14 8.4697 14H12.6061C12.8123 14 13 13.8147 13 13.6111V5.05557C13 4.93637 12.9419 4.81832 12.8461 4.74567L6.74007 0.0790067C6.56061 -0.0317097 6.40605 -0.0208208 6.25994 0.0790067Z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-grow w-full flex flex-col mt-4 items-center">
        {children}
      </div>

      {/* Footer */}
      <footer className="w-full mt-10 flex flex-col items-center">
        {/* Contact card only on /assistance routes */}
        {showContactCard && (
          <div className="max-w-xs w-full text-center rounded-xl border border-gray-200 bg-white shadow-sm px-4 py-3 font-sans">
            <p className="font-semibold">{t("footer.contact_us")}</p>
            <p className="text-sm mt-1">
              {t("footer.mail")}{" "}
              <a href="mailto:Clinics@ethnocare.ca" className="underline">
                Clinics@ethnocare.ca
              </a>
            </p>
            <p className="text-sm">
              {t("footer.phone")}{" "}
              <a href="tel:+14189345669" className="underline">
                +1 (418) 934 5669
              </a>
            </p>
          </div>
        )}

        {/* Logo + Actions Row */}
        <div className="w-full mt-3 flex items-center justify-between">
          <img
            src={EthnocareLogo}
            alt="Ethnocare"
            className="h-3 sm:h-4 w-auto object-contain"
          />

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sizing charts button only on /sizing routes */}
            {showSizingCharts && (
              <SelectableOption
                compact
                selected={false}
                onClick={openCharts}
                label={
                  <span className="flex items-center gap-1 sm:gap-2 justify-center">
                    <img
                      src={DownloadLogo}
                      alt=""
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />

                    <span className="text-xs sm:text-base leading-tight">
                      {t("cta.sizings")}
                    </span>
                  </span>
                }
              />
            )}

            <LanguageButton />
          </div>
        </div>
      </footer>

      {chartsOpen && (
        <SizingChartsPopup
          onClose={closeCharts}
          ttPdfPath={ttPdfPath}
          tfPdfPath={tfPdfPath}
          underlayTtPdfPath={underlayTtPdfPath}
        />
      )}
    </motion.div>
  );
}