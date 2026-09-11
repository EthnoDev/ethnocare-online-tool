import { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import XIcon from "../assets/x.svg";
import RedirectLogo from "../assets/redirect-logo.svg";
import PageTransitionWrapper from "./PageTransitionWrapper";

export default function RedirectionPopup({ onClose, onRedirect }) {
  const { t } = useTranslation("common");

  // Retrieve stored size and unit values exactly like SizeUnderlay.jsx
  const selectedSize = localStorage.getItem("underlay_circumference");
  const units = localStorage.getItem("units");
  const isImperial = units === "imperial";

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Table ranges conditionally mapped based on unit preference
  const tableData = [
    {
      size: "Size 23",
      range: isImperial
        ? "Min : 9 in\nMax : 13.7 in"
        : "Min : 23 cm\nMax : 35 cm",
    },
    {
      size: "Size 28",
      range: isImperial
        ? "Min : 11 in\nMax : 17.7 in"
        : "Min : 28 cm\nMax : 45 cm",
    },
    {
      size: "Size 35",
      range: isImperial
        ? "Min : 13.7 in\nMax : 21.6 in"
        : "Min : 35 cm\nMax : 55 cm",
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10 cursor-default"
        onClick={onClose}
      />

      {/* Centered Modal Container */}
      <div
        className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
        role="dialog"
        aria-modal="true"
      >
        <PageTransitionWrapper>
          <div
            className="bg-white p-6 rounded-2xl shadow-xl relative w-full max-w-[360px] text-center font-sans pointer-events-auto border border-gray-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (X) */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-6 h-6 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <img src={XIcon} alt="" className="w-5 h-5 pointer-events-none" />
            </button>

            {/* Main Title */}
            <h2 className="text-2xl font-bold mb-5 mt-2 text-slate-900 leading-tight">
              {t("redirectionPopup.title")}
            </h2>

            {/* Description / Instructions */}
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed mb-6">
              <p>
                <Trans
                  ns="common"
                  i18nKey="redirectionPopup.description_p1"
                  components={{ bold: <strong className="font-bold text-black" /> }}
                />
              </p>

              <p>
                <Trans
                  ns="common"
                  i18nKey="redirectionPopup.description_p2"
                  components={{ bold: <strong className="font-bold text-black" /> }}
                />
              </p>

              <p>
                <Trans
                  ns="common"
                  i18nKey="redirectionPopup.description_p3"
                  components={{ bold: <strong className="font-bold text-black" /> }}
                />
              </p>
            </div>

            {/* Gray Pill Section for Current Size */}
            <div className="w-full bg-gray-200/80 rounded-xl py-3 px-4 mb-4 text-slate-800 text-sm font-medium">
              {t("redirectionPopup.measured_size_label", "Measured Underlay open :")}{" "}
              <strong className="font-bold text-black">
                {selectedSize ? `Size ${selectedSize}` : "—"}
              </strong>
            </div>

            {/* Table Section */}
            <div className="w-full mb-1">
              <table className="w-full border border-gray-300 text-sm border-collapse">
                <thead>
                  <tr>
                    <th
                      colSpan="2"
                      className="bg-gray-100 border-b border-gray-300 p-2 font-semibold text-gray-800 text-center"
                    >
                      {t("redirectionPopup.table_header")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row) => (
                    <tr key={row.size}>
                      <td className="border border-gray-300 p-2 font-medium text-center w-1/3 align-middle text-gray-800">
                        {row.size}
                      </td>
                      <td className="border border-gray-300 p-2 text-left whitespace-pre-line align-middle text-gray-700">
                        {row.range}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sub-table asterisk note */}
            <p className="text-xs text-slate-500 text-left mb-10 leading-tight">
              {t("redirectionPopup.table_footnote")}
            </p>

            {/* Redirect CTA Button */}
            <button
              onClick={() => setTimeout(onRedirect, 200)}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-black text-white rounded-xl font-sans font-bold hover:bg-[#090C41] transition-all cursor-pointer text-base"
            >
              <img
                src={RedirectLogo}
                alt=""
                aria-hidden="true"
                className="w-4 h-4 brightness-0 invert pointer-events-none"
              />
              <span>{t("redirectionPopup.cta")}</span>
            </button>
          </div>
        </PageTransitionWrapper>
      </div>
    </>
  );
}