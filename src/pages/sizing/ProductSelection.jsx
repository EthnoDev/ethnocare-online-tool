// src/pages/sizing/ProductSelection.jsx
import PageWrapper from "../../components/PageWrapper";
import { useTranslation } from "react-i18next";

// product images
import OverlayImg from "../../assets/products/overlay.png";
import UnderlayImg from "../../assets/products/underlay.png";
import LinerImg from "../../assets/products/liner.png";

export default function ProductSelection() {
  const amputation = localStorage.getItem("amputation");
  const { t } = useTranslation("pages");

  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing/amputation"
      code={true}
    >
      <div className="w-full max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("productSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("productSizing.description")}
        </p>

        <div className="mt-8 space-y-6 flex flex-col items-center">
          {/* Overlay - always shown */}
          <button type="button" className="cursor-pointer focus:outline-none">
            <img
              src={OverlayImg}
              alt="Overlay"
              className="w-60 h-auto object-contain transition-opacity hover:opacity-70"
            />
          </button>

          {/* Only show these for transtibial */}
          {amputation === "transtibial" && (
            <>
              <button type="button" className="cursor-pointer focus:outline-none">
                <img
                  src={UnderlayImg}
                  alt="Underlay"
                  className="w-60 h-auto object-contain transition-opacity hover:opacity-70"
                />
              </button>

              <button type="button" className="cursor-pointer focus:outline-none">
                <img
                  src={LinerImg}
                  alt="Liner"
                  className="w-60 h-auto object-contain transition-opacity hover:opacity-70"
                />
              </button>
            </>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}