import { useEffect } from "react";
import XIcon from "../assets/x.svg";
import RedirectLogo from "../assets/redirect-logo.svg";
import PageTransitionWrapper from "./PageTransitionWrapper";
import { useTranslation } from "react-i18next";

export default function SizingPdfPopup({
  onClose,
  ttPdfPath,
  tfPdfPath,
  underlayTtPdfPath,
}) {

    const { t, i18n } = useTranslation("common");
  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const openPdf = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const LinkRow = ({ label, url }) => (
    <button
      type="button"
      onClick={() => openPdf(url)}
      className="flex items-center gap-1 text-sm underline underline-offset-4 decoration-[1px]"
    >
      <span>{label}</span>
      <img
        src={RedirectLogo}
        alt=""
        aria-hidden="true"
        className="h-3 w-4 ml-0 mt-0"
      />
    </button>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        className="fixed inset-0 flex items-center justify-center z-20"
        role="dialog"
        aria-modal="true"
        aria-label="Sizing Charts in PDF"
        onClick={(e) => e.stopPropagation()}
      >
        <PageTransitionWrapper>
          <div className="bg-white p-6 rounded-xl shadow-lg relative w-[320px] text-center font-sans">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-5 h-5"
              aria-label="Close"
              title="Close"
            >
              <img src={XIcon} alt="" className="w-5 h-5" />
            </button>

            {/* Title */}
            <p className="text-xl font-semibold mb-6">{t("cta.sizingsPopup")}</p>

            {/* Overlay */}
            <p className="text-xl font-semibold">Overlay</p>
            <div className="space-y-1 flex flex-col items-center mb-6">
              <LinkRow label="Overlay TT" url={ttPdfPath} />
              <LinkRow label="Overlay TF" url={tfPdfPath} />
            </div>

            {/* Underlay */}
            <p className="text-xl font-semibold">Underlay</p>
            <div className="space-y-1 flex flex-col items-center mb-2">
              <LinkRow label="Underlay TT" url={underlayTtPdfPath} />
            </div>
          </div>
        </PageTransitionWrapper>
      </div>
    </>
  );
}
