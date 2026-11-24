import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";

const products = ["Overlay TT", "Overlay TF", "Underlay TT", "Liner TT", "Liner TF"];
const returnReasons = [
  "airLeak", "badFit", "fabricTear", "tornHandle", "bladderBulge",
  "incorrectProduct", "orderError", "trialReturn", "other",
];
const reasonsWithAdditionalComments = ["incorrectProduct", "orderError", "trialReturn", "other"];
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

function DropdownSection({ id, title, placeholder, options, value, onChange, className, error, onRequestOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const selectedIndex = options.findIndex((option) => option.value === value);

  useEffect(() => {
    if (!isOpen) return undefined;

    const optionElements = menuRef.current.querySelectorAll('[role="option"]');
    optionElements[selectedIndex < 0 ? 0 : selectedIndex]?.focus();

    const handleOutsidePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    const handleOutsideClick = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", handleOutsidePointerDown, true);
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("pointerdown", handleOutsidePointerDown, true);
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [isOpen, selectedIndex]);

  const openMenu = () => {
    if (onRequestOpen && !onRequestOpen()) return;
    setIsOpen(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!isOpen) {
        openMenu();
        return;
      }
      const optionElements = Array.from(menuRef.current.querySelectorAll('[role="option"]'));
      const currentIndex = optionElements.indexOf(document.activeElement);
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = (currentIndex + direction + optionElements.length) % optionElements.length;
      optionElements[nextIndex]?.focus();
    } else if (isOpen && (event.key === "Home" || event.key === "End")) {
      event.preventDefault();
      const optionElements = menuRef.current.querySelectorAll('[role="option"]');
      optionElements[event.key === "Home" ? 0 : optionElements.length - 1]?.focus();
    }
  };

  return (
    <section className={className}>
      <label id={`${id}-label`} htmlFor={id} className="block text-left text-xl font-semibold">
        {title}
      </label>
      <div
        ref={menuRef}
        className="relative mt-2"
        onKeyDown={handleKeyDown}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
        }}
      >
        <button
          ref={buttonRef}
          id={id}
          type="button"
          aria-labelledby={`${id}-label ${id}-value`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? `${id}-options` : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onClick={() => isOpen ? setIsOpen(false) : openMenu()}
          className={`flex h-10 w-full cursor-pointer items-center justify-between rounded-md border bg-white px-4 text-left text-base outline-none focus:border-transparent focus:ring-2 ${
            error ? "border-red-400 focus:ring-red-400" : "border-gray-200 hover:border-black focus:ring-[#090C41]"
          } ${
            value ? "text-black" : "text-gray-400"
          }`}
        >
          <span id={`${id}-value`}>{selectedIndex < 0 ? placeholder : options[selectedIndex].label}</span>
          <svg
            aria-hidden="true"
            className={`h-3 w-3 text-black transition-transform ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 12 8"
            fill="none"
          >
            <path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        {isOpen && (
          <div
            id={`${id}-options`}
            role="listbox"
            aria-labelledby={`${id}-label`}
            className="w-full rounded-b-md border-x border-b border-t-0 border-gray-300 bg-white shadow-sm"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                tabIndex={-1}
                className="block w-full cursor-pointer px-3 py-3 text-center font-sans text-black hover:font-bold focus-visible:font-bold focus-visible:outline-none"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-left text-sm text-red-600 font-sans" role="alert" aria-live="polite">
          {error}
        </p>
      )}
    </section>
  );
}

export default function BasicInformations() {
  const { t } = useTranslation(["pages", "common"]);
  const [product, setProduct] = useState("");
  const [productError, setProductError] = useState(false);
  const [reason, setReason] = useState("");
  const [neverFitted, setNeverFitted] = useState(false);
  const [additionalComments, setAdditionalComments] = useState("");

  return (
    <PageWrapper showBack={true} backTo="/return" code={true}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("basicInformationsReturn.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("basicInformationsReturn.description")}
        </p>
        <DropdownSection
          id="return-product"
          title={t("basicInformationsReturn.product")}
          placeholder={t("basicInformationsReturn.productPlaceholder")}
          options={products.map((option) => ({ value: option, label: option }))}
          value={product}
          onChange={(value) => {
            setProduct(value);
            setProductError(false);
          }}
          error={productError ? t("basicInformationsReturn.productRequired") : ""}
          className="mt-8"
        />
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
        <DropdownSection
          id="return-reason"
          title={t("basicInformationsReturn.reason")}
          placeholder={t("basicInformationsReturn.reasonPlaceholder")}
          options={returnReasons.map((option) => ({
            value: option,
            label: t(`basicInformationsReturn.returnReasons.${option}`),
          }))}
          value={reason}
          onChange={setReason}
          onRequestOpen={() => {
            if (!product) {
              setProductError(true);
              return false;
            }
            return true;
          }}
          className="mt-6"
        />
        {reasonsWithAdditionalComments.includes(reason) && (
          <section className="mt-4">
            <h2 id="return-additional-comments-label" className="text-left text-xl font-semibold">
              {t("basicInformationsReturn.additionalComments")}
            </h2>
            <p id="return-additional-comments-description" className="text-left text-sm text-slate-600">
              {t("basicInformationsReturn.additionalCommentsDescription")}
            </p>
            <textarea
              id="return-additional-comments"
              name="additionalComments"
              rows={5}
              aria-labelledby="return-additional-comments-label"
              aria-describedby="return-additional-comments-description"
              placeholder={t("basicInformationsReturn.additionalCommentsPlaceholder")}
              value={additionalComments}
              onChange={(event) => setAdditionalComments(event.target.value)}
              className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-base outline-none placeholder-gray-400 hover:border-black focus:border-transparent focus:ring-2 focus:ring-[#090C41]"
            />
          </section>
        )}
        <div className="mt-10" />
        <SelectableOption label={t("common:cta.confirm")} />
      </div>
    </PageWrapper>
  );
}
