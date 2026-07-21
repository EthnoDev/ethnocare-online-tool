import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PageTransitionWrapper from "./PageTransitionWrapper";
import SelectableOption from "./SelectableOption";

export default function LinerPopup({ onClose, onConfirm }) {
  const { t } = useTranslation("common");
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleClose = () => {
    setSelectedOption("option1");
    setTimeout(() => {
      onClose?.();
    }, 200); // 200ms delay for visual feedback
  };

  const handleConfirm = () => {
    setSelectedOption("option2");
    setTimeout(() => {
      onConfirm?.();
    }, 200); // 200ms delay for visual feedback
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 cursor-default"
        onClick={handleClose}
      />

      {/* Centered Modal */}
      <div
        className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none px-4"
        role="dialog"
        aria-modal="true"
      >
        <PageTransitionWrapper>
          <div
            className="bg-white p-6 rounded-2xl shadow-xl relative w-full max-w-[340px] text-center font-sans pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              {t("linerPopup.title")}
            </h2>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-snug mb-6">
              {t("linerPopup.description")}
            </p>

            {/* Action Buttons using SelectableOption */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <SelectableOption
                  compact
                  selected={selectedOption === "option1"}
                  onClick={handleClose}
                  label={t("linerPopup.option1")}
                />
              </div>

              <div className="flex-1">
                <SelectableOption
                  compact
                  selected={selectedOption === "option2"}
                  onClick={handleConfirm}
                  label={t("linerPopup.option2")}
                />
              </div>
            </div>
          </div>
        </PageTransitionWrapper>
      </div>
    </>
  );
}