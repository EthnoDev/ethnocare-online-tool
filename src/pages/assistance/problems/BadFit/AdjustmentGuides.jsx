import PageWrapper from "../../../../components/PageWrapper";
import { useTranslation } from "react-i18next";
import RedirectIcon from "../../../../components/RedirectIcon";
import ExclamationIcon from "../../../../assets/exclamation.svg";

export default function AdjustmentGuides() {
  const { t } = useTranslation(["pages", "common"]);
  const openGuides = () =>
    window.open("https://ethnocare.ca/", "_blank", "noopener,noreferrer");

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem/bad-fit/moving">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("adjustmentGuidesAssistance.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("adjustmentGuidesAssistance.description")}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          {["enlargement", "reduction"].map((guide) => (
            <button
              key={guide}
              type="button"
              onClick={openGuides}
              className="group flex items-center gap-1 text-base underline underline-offset-4 decoration-[1px] cursor-pointer hover:font-bold"
            >
              <span
                data-label={t(`adjustmentGuidesAssistance.${guide}`)}
                className="inline-flex flex-col items-center after:invisible after:block after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-label)]"
              >
                {t(`adjustmentGuidesAssistance.${guide}`)}
              </span>
              <RedirectIcon className="h-4 w-5" />
            </button>
          ))}
        </div>

        <div className="w-full max-w-sm mx-auto mt-8">
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-200/80">
            <div className="flex items-start gap-3 text-left">
              <img
                src={ExclamationIcon}
                alt={t("common:popup.notice_title")}
                className="shrink-0 w-5 h-5 opacity-100"
              />
              <div className="flex-1">
                <p className="text-base font-bold text-slate-900 leading-tight">
                  {t("adjustmentGuidesAssistance.note_title")}
                </p>
                <p className="mt-3 text-sm text-slate-600 leading-snug">
                  {t("adjustmentGuidesAssistance.note_body")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}