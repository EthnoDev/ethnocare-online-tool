// src/components/LinerRedirectionPopup2.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import XIcon from "../assets/x.svg";
import RedirectLogo from "../assets/redirect-logo.svg";
import PageTransitionWrapper from "./PageTransitionWrapper";
import SelectableOption from "./SelectableOption";

export default function LinerRedirectionPopup2({
  onClose,
  onSelectGel,
  onHome,
}) {
  const { t } = useTranslation("common");
  const [selectedBtn, setSelectedBtn] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Determine unit and dynamic gel distance
  const isImperial = localStorage.getItem("units") === "imperial";
  const gelDistance = isImperial ? "15.7 in ± 0.8 in" : "40 cm ± 2 cm";

  const handleHomeClick = () => {
    setSelectedBtn("home");
    setTimeout(onHome, 200);
  };

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
            {/* Close Button (X) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-5 h-5 cursor-pointer flex items-center justify-center"
              aria-label="Close"
            >
              <img src={XIcon} alt="" className="w-5 h-5 pointer-events-none" />
            </button>

            {/* Title */}
            <h2 className="text-xl font-semibold mb-4 mt-2 text-slate-900">
              {t("tooSmallPopup.title")}
            </h2>

            {/* Description 1 */}
            <p className="text-gray-600 text-sm mt-4 mb-3 leading-snug">
              {t("tooSmallPopup.description")}
            </p>

            {/* Description 2 (Bold Gel Distance) */}
            <p className="text-slate-900 font-bold text-sm mb-6 leading-snug">
              {t("tooSmallPopup.description2", { distance: gelDistance })}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5 w-full">
              {/* Gel Option Button */}
              <button
                onClick={() => setTimeout(onSelectGel, 200)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#090C41] text-white rounded-md font-semibold text-md hover:bg-[#1a1e6f] transition cursor-pointer"
              >
                <span>{t("tooSmallPopup.gelButton")}</span>
                <img
                  src={RedirectLogo}
                  alt=""
                  aria-hidden="true"
                  className="w-4 h-4 brightness-0 invert pointer-events-none"
                />
              </button>

              {/* Return to Home Button (SelectableOption) */}
              <div className="w-full text-md font-semibold [&_button]:w-full [&_button]:py-3 [&_button]:text-md [&_button]:font-semibold">
                <SelectableOption
                  label={t("tooSmallPopup.homeButton")}
                  selected={selectedBtn === "home"}
                  onClick={handleHomeClick}
                />
              </div>
            </div>

            {/* Contact Line Section */}
            <p className="text-gray-600 text-sm mt-6">
              {t("tooSmallPopup.contact_line")}
            </p>
            <p className="text-sm font-bold underline text-[#090C41]">
              clinics@ethnocare.ca
            </p>
          </div>
        </PageTransitionWrapper>
      </div>
    </>
  );
}