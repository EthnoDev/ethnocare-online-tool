// components/SelectableOption2.jsx
export default function SelectableOption2({
  label,
  selected,
  onClick,
  className = "",
  widthClass = "w-28",   // <— fixed width hook (≈112px). Adjust as needed.
  heightClass = "h-10",  // <— fixed height hook (≈40px).
}) {
  // Shrink text if it’s long
  const textSize =
    label.length > 14 ? "text-xs"
    : label.length > 9 ? "text-sm"
    : "text-base";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        // fixed box
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium font-sans transition-all",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#090C41]",
        widthClass,                    // fixed width
        heightClass,                   // fixed height
        "px-3",                        // inner padding still matters
        // color branches – keep ALL color classes inside the conditional
        selected
          ? "bg-[#090C41] text-white border border-[#090C41]"
          : "bg-[#D9D9D9] text-black border border-gray-300 hover:border-black",
        className,
      ].join(" ")}
    >
      {/* Checkbox (scaled a bit smaller to fit fixed height) */}
        <span
        className={[
            "grid place-items-center w-5 h-5 rounded-md border transition-colors",
            selected ? "border-white bg-white/10" : "border-black bg-[#D9D9D9]",
        ].join(" ")}
        aria-hidden="true"
        >
        <svg
            viewBox="0 0 24 24"
            className={["w-4 h-4 transition-opacity", selected ? "opacity-100" : "opacity-0"].join(" ")}
        >
            <path
            d="M5 12.5l4 4L19 7.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            />
        </svg>
        </span>

      {/* Label — truncate to keep width consistent */}
      <span className={["truncate leading-tight", textSize].join(" ")}>{label}</span>
    </button>
  );
}
