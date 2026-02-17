// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import enPages from "./locales/en/pages.json";
import enErrors from "./locales/en/errors.json";
import frCommon from "./locales/fr/common.json";
import frPages from "./locales/fr/pages.json";
import frErrors from "./locales/fr/errors.json";
import esCommon from "./locales/es/common.json";
import esPages from "./locales/es/pages.json";
import esErrors from "./locales/es/errors.json";
import deCommon from "./locales/de/common.json";
import dePages from "./locales/de/pages.json";
import deErrors from "./locales/de/errors.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "fr", "es", "de"],
    interpolation: { escapeValue: false },
    ns: ["common", "pages", "errors"],
    defaultNS: "common",
    resources: {
      en: { common: enCommon, pages: enPages, errors: enErrors },
      fr: { common: frCommon, pages: frPages, errors: frErrors },
      es: { common: esCommon, pages: esPages, errors: esErrors },
      de: { common: deCommon, pages: dePages, errors: deErrors },
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"]
    }
  });

export default i18n;
