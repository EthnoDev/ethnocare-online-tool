import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import XIcon from "../assets/x.svg";
import PageTransitionWrapper from "./PageTransitionWrapper";

export default function RedirectionPopup({ onClose, onRedirect }) {
  const { t } = useTranslation("common");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 cursor-default"
        onClick={onClose}
      />

      {/* Centered card */}
      <div
        className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
        role="dialog"
        aria-modal="true"
      >
        <PageTransitionWrapper>
          <div 
            className="bg-white p-6 rounded-xl shadow-lg relative w-[300px] text-center font-sans pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close (X) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-5 h-5 cursor-pointer flex items-center justify-center"
              aria-label="Close"
            >
              <img src={XIcon} alt="" className="w-5 h-5 pointer-events-none" />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-4 mt-2">
              {t("redirectionPopup.title")}
            </h2>

            {/* Body */}
            <p className="text-gray-600 text-sm mt-4 mb-6">
              {t("redirectionPopup.description")}
            </p>

            {/* Redirect button */}
            <button
              onClick={() => setTimeout(onRedirect, 200)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#090C41] text-white rounded-md font-semibold text-md hover:bg-[#1a1e6f] transition cursor-pointer"
            >
              {t("redirectionPopup.cta")}
            </button>

          </div>
        </PageTransitionWrapper>
      </div>
    </>
  );
}