// src/pages/sizing/ProductSelection.jsx
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { useTranslation } from "react-i18next";

// product images
import OverlayImg from "../../assets/products/overlay.png";
import UnderlayImg from "../../assets/products/underlay.png";
import LinerImg from "../../assets/products/liner.png";

export default function ProductSelection() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");
  const amputation = localStorage.getItem("amputation");

  const handleSelect = (product) => {
    // Save selection to storage
    localStorage.setItem("product", product);

    // Navigation logic for Overlay
    if (product === "Overlay") {
      if (amputation === "transtibial") {
        setTimeout(() => navigate("/sizing/TTsuspension"), 200);
        return;
      }
      if (amputation === "transfemoral") {
        setTimeout(() => navigate("/sizing/TFsuspension"), 200);
        return;
      }
    }
    // Navigation logic for Underlay (Transtibial only)
    if (product === "Underlay") {
      setTimeout(() => navigate("/sizing/underlay/seal"), 200);
      return;
    }
  };

  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing/amputation"
      code={true}
    >
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("productSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("productSizing.description")}
        </p>

        <div className="mt-8 space-y-6 flex flex-col items-center">
          {/* Overlay - always shown */}
          <button 
            type="button" 
            onClick={() => handleSelect("Overlay")}
            className="cursor-pointer focus:outline-none"
          >
            <img
              src={OverlayImg}
              alt="Overlay"
              className="w-60 h-auto object-contain transition-opacity hover:opacity-70"
            />
          </button>

          {/* Only show these for transtibial */}
          {amputation === "transtibial" && (
            <>
              {/* Underlay */}
              <button 
                type="button" 
                onClick={() => handleSelect("Underlay")}
                className="cursor-pointer focus:outline-none"
              >
                <img
                  src={UnderlayImg}
                  alt="Underlay"
                  className="w-60 h-auto object-contain transition-opacity hover:opacity-70"
                />
              </button>

              {/* Liner */}
              <button 
                type="button" 
                onClick={() => handleSelect("Liner")}
                className="cursor-pointer focus:outline-none"
              >
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