// src/pages/assistance/ProductSelection.jsx
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
  
  // Retrieve the amputation type to filter available products
  const amputation = localStorage.getItem("amputation");

  const handleSelect = (productName) => {
    // Save the selection to localStorage
    localStorage.setItem("product", productName);

    // Brief delay for visual feedback before navigating
    setTimeout(() => {
      navigate("/assistance/selection");
    }, 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo="/assistance/amputation"
      code={true}
    >
      <div className="w-full max-w-md">
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
              className="w-60 h-auto object-contain transition-opacity hover:opacity-70"
            />
          </button>

          {/* Only show Underlay and Liner for transtibial users */}
          {amputation === "transtibial" && (
            <>
              {/* Underlay */}
              <button
                type="button"
                onClick={() => handleSelect("underlay")}
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
                onClick={() => handleSelect("liner")}
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