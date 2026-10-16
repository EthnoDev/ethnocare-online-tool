import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useTranslation } from "react-i18next";

// product images
import OverlayImg from "../../assets/products/overlay.png";
import UnderlayImg from "../../assets/products/underlay.png";

export default function DistributorsProductSelection() {
  const { t } = useTranslation("pages");
  const [selected, setSelected] = useState(null);

  const amputation = localStorage.getItem("amputation");

  const handleSelect = (productName) => {
    if (selected) return;

    setSelected(productName);
    localStorage.setItem("product", productName);
  };

  return (
    <PageWrapper showBack={true} backTo="/distributors/amputation" code={true}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("productSizing.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("productSizing.description")}
        </p>

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

          {/* Underlay - Transtibial only */}
          {amputation === "transtibial" && (
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
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
