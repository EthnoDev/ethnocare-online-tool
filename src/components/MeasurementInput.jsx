import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next"; // Added Trans
import Popup from "./Popup";

export default function MeasurementInput({ product, measurement, onConfirm }) {
  const [unit, setUnit] = useState("cm");
  const [value, setValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const { t } = useTranslation(["common", "pages"]); // Ensure pages is loaded for specific instructions

  useEffect(() => {
    const stored = localStorage.getItem("units");
    setUnit(stored === "imperial" ? "in" : "cm");
  }, []);

  const handleChange = (e) => {
    const input = e.target.value;
    if (/^\d*\.?\d*$/.test(input)) setValue(input);
  };

  const convertToCm = (val) => (unit === "in" ? val * 2.54 : val);

  const mapMeasurement = (valCm) => {
    /* ... keeping your existing mapping logic ... */
    if (product === "ttdistal" || product === "ttstandard") {
      if (measurement === "circumference") {
        if (valCm >= 24 && valCm < 29.5) return 23;
        if (valCm >= 29.5 && valCm < 36) return 28;
        if (valCm >= 36 && valCm < 42) return 35;
      } else if (measurement === "length") {
        if (valCm >= 13.5 && valCm < 19) return "SH";
        if (valCm >= 19) return "LG";
      }
    }
    // (rest of mapping remains the same)
    return null; 
  };

  const handleConfirmClick = () => {
    if (isConfirming || showPopup) return;
    setIsConfirming(true);

    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      setTimeout(() => {
        setShowPopup(true);
        setIsConfirming(false);
      }, 200);
      return;
    }

    if (measurement === "circumference") {
      localStorage.setItem("overlay_raw_circumference", numericValue);
    } else if (measurement === "length") {
      localStorage.setItem("overlay_raw_length", numericValue);
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

  const popupType = product === "underlaytt" ? "underlaytt" : product === "tfstandard" || product === "tfdistal" ? "tf" : "tt";

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {showPopup && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10" />}

      <form onSubmit={handleSubmit} className="relative z-0 space-y-3">
        <div className="relative w-full">
          <input
            type="number"
            inputMode="decimal"
            step="any"
            value={value}
            onChange={handleChange}
            placeholder={t("inputs.enter_measurement")}
            className="w-full px-4 py-3 pr-16 border border-gray-300 hover:border-black rounded-xl font-sans transition-all focus:outline-none"
            autoFocus
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black font-sans">
            {unit === "in" ? "in" : "cm"}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4 px-1">
          {/* Made clickable to open popup */}
          <button
            type="button"
            onClick={() => setShowPopup(true)}
            className="text-[13px] text-slate-600 font-sans leading-tight mt-1 text-left cursor-pointer hover:text-black transition-colors"
          >
            {t("inputs.additional_instruction", "Additional instruction")}
          </button>
          
          <button
            type="submit"
            disabled={isConfirming}
            className={`w-auto min-w-[100px] px-6 py-2 rounded-xl border font-sans font-bold transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed uppercase text-[14px]
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
        <div className="fixed inset-0 flex items-center justify-center z-20">
          <Popup
            type={popupType}
            onClose={() => setTimeout(() => setShowPopup(false), 200)}
          />
        </div>
      )}
    </div>
  );
}