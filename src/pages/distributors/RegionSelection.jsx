import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";

export default function DistributorsRegionSelection() {
  const { t } = useTranslation("pages");

  return (
    <PageWrapper showBack={true} backTo="/distributors/product" code={true}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("regionDistributors.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("regionDistributors.description")}
        </p>
      </div>
    </PageWrapper>
  );
}
