import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import file JSON langsung dari frontend
import en from "../locales/en.json";
import id from "../locales/id.json";

const getDefaultLang = () => {
  if (typeof window !== "undefined") {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) return savedLang;

    const browserLang = navigator.language.slice(0, 2);
    return browserLang === "id" ? "id" : "en";
  }
  return "en";
};

export async function initI18n() {
  const lang = getDefaultLang();

  await i18n.use(initReactI18next).init({
    lng: lang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: en },
      id: { translation: id },
    },
  });

  return i18n;
}

export function getLanguage() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("lang") ?? "en";
  }
  return "en";
}

export async function setLanguage(lang: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lang);
    await i18n.changeLanguage(lang);

    window.location.reload();
  }
}

export default i18n;
