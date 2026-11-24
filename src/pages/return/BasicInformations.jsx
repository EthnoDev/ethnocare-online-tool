import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";

export default function BasicInformations() {
  const { t } = useTranslation("pages");

  return (
    <PageWrapper showBack={true} backTo="/return" code={true}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("basicInformationsReturn.title")}
        </h1>
        <p className="mt-3 text-center text-base text-slate-500">
          {t("basicInformationsReturn.description")}
        </p>
        <p className="mt-8 text-left text-xl font-semibold">
          {t("basicInformationsReturn.product")}
        </p>
      </div>
    </PageWrapper>
  );
}
