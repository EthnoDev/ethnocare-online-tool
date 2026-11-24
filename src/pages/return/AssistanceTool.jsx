import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";
import SelectableOption from "../../components/SelectableOption";
import RedirectLogo from "../../assets/redirect-logo.svg";

export default function AssistanceTool() {
  const { t } = useTranslation("pages");

  return (
    <PageWrapper showBack={true} backTo="/" code={true}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("assistanceToolReturn.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("assistanceToolReturn.description")}
        </p>

        <div className="mt-8 flex flex-col items-center space-y-6">
          <SelectableOption label={t("assistanceToolReturn.option1")} />
          <SelectableOption
            onClick={() =>
              window.open("/assistance/product", "_blank", "noopener,noreferrer")
            }
            label={
              <span className="flex items-center justify-center gap-2">
                {t("assistanceToolReturn.option2")}
                <img
                  src={RedirectLogo}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </span>
            }
          />
        </div>
      </div>
    </PageWrapper>
  );
}
