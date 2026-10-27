import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useTranslation } from "react-i18next";
import LinerPopup from "../../components/LinerRedirectionPopup";
import { trackProductSelected } from "../../components/trackProductSelected";
import { trackAssistanceStarted } from "../../components/trackAssistanceStarted";

// product images
import OverlayImg from "../../assets/products/overlay.png";
import UnderlayImg from "../../assets/products/underlay.png"; // or .webp
import LinerImg from "../../assets/products/liner.png";

export default function ProductSelection() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");
  const [showLinerPopup, setShowLinerPopup] = useState(false);

  useEffect(() => {
    trackAssistanceStarted();
  }, []);

  const handleSelect = (productName) => {
    trackProductSelected(productName);
    if (productName === "liner") {
      localStorage.setItem("product", productName);
      setShowLinerPopup(true);
      return;
    }

    // Save the selection to localStorage
    localStorage.setItem("product", productName);

    // Brief delay for visual feedback before navigating
    setTimeout(() => {
      navigate("/assistance/amputation");
    }, 200);
  };

  const handleConfirmLiner = () => {
    setShowLinerPopup(false);
    setTimeout(() => navigate("/assistance/amputation"), 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo="/"
      code={true}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("productAssistance.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("productAssistance.description")}
        </p>

        {/* Product options */}
        <div className="mt-8 space-y-6 flex flex-col items-center">
          
          {/* Overlay - Always visible */}
          <button
            type="button"
            onClick={() => handleSelect("overlay")}
            className="cursor-pointer focus:outline-none"
          >
            <img
              src={OverlayImg}
              alt="Overlay"
              className="w-70 h-auto object-contain transition-opacity hover:opacity-70"
            />
          </button>

          {/* Underlay - transtibial only, enforced on the amputation step */}
          <button
            type="button"
            onClick={() => handleSelect("underlay")}
            className="cursor-pointer focus:outline-none"
          >
            <img
              src={UnderlayImg}
              alt="Underlay"
              className="w-70 h-auto object-contain transition-opacity hover:opacity-70"
            />
          </button>

          {/* Liner */}
          <button
            type="button"
            onClick={() => handleSelect("liner")}
            className="cursor-pointer focus:outline-none"
          >
            <img
              src={LinerImg}
              alt="Liner"
              className="w-70 h-auto object-contain transition-opacity hover:opacity-70"
            />
            <span className="mt-2 block text-center text-sm text-slate-600">
              {t("common:products.linerAvailability")}
            </span>
          </button>
        </div>
      </div>

      {showLinerPopup && (
        <LinerPopup
          onClose={() => setShowLinerPopup(false)}
          onConfirm={handleConfirmLiner}
        />
      )}
    </PageWrapper>
  );
}