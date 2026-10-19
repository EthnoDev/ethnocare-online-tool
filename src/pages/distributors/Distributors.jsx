import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";
import RedirectIcon from "../../components/RedirectIcon";
import { regions } from "../../data/distributors";

export default function Distributors() {
  const { t, i18n } = useTranslation("pages");

  const product = (localStorage.getItem("product") || "").toLowerCase();
  const regionId = localStorage.getItem("region");

  const region = regions.find((r) => r.id === regionId);

  // Keep only distributors that carry the selected product, then drop empty countries
  const countries = (region?.countries ?? [])
    .map((country) => ({
      ...country,
      label: t(`distributors.countries.${country.name.replace(/\s+/g, "")}`, {
        defaultValue: country.name,
      }),
      distributors: country.distributors.filter((d) =>
        d.products.some((p) => p.toLowerCase() === product)
      ),
    }))
    .filter((country) => country.distributors.length > 0)
    .sort((a, b) => a.label.localeCompare(b.label, i18n.language));

  return (
    <PageWrapper showBack={true} backTo="/distributors/region" code={true}>
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-slate-900 leading-tight">
          {t("distributors.title")}
        </h1>

        <p className="mt-3 text-center text-base text-slate-500">
          {t("distributors.description")}
        </p>

        <div className="mt-8 space-y-6 text-left">
          {countries.map((country) => (
            <div key={country.name}>
              <h2 className="text-xl font-semibold text-slate-900">
                {country.label}
              </h2>
              <ul className="mt-1 pl-4 flex flex-col items-start gap-2">
                {country.distributors.map((d) => (
                  <li key={d.name}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1 text-base underline underline-offset-4 decoration-[1px] cursor-pointer hover:font-bold"
                    >
                      <span
                        data-label={d.name}
                        className="inline-flex flex-col items-center after:invisible after:block after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-label)]"
                      >
                        {d.name}
                      </span>
                      <RedirectIcon className="h-4 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
