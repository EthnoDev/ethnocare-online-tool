import PageWrapper from "../../../../components/PageWrapper";
import { useTranslation } from "react-i18next";
import RedirectLogo from "../../../../assets/redirect-logo.svg";

export default function AdjustmentGuides() {
  const { t } = useTranslation("pages");
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
              className="flex items-center gap-1 text-base underline underline-offset-4 decoration-[1px] cursor-pointer"
            >
              <span>{t(`adjustmentGuidesAssistance.${guide}`)}</span>
              <img
                src={RedirectLogo}
                alt=""
                aria-hidden="true"
                className="h-4 w-5"
              />
            </button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}