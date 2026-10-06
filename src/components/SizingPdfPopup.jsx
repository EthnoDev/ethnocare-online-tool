import { useEffect } from "react";
import XIcon from "../assets/x.svg";
import RedirectIcon from "./RedirectIcon";
import PageTransitionWrapper from "./PageTransitionWrapper";
import { useTranslation } from "react-i18next";

export default function SizingPdfPopup({ onClose }) {
  const { t } = useTranslation("common");

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
      className="group flex items-center gap-1 text-sm underline underline-offset-4 decoration-[1px] cursor-pointer hover:font-bold"
    >
      <span
        data-label={label}
        className="inline-flex flex-col items-center after:invisible after:block after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-label)]"
      >
        {label}
      </span>
      <RedirectIcon className="h-3 w-4" />
    </button>
  );

  const pdfs = {
    overlayTT: "/Sizing Charts/OVTT_SIZING-CHART_EN.pdf",
    overlayTF: "/Sizing Charts/OVTF_SIZING-CHART_EN.pdf",
    underlayTT: "/Sizing Charts/UDTT_SIZING-CHART_EN.pdf",
  };

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
          <div className="bg-white p-6 rounded-xl shadow-xl relative max-w-sm text-center font-sans">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-5 h-5 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
              title="Close"
            >
              <img src={XIcon} alt="" className="w-5 h-5 pointer-events-none" />
            </button>

            {/* Title */}
            <p className="text-2xl mt-3 font-bold">
              {t("cta.sizingsPopup")}
            </p>

            {/* Overlay */}
            <p className="text-xl mt-3 font-semibold">Overlay</p>
            <div className="space-y-1 flex flex-col items-center">
              <LinkRow label="Overlay TT" url={pdfs.overlayTT} />
              <LinkRow label="Overlay TF" url={pdfs.overlayTF} />
            </div>

            {/* Underlay */}
            <p className="text-xl mt-3 font-semibold">Underlay</p>
            <div className="space-y-1 flex flex-col items-center">
              <LinkRow label="Underlay TT" url={pdfs.underlayTT} />
            </div>
          </div>
        </PageTransitionWrapper>
      </div>
    </>
  );
}