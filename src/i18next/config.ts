import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import th from "./locales/th/translation.json";

i18next.use(initReactI18next).init({
  lng: "en",
  resources: {
    en: {
      translation: en,
    },
    th: {
      translation: th,
    },
  },
});
