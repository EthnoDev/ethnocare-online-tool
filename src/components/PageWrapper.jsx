import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
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
  currentStep = null,
  code = false,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation("common");

  const [chartsOpen, setChartsOpen] = useState(false);
  const openCharts = () => setChartsOpen(true);
  const closeCharts = () => setChartsOpen(false);

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
  } else {

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

      {/* Top: Back + Progress */}
      <div className="w-full flex flex-col mt-2 gap-3 mb-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-0">
        <div className="flex justify-start">
          {showBack && (
            <button
              onClick={() => navigate(backTo)}
              className="flex items-center gap-2 text-lg text-black font-sans cursor-pointer"
              aria-label={t("cta.back")}
              title={t("cta.back")}
            >
              <span className="text-xl">←</span> {t("cta.back")}
            </button>
          )}
        </div>

        <div className="flex justify-center">
          {currentStep !== null && (
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          )}
        </div>

        <div /> {/* right spacer */}
      </div>

      {/* Main content */}
      <div className="flex-grow w-full flex flex-col items-center">
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
        <div className="w-full mt-4 flex items-center justify-between">
          <img
            src={EthnocareLogo}
            alt="Ethnocare"
            className="h-4 w-auto object-contain"
          />
          <div className="flex items-center gap-3">
            {/* Sizing charts button only on /sizing routes */}
            {showSizingCharts && (
              <SelectableOption
                compact
                selected={false}
                onClick={openCharts}
                label={
                  <span className="flex items-center gap-2 justify-center">
                    <img
                      src={DownloadLogo}
                      alt=""
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    <span>{t("cta.sizings")}</span>
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