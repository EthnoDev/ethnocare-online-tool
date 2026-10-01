import { useTranslation } from "react-i18next";

export default function SeeMore({
  summary,
  className = "",
  buttonLabel,
}) {
  const { t } = useTranslation("common");
  const seeMoreLabel = buttonLabel || t("contactForm.buttonSeeMore", "See More");

  return (
    <div className={`text-left ${className}`}>
      <div className="w-full mt-3 flex items-center justify-between gap-4">
        {summary ? (
          <div className="text-sm leading-snug text-gray-800 flex-1">
            <p className="font-semibold">
              {summary.heading ||
                t(
                  "contactForm.summaryHeadingDefault",
                  "Based on your answers :",
                )}
            </p>
            {summary.product != null && (
              <p>
                {t("contactForm.summaryProduct", "Product :")} {summary.product}
              </p>
            )}
            {summary.issue != null && (
              <p>
                {t("contactForm.summaryIssue", "Issue :")} {summary.issue}
              </p>
            )}
            {summary.detail != null && (
              <p>
                {t("contactForm.summaryDetail", "Detail :")} {summary.detail}
              </p>
            )}
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className="w-[140px] flex justify-end shrink-0">
          <button
            type="button"
            onClick={() =>
              window.open("https://ethnocare.ca/", "_blank", "noopener,noreferrer")
            }
            className="w-full px-6 py-3 text-base rounded-md border font-sans font-bold transition-all cursor-pointer bg-black text-white border-black hover:bg-[#090C41]"
          >
            {seeMoreLabel}
          </button>
        </div>
      </div>
    </div>
  );
}