// src/pages/assistance/Moving.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageWrapper from "../../../components/PageWrapper";
import { useTranslation } from "react-i18next";

// DE Assets
import DownDE from "../../../assets/slides/down_DE.svg";
import RollDE from "../../../assets/slides/roll_DE.svg";
import ShiftDE from "../../../assets/slides/shift_DE.svg";
import UpDE from "../../../assets/slides/up_DE.svg";

// EN Assets
import DownEN from "../../../assets/slides/down_EN.svg";
import RollEN from "../../../assets/slides/roll_EN.svg";
import ShiftEN from "../../../assets/slides/shift_EN.svg";
import UpEN from "../../../assets/slides/up_EN.svg";

// ES Assets
import DownES from "../../../assets/slides/down_ES.svg";
import RollES from "../../../assets/slides/roll_ES.svg";
import ShiftES from "../../../assets/slides/shift_ES.svg";
import UpES from "../../../assets/slides/up_ES.svg";

// FR Assets
import DownFR from "../../../assets/slides/down_FR.svg";
import RollFR from "../../../assets/slides/roll_FR.svg";
import ShiftFR from "../../../assets/slides/shift_FR.svg";
import UpFR from "../../../assets/slides/up_FR.svg";

export default function Moving() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const { t, i18n } = useTranslation("pages");

  // Determine which localized file cluster to display
  const currentLang = i18n.language || "en";

  const getDynamicImages = () => {
    switch (currentLang) {
      case "de":
        return { up: UpDE, down: DownDE, shift: ShiftDE, roll: RollDE };
      case "es":
        return { up: UpES, down: DownES, shift: ShiftES, roll: RollES };
      case "fr":
        return { up: UpFR, down: DownFR, shift: ShiftFR, roll: RollFR };
      case "en":
      default:
        return { up: UpEN, down: DownEN, shift: ShiftEN, roll: RollEN };
    }
  };

  const images = getDynamicImages();

  const slideOptions = [
    { id: "slides-up", src: images.up, label: "Slides Up" },
    { id: "slides-down", src: images.down, label: "Slides Down" },
    { id: "shifts-sideways", src: images.shift, label: "Shifts Sideways" },
    { id: "rolls", src: images.roll, label: "Rolls" },
  ];

  const handleSelect = (id) => {
    if (selected) return; // Prevent double clicks
    setSelected(id);

    // 🔴 Commented out detail storage for now
    // localStorage.setItem("detail", id);
    // localStorage.setItem("detail_key", `pages:movingAssistance.${id}`);

    // Navigation trigger with standard 200ms animation delay
    setTimeout(() => {
      if (id === "slides-up") {
        navigate("/assistance/problem/stirrup");
      }
    }, 200);
  };

  return (
    <PageWrapper 
      showBack={true} 
      backTo="/assistance/problem/bad-fit"
    >
      <div className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("movingAssistance.title")}
        </h1>

        {/* Description */}
        <p className="mt-3 text-center text-base text-slate-500">
          {t("movingAssistance.description")}
        </p>

        {/* Options Grid (2x2) with tighter gap sizing overrides */}
        <div className="mt-8 grid grid-cols-2 gap-y-8 gap-x-8 justify-center mx-auto max-w-[340px]">
          {slideOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className="cursor-pointer focus:outline-none w-full max-w-[160px]"
              aria-label={option.label}
              title={option.label}
            >
              <div
                className={`rounded-xl overflow-hidden transition-[box-shadow] duration-150 ${
                  selected === option.id
                    ? "ring-4 ring-[#090C41]"
                    : "ring-1 ring-gray-300 hover:ring-2 hover:ring-black"
                }`}
              >
                <img
                  src={option.src}
                  alt={option.label}
                  className="w-full h-auto object-contain block rounded-xl"
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}