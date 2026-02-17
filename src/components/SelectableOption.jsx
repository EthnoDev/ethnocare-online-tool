export default function SelectableOption({
  label,
  description,
  selected = false,
  onClick,
  compact = false,
  variant = "outline", // "outline" | "solid"
}) {
  const sizeClasses = compact ? "px-4 py-2" : "py-3 w-[200px]";

  const base =
    "cursor-pointer rounded-xl text-center font-medium font-sans transition-all duration-200 border";

  const outline =
    "bg-white text-black border-gray-300 hover:border-black";

  const solid =
    "bg-black text-white border-black hover:bg-[#090C41]";

  const selectedStyle =
    "bg-[#090C41] text-white border-[#090C41]";

  return (
    <div className="w-full flex flex-col items-center">
      <button
        type="button"
        onClick={onClick}
        className={`${sizeClasses} ${base} ${
          variant === "solid"
            ? solid
            : selected
            ? selectedStyle
            : outline
        }`}
      >
        {label}
      </button>

      {description ? (
        <p className="mt-2 text-center text-sm text-slate-500 leading-snug">
          {description}
        </p>
      ) : null}
    </div>
  );
}
