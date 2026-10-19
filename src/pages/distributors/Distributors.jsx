import { useTranslation } from "react-i18next";
import PageWrapper from "../../components/PageWrapper";
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
      distributors: country.distributors.filter((d) =>
        d.products.some((p) => p.toLowerCase() === product)
      ),
    }))
    .filter((country) => country.distributors.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name, i18n.language));

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
              <h2 className="text-lg font-semibold text-slate-900">
                {country.name}
              </h2>
              <ul className="mt-2 space-y-2">
                {country.distributors.map((d) => (
                  <li key={d.name}>
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg border border-slate-200 bg-white px-4 py-3 text-base text-slate-700 underline hover:bg-slate-50"
                    >
                      {d.name}
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
