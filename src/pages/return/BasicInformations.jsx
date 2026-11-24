import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";

const products = ["Overlay TT", "Overlay TF", "Underlay TT", "Liner TT", "Liner TF"];
const fitDatePlaceholder = "MM/DD/YYYY";

const formatFitDate = (digits) =>
  [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)]
    .filter(Boolean)
    .join("/");

function DateSection({ id, title, note, checkboxLabel, neverFitted, onNeverFittedChange }) {
  const [date, setDate] = useState("");
  const dateInputRef = useRef(null);

  const handleDateChange = (event) => {
    const input = event.target;
    const position = input.selectionStart;
    let digits = input.value.replace(/\D/g, "").slice(0, 8);
    let cursorDigits = Math.min(input.value.slice(0, position).replace(/\D/g, "").length, 8);
    const previousDigits = date.replace(/\D/g, "");

    if (digits === previousDigits) {
      if (event.nativeEvent.inputType === "deleteContentBackward" && cursorDigits > 0) {
        digits = digits.slice(0, cursorDigits - 1) + digits.slice(cursorDigits);
        cursorDigits -= 1;
      } else if (event.nativeEvent.inputType === "deleteContentForward" && cursorDigits < digits.length) {
        digits = digits.slice(0, cursorDigits) + digits.slice(cursorDigits + 1);
      }
    }

    setDate(formatFitDate(digits));
    const cursorPosition = formatFitDate(digits.slice(0, cursorDigits)).length;
    requestAnimationFrame(() => {
      if (document.activeElement === input) input.setSelectionRange(cursorPosition, cursorPosition);
    });
  };

  return (
    <section aria-labelledby={`${id}-label`}>
      <label id={`${id}-label`} htmlFor={id} className="mt-6 block text-left text-xl font-semibold">
        {title}
      </label>
      <p id={`${id}-note`} className="text-left text-sm text-slate-600">
        {note}
      </p>
      <div
        className="mt-2 flex h-10 w-full cursor-text items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-base hover:border-black focus-within:border-transparent focus-within:hover:border-transparent focus-within:ring-2 focus-within:ring-[#090C41]"
        onClick={() => dateInputRef.current?.focus()}
      >
        <div className="relative">
          <span aria-hidden="true" className="pointer-events-none block whitespace-nowrap">
            <span className="invisible">{date}</span>
            <span className="text-gray-400">{fitDatePlaceholder.slice(date.length)}</span>
          </span>
          <input
            ref={dateInputRef}
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            aria-describedby={`${id}-note`}
            placeholder={fitDatePlaceholder}
            value={date}
            onChange={handleDateChange}
            className="absolute inset-0 w-full bg-transparent text-left outline-none placeholder-transparent"
          />
        </div>
      </div>
      <label className="mt-1 inline-flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={neverFitted}
          onChange={(event) => onNeverFittedChange(event.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-[#090C41] peer-focus-visible:ring-offset-2 ${
            neverFitted ? "border-[#090C41] bg-[#090C41] text-white" : "border-black bg-white"
          }`}
        >
          <svg viewBox="0 0 24 24" className={`h-3 w-3 ${neverFitted ? "opacity-100" : "opacity-0"}`}>
            <path d="M5 12.5l4 4L19 7.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span>{checkboxLabel}</span>
      </label>
    </section>
  );
}

export default function BasicInformations() {
  const { t } = useTranslation("pages");
  const [product, setProduct] = useState("");
  const [neverFitted, setNeverFitted] = useState(false);
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
            <span id="return-product-value">{product || t("basicInformationsReturn.productPlaceholder")}</span>
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
        <DateSection
          id="return-initial-fit-date"
          title={t("basicInformationsReturn.initialFitDate")}
          note={t("basicInformationsReturn.initialFitDateNote")}
          checkboxLabel={t("basicInformationsReturn.neverFitted")}
          neverFitted={neverFitted}
          onNeverFittedChange={setNeverFitted}
        />
        <DateSection
          id="return-product-failure-date"
          title={t("basicInformationsReturn.productFailureDate")}
          note={t("basicInformationsReturn.initialFitDateNote")}
          checkboxLabel={t("basicInformationsReturn.neverFitted")}
          neverFitted={neverFitted}
          onNeverFittedChange={setNeverFitted}
        />
      </div>
    </PageWrapper>
  );
}
