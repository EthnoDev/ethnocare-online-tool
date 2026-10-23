import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { trackProductSelected } from "../../components/trackProductSelected";
import { trackDistributorsStarted } from "../../components/trackDistributorsStarted";
import { useTranslation } from "react-i18next";

// product images
import OverlayImg from "../../assets/products/overlay.png";
import UnderlayImg from "../../assets/products/underlay.png";

export default function DistributorsProductSelection() {
  const navigate = useNavigate();
  const { t } = useTranslation("pages");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    trackDistributorsStarted();
  }, []);

  const handleSelect = (productName) => {
    if (selected) return;

    setSelected(productName);
    localStorage.setItem("product", productName);
    trackProductSelected(productName);

    setTimeout(() => {
      navigate("/distributors/region");
    }, 200);
  };

  return (
    <PageWrapper
      showBack={true}
      backTo="/"
      code={true}
      currentStep={1}
    >
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("productDistributors.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("productDistributors.description")}
        </p>

        <div className="mt-8 space-y-6 flex flex-col items-center">
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
        </div>
      </div>
    </PageWrapper>
  );
}
