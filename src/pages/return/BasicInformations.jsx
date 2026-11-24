import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";

const products = ["Overlay TT", "Overlay TF", "Underlay TT", "Liner TT", "Liner TF"];

export default function BasicInformations() {
  const { t } = useTranslation("pages");
  const [product, setProduct] = useState("");
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const productMenuRef = useRef(null);
  const productButtonRef = useRef(null);

  useEffect(() => {
    if (!isProductMenuOpen) return undefined;

    const options = productMenuRef.current.querySelectorAll('[role="option"]');
    const selectedIndex = products.indexOf(product);
    options[selectedIndex < 0 ? 0 : selectedIndex]?.focus();

    const handleOutsidePointerDown = (event) => {
      if (!productMenuRef.current?.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    const handleOutsideClick = (event) => {
      if (!productMenuRef.current?.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        setIsProductMenuOpen(false);
        productButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handleOutsidePointerDown, true);
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown, true);
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [isProductMenuOpen, product]);

  const handleProductKeyDown = (event) => {
    if (event.key === "Escape" && isProductMenuOpen) {
      event.preventDefault();
      setIsProductMenuOpen(false);
      productButtonRef.current?.focus();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isProductMenuOpen) {
        setIsProductMenuOpen(true);
        return;
      }
      const options = Array.from(productMenuRef.current.querySelectorAll('[role="option"]'));
      const currentIndex = options.indexOf(document.activeElement);
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (currentIndex + direction + options.length) % options.length;
      options[nextIndex]?.focus();
    } else if (isProductMenuOpen && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      const options = productMenuRef.current.querySelectorAll('[role="option"]');
      options[event.key === "Home" ? 0 : options.length - 1]?.focus();
    }
  };

  return (
    <PageWrapper showBack={true} backTo="/return" code={true}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("basicInformationsReturn.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("basicInformationsReturn.description")}
        </p>
        <label id="return-product-label" htmlFor="return-product" className="mt-8 block text-left text-xl font-semibold">
          {t("basicInformationsReturn.product")}
        </label>
        <div
          ref={productMenuRef}
          className="relative mt-2"
          onKeyDown={handleProductKeyDown}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsProductMenuOpen(false);
          }}
        >
          <button
            ref={productButtonRef}
            id="return-product"
            type="button"
            aria-labelledby="return-product-label return-product-value"
            aria-haspopup="listbox"
            aria-expanded={isProductMenuOpen}
            aria-controls={isProductMenuOpen ? "return-product-options" : undefined}
            onClick={() => setIsProductMenuOpen((open) => !open)}
            className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-gray-200 bg-white px-4 text-left text-base outline-none hover:border-black focus:border-transparent focus:ring-2 focus:ring-[#090C41] ${
              product ? "text-black" : "text-gray-400"
            }`}
          >
            <span id="return-product-value">{product || "..."}</span>
            <svg
              aria-hidden="true"
              className={`h-3 w-3 text-black transition-transform ${isProductMenuOpen ? "rotate-180" : ""}`}
              viewBox="0 0 12 8"
              fill="none"
            >
              <path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          {isProductMenuOpen && (
            <div
              id="return-product-options"
              role="listbox"
              aria-labelledby="return-product-label"
              className="absolute left-0 top-full z-20 w-full rounded-b-md border-x border-b border-t-0 border-gray-300 bg-white shadow-sm"
            >
              {products.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={product === option}
                  tabIndex={-1}
                  className="block w-full cursor-pointer px-3 py-3 text-center font-sans text-black hover:font-bold focus-visible:font-bold focus-visible:outline-none"
                  onClick={() => {
                    setProduct(option);
                    setIsProductMenuOpen(false);
                    productButtonRef.current?.focus();
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
