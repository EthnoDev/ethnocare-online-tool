// src/pages/sizing/ProductSelection.jsx
import PageWrapper from "../../components/PageWrapper";

// product images
import OverlayImg from "../../assets/products/overlay.png";
import UnderlayImg from "../../assets/products/underlay.png";
import LinerImg from "../../assets/products/liner.png";

export default function ProductSelection() {
  return (
    <PageWrapper
      showBack={true}
      backTo="/sizing"
      code={true}
    >
      <div className="w-full max-w-md mt-2">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          Product
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          Select the product you want to find a size for.
        </p>

        {/* Product options */}
        <div className="mt-8 space-y-6 flex flex-col items-center">
          {/* Overlay */}
          <button type="button" className="cursor-pointer focus:outline-none">
            <img
              src={OverlayImg}
              alt="Overlay"
              className="w-60 h-auto object-contain transition-opacity hover:opacity-70"
            />
          </button>

          {/* Underlay */}
          <button type="button" className="cursor-pointer focus:outline-none">
            <img
              src={UnderlayImg}
              alt="Underlay"
              className="w-60 h-auto object-contain transition-opacity hover:opacity-70"
            />
          </button>

          {/* Liner */}
          <button type="button" className="cursor-pointer focus:outline-none">
            <img
              src={LinerImg}
              alt="Liner"
              className="w-60 h-auto object-contain transition-opacity hover:opacity-70"
            />
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
