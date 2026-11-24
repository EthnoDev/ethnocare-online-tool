import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Popup from "./Popup";
import useMeasurementUnit, { setMeasurementUnit } from "../hooks/useMeasurementUnit";

export default function MeasurementInput({ product, measurement, onConfirm }) {
  const unit = useMeasurementUnit();
  const [value, setValue] = useState("");
  const [error, setError] = useState(""); // Stores translation key (e.g. "errors:noInput")
  const [showPopup, setShowPopup] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isUnitMenuOpen, setIsUnitMenuOpen] = useState(false);
  const unitSelectorRef = useRef(null);
  const unitButtonRef = useRef(null);

  const { t } = useTranslation(["common", "pages", "errors"]);

  useEffect(() => {
    if (!isUnitMenuOpen) return undefined;

    const handleClick = (event) => {
      if (!unitSelectorRef.current?.contains(event.target)) {
        event.preventDefault();
        event.stopPropagation();
        setIsUnitMenuOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsUnitMenuOpen(false);
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isUnitMenuOpen]);

  const handleChange = (e) => {
    const input = e.target.value;
    if (/^\d*\.?\d*$/.test(input)) {
      setValue(input);
      if (error) setError(""); // Clear error when typing
    }
  };

  const convertToCm = (val) => (unit === "in" ? val * 2.54 : val);

  const handleUnitSelect = (nextUnit) => {
    setMeasurementUnit(nextUnit);
    setIsUnitMenuOpen(false);
    unitButtonRef.current?.focus();
  };

  const mapMeasurement = (valCm) => {
    const material = (localStorage.getItem("liner_material") || "").toLowerCase();

    // ----------------------------------------------------
    // LINER LOGIC (ttLiner & tfLiner)
    // ----------------------------------------------------
    if (product === "ttLiner" || product === "tfLiner") {
      if (material === "gel") {
        const matches = [];
        if (valCm >= 17 && valCm <= 21) matches.push("S");
        if (valCm >= 21 && valCm <= 25) matches.push("M");
        if (valCm >= 25 && valCm <= 29) matches.push("L");
        if (valCm >= 29 && valCm <= 35) matches.push("XL");
        if (valCm >= 33 && valCm <= 42) matches.push("XXL");

        return matches.length > 0 ? matches.join(",") : null;
      }

      if (product === "ttLiner") {
        if (valCm >= 16 && valCm < 18) return 16;
        if (valCm >= 18 && valCm < 20) return 18;
        if (valCm >= 20 && valCm < 21) return 20;
        if (valCm >= 21 && valCm < 22) return 21;
        if (valCm >= 22 && valCm < 23.5) return 22;
        if (valCm >= 23.5 && valCm < 25) return 23.5;
        if (valCm >= 25 && valCm < 26.5) return 25;
        if (valCm >= 26.5 && valCm < 28) return 26.5;
        if (valCm >= 28 && valCm < 30) return 28;
        if (valCm >= 30 && valCm < 32) return 30;
        if (valCm >= 32 && valCm < 34) return 32;
        if (valCm >= 34 && valCm < 36) return 34;
        if (valCm >= 36 && valCm < 38) return 36;
        if (valCm >= 38 && valCm < 40) return 38;
        if (valCm >= 40 && valCm < 42) return 40;
        if (valCm >= 42 && valCm < 45) return 42;
        if (valCm >= 45 && valCm < 47) return 45;
      }

      if (product === "tfLiner") {
        if (valCm >= 25 && valCm < 26.5) return 25;
        if (valCm >= 26.5 && valCm < 28) return 26.5;
        if (valCm >= 28 && valCm < 30) return 28;
        if (valCm >= 30 && valCm < 32) return 30;
        if (valCm >= 32 && valCm < 34) return 32;
        if (valCm >= 34 && valCm < 36) return 34;
        if (valCm >= 36 && valCm < 38) return 36;
        if (valCm >= 38 && valCm < 40) return 38;
        if (valCm >= 40 && valCm < 42) return 40;
        if (valCm >= 42 && valCm < 45) return 42;
        if (valCm >= 45 && valCm < 50) return 45;
        if (valCm >= 50 && valCm < 55) return 50;
        if (valCm >= 55 && valCm < 57) return 55;
      }
    }

    // ----------------------------------------------------
    // TT OVERLAY
    // ----------------------------------------------------
    if (product === "ttstandard") {
      if (measurement === "circumference") {
        if (valCm >= 24 && valCm < 29.5) return 23;
        if (valCm >= 29.5 && valCm < 36) return 28;
        if (valCm >= 36 && valCm <= 42) return 35;
      } else if (measurement === "length") {
        if (valCm >= 10 && valCm < 15.5) return "XSH";
        if (valCm >= 15.5 && valCm < 21) return "SH";
        if (valCm >= 21) return "LG";
      }
    }

    if (product === "ttdistal") {
      if (measurement === "circumference") {
        if (valCm >= 24 && valCm < 29.5) return 23;
        if (valCm >= 29.5 && valCm < 36) return 28;
        if (valCm >= 36 && valCm <= 42) return 35;
      } else if (measurement === "length") {
        if (valCm >= 8 && valCm < 13.5) return "XSH";
        if (valCm >= 13.5 && valCm < 19) return "SH";
        if (valCm >= 19) return "LG";
      }
    }

    // ----------------------------------------------------
    // TT UNDERLAY
    // ----------------------------------------------------
    if (product === "underlaytt") {
      const seal = localStorage.getItem("underlay_seal");

      if (seal === "closed-seal") {
        if (measurement === "length") {
          if (valCm >= 27 && valCm <= 37) return "SH";
          if (valCm > 37) return "LG";
        } else if (measurement === "circumference") {
          if (valCm >= 23 && valCm < 28) return 23;
          if (valCm >= 28 && valCm < 35) return 28;
          if (valCm >= 35 && valCm <= 42) return 35;
        }
      } else {
        if (measurement === "length") {
          if (valCm >= 23 && valCm < 28) return "SH";
          if (valCm >= 28 && valCm < 33) return "MD";
          if (valCm >= 33 && valCm < 38) return "LG";
          if (valCm >= 38) return "XL";
        } else if (measurement === "circumference") {
          if (valCm >= 23 && valCm < 28) return 23;
          if (valCm >= 28 && valCm < 35) return 28;
          if (valCm >= 35 && valCm <= 42) return 35;
        } else if (measurement === "circumference2") {
          const c1 = parseInt(localStorage.getItem("underlaytt_circumference"));
          const threshold = c1 === 23 ? 35 : c1 === 28 ? 45 : c1 === 35 ? 55 : null;
          if (threshold === null) return null;
          return valCm > threshold ? "override-closed" : "keep-open";
        }
      }
    }

    // ----------------------------------------------------
    // TF STANDARD
    // ----------------------------------------------------
    if (product === "tfstandard") {
      if (measurement === "length") {
        if (valCm >= 20 && valCm < 25) return "SH";
        if (valCm >= 25 && valCm < 30) return "LG";
        if (valCm >= 30) return "XL";
      } else if (measurement === "circumference") {
        if (valCm >= 32 && valCm < 36) return 32;
        if (valCm >= 36 && valCm < 40) return 38;
        if (valCm >= 40 && valCm < 44.5) return 40;
        if (valCm >= 44.5 && valCm < 48) return 44;
        if (valCm >= 48 && valCm < 52) return 48;
        if (valCm >= 52 && valCm <= 62) return 52;
      }
    }

    // ----------------------------------------------------
    // TF DISTAL
    // ----------------------------------------------------
    if (product === "tfdistal") {
      if (measurement === "length") {
        if (valCm >= 20 && valCm < 25) return "SH";
        if (valCm >= 25) return "LG";
      } else if (measurement === "circumference") {
        if (valCm >= 32 && valCm < 38) return 32;
        if (valCm >= 38 && valCm < 42) return 38;
        if (valCm >= 42 && valCm < 47) return 40;
        if (valCm >= 47 && valCm < 50) return 44;
        if (valCm >= 50 && valCm < 54) return 48;
        if (valCm >= 54 && valCm <= 62) return 52;
      }
    }

    return null;
  };

  const handleConfirmClick = () => {
    if (isConfirming || showPopup) return;

    if (!value.trim()) {
      setError("errors:noInput");
      return;
    }

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      setError("errors:noInput");
      return;
    }

    setIsConfirming(true);

    const rawMeasurementKey = {
      circumference: "raw_circumference",
      length: "raw_length",
      circumference2: "raw_circumference2",
    }[measurement];

    if (rawMeasurementKey) {
      localStorage.setItem(rawMeasurementKey, numericValue);
      localStorage.setItem(`${rawMeasurementKey}_unit`, unit);
    }

    const valCm = convertToCm(numericValue);
    const mappedValue = mapMeasurement(valCm);

    if (mappedValue === null) {
      setTimeout(() => {
        setShowPopup(true);
        setIsConfirming(false);
      }, 200);
      return;
    }

    localStorage.setItem(`${product}_${measurement}`, mappedValue);

    setTimeout(() => {
      onConfirm?.(mappedValue);
      setIsConfirming(false);
    }, 200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirmClick();
  };

  const popupType =
    product === "underlaytt"
      ? "underlaytt"
      : product === "ttLiner"
      ? "ttLiner"
      : product === "tfLiner"
      ? "tfLiner"
      : product === "tfstandard" || product === "tfdistal"
      ? "tf"
      : "tt";

  return (
    <div className="relative w-full max-w-[320px] mx-auto mt-10">
      {showPopup && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10" />}

      <form onSubmit={handleSubmit} className="relative z-0 space-y-3">
        <div
          ref={unitSelectorRef}
          className={`relative flex w-full rounded-md border bg-white focus-within:border-transparent focus-within:hover:border-transparent focus-within:ring-2 ${
            error
              ? "border-red-400 focus-within:ring-red-400"
              : "border-gray-200 hover:border-black focus-within:ring-[#090C41]"
          }`}
          aria-invalid={!!error}
        >
          <input
            type="number"
            inputMode="decimal"
            step="any"
            value={value}
            onChange={handleChange}
            placeholder={t("inputs.enter_measurement")}
            className="min-w-0 w-full rounded-l-md px-4 py-3 font-sans focus:outline-none"
            autoFocus
          />
          <button
            ref={unitButtonRef}
            type="button"
            className="flex w-[76px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-r-md border-l border-gray-300 px-3 font-sans text-black hover:font-bold focus:outline-none focus-visible:font-bold focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black"
            aria-label={`Measurement unit: ${unit}`}
            aria-haspopup="true"
            aria-expanded={isUnitMenuOpen}
            onClick={() => setIsUnitMenuOpen((isOpen) => !isOpen)}
          >
            <span>{unit}</span>
            <svg
              aria-hidden="true"
              className={`h-3 w-3 transition-transform ${isUnitMenuOpen ? "rotate-180" : ""}`}
              viewBox="0 0 12 8"
              fill="none"
            >
              <path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          {isUnitMenuOpen && (
            <div
              className="absolute right-0 top-full z-20 w-[76px] rounded-b-md border-x border-b border-t-0 border-gray-300 bg-white shadow-sm"
            >
              <button
                type="button"
                aria-pressed="false"
                className="block w-full cursor-pointer px-3 py-3 text-center font-sans text-black hover:font-bold focus-visible:font-bold focus-visible:outline-none"
                onClick={() => handleUnitSelect(unit === "cm" ? "in" : "cm")}
              >
                {unit === "cm" ? "in" : "cm"}
              </button>
            </div>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 font-sans text-left" role="alert" aria-live="polite">
            {t(error)}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isConfirming}
            className={`w-auto min-w-[100px] px-6 py-2 rounded-md border font-sans font-semibold transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed uppercase text-sm
              ${
                isConfirming
                  ? "bg-[#090C41] text-white border-[#090C41]"
                  : "bg-white text-black border-gray-300 hover:border-black"
              }`}
          >
            {t("cta.confirm")}
          </button>
        </div>
      </form>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-25">
          <Popup
            type={popupType}
            measurement={measurement}
            onClose={() => setTimeout(() => setShowPopup(false), 200)}
          />
        </div>
      )}
    </div>
  );
}