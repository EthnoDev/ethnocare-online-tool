import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SelectableOption from "./SelectableOption";
import XIcon from "../assets/x.svg";
import PageTransitionWrapper from "./PageTransitionWrapper";

function baseLang(code) {
  return (code || "en").split("-")[0];
}

export default function LanguagePopup({ onClose }) {
  const { t, i18n } = useTranslation("common");
  const current = baseLang(i18n.language);

  const options = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "de", label: "Deutsch" },
  ];

  const handleSelect = (code) => {
    // Smooth UX delay (matches your other flows)
    setTimeout(() => {
      i18n.changeLanguage(code);
      onClose?.();
    }, 200);
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop (click to close) */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10"
        onClick={onClose}
      />

      {/* Centered layer for the animated card */}
      <div
        className="fixed inset-0 flex items-center justify-center z-20"
        role="dialog"
        aria-modal="true"
        aria-label={t("footer.select_language")}
        onClick={(e) => e.stopPropagation()} // prevent backdrop click
      >
        {/* Animate only the card */}
        <PageTransitionWrapper>
          <div className="bg-white p-6 rounded-xl shadow-lg relative w-[300px] text-center font-sans">
            {/* Close (X) */}
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-4 right-4 w-5 h-5"
              aria-label="Close"
              title="Close"
            >
              <img src={XIcon} alt="" className="w-5 h-5" />
            </button>

            <p className="text-xl font-semibold mb-4">
              {t("footer.select_language")}
            </p>

            <div className="space-y-3">
              {options.map((opt) => (
                <SelectableOption
                  key={opt.code}
                  label={opt.label}
                  selected={current === opt.code}
                  onClick={() => handleSelect(opt.code)}
                />
              ))}
            </div>
          </div>
        </PageTransitionWrapper>
      </div>
    </>
  );
}
