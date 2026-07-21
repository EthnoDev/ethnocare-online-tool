export default function ActivityLevelOption({
  level,
  description,
  selected = false,
  onClick,
}) {
  const base =
    "w-full max-w-[280px] p-5 cursor-pointer rounded-2xl text-center font-sans transition-all duration-200 border flex flex-col items-center justify-center gap-2";

  const outline =
    "bg-white text-slate-900 border-gray-300 hover:border-black";

  const selectedStyle =
    "bg-[#090C41] text-white border-[#090C41]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${selected ? selectedStyle : outline}`}
    >
      {/* Big Bold Level (e.g. K1) */}
      <span className="text-3xl font-extrabold tracking-tight leading-none">
        {level}
      </span>

      {/* Description Inside Card */}
      {description && (
        <span
          className={`text-sm leading-snug font-normal ${
            selected ? "text-gray-200" : "text-slate-600"
          }`}
        >
          {description}
        </span>
      )}
    </button>
  );
}