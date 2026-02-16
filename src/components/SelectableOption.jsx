<button
  onClick={onClick}
  className={`${sizeClasses}
    rounded-xl
    border border-gray-300
    text-center font-medium
    transition-colors duration-200
    ${
      selected
        ? "bg-[#090C41] text-white border-[#090C41]"
        : "bg-white text-black hover:border-black"
    }
  `}
>
  {label}
</button>
