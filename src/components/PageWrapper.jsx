import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ CHANGED
import { useTranslation } from "react-i18next";
import ProgressBar from "./ProgressBar";
import EthnocareLogo from "../assets/ethnocare-logo.svg";
import LanguageButton from "./LanguageButton";

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
  code = false,
  currentStep = null,
  totalSteps = null,
}) {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ NEW
  const { t } = useTranslation("common");

  // ✅ CHANGED: show only on Assistance pages (never on "/")
  const showContactCard = location.pathname.startsWith("/assistance");

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-gray-50 px-6 pt-4 pb-4 flex flex-col items-center"
    >
      {code && (
        <div className="-mx-6 w-screen bg-black text-white text-center font-sans font-semibold py-2 mb-2">
          {t("cta.header")}
        </div>
      )}

      <div className="w-full flex flex-col gap-3 mb-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-0">
        <div className="flex justify-start">
          {showBack && (
            <button
              onClick={() => navigate(backTo)}
              className="flex items-center gap-2 text-[18px] text-black font-sans cursor-pointer"
              aria-label={t("cta.back")}
              title={t("cta.back")}
            >
              <span className="text-xl">←</span> {t("cta.back")}
            </button>
          )}
        </div>

        <div className="flex justify-center">
          {currentStep !== null && totalSteps !== null && (
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          )}
        </div>

        <div />
      </div>

      <div className="flex-grow w-full flex flex-col items-center">
        {children}
      </div>

      {/* Footer */}
      <footer className="w-full mt-10 flex flex-col items-center">
        {/* ✅ Contact card only on /assistance routes */}
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

        <div className="w-full mt-4 flex items-center justify-between">
          <img
            src={EthnocareLogo}
            alt="Ethnocare"
            className="h-4 w-auto object-contain"
          />
          <LanguageButton />
        </div>
      </footer>
    </motion.div>
  );
}
