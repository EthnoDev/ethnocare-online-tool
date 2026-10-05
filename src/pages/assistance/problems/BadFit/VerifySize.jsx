import PageWrapper from "../../../../components/PageWrapper";
import { useTranslation } from "react-i18next";
import RedirectLogo from "../../../../assets/redirect-logo.svg";

export default function VerifySize() {
  const { t } = useTranslation("pages");

  return (
    <PageWrapper showBack={true} backTo="/assistance/problem/bad-fit/sizing">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("verifySizeAssistance.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("verifySizeAssistance.description")}
        </p>
        <p className="mt-3 text-left text-xl font-semibold">
          {t("verifySizeAssistance.step1")}
        </p>
        <p className="text-left text-sm text-slate-600">
          {t("verifySizeAssistance.descriptionStep1")}
        </p>
        <div className="mt-4 flex justify-center">
          <a
            href="/sizing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md border border-black bg-black px-6 py-3 font-sans text-base font-bold text-white transition-colors hover:border-[#090C41] hover:bg-[#090C41]"
          >
            <span>{t("verifySizeAssistance.startButton")}</span>
            <img
              src={RedirectLogo}
              alt=""
              aria-hidden="true"
              className="ml-2 h-4 w-5 invert"
            />
          </a>
        </div>
      </div>
    </PageWrapper>
  );
}
