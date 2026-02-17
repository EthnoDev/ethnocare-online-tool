import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import EarthIcon from "../assets/earth.svg";
import LanguagePopup from "./LanguagePopup";

function toCode(lang = "en") {
  return lang.split("-")[0].toUpperCase(); // "fr-CA" -> "FR"
}

export default function LanguageButton() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  // Keep the label in sync with i18n
  const label = useMemo(() => toCode(i18n.language || "en"), [i18n.language]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="px-4 py-2 rounded-xl cursor-pointer font-sans font-medium transition-all border flex items-center gap-2
                   bg-black text-white border-black hover:bg-[#090C41] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Change language"
      >
        <img src={EarthIcon} alt="" className="w-4 h-4" />
        {label}
      </button>

      {open && <LanguagePopup onClose={handleClose} />}
    </>
  );
}
