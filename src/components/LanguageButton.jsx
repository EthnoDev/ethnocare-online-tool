import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import EarthIcon from "../assets/earth.svg";
import LanguagePopup from "./LanguagePopup";

function toCode(lang = "en") {
  return lang.split("-")[0].toUpperCase();
}

export default function LanguageButton() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const label = useMemo(() => toCode(i18n.language || "en"), [i18n.language]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="shrink-0 px-3 sm:px-4 py-2 rounded-md cursor-pointer font-sans font-medium transition-all border flex items-center gap-1.5 sm:gap-2
                   bg-black text-white border-black hover:bg-[#090C41]"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Change language"
      >
        <img
          src={EarthIcon}
          alt=""
          className="w-3 h-3 sm:w-4 sm:h-4"
        />

        <span className="text-xs sm:text-base leading-tight">
          {label}
        </span>
      </button>

      {open && <LanguagePopup onClose={handleClose} />}
    </>
  );
}