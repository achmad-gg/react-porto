import { useTranslation as useI18NextTranslation } from "react-i18next";
import { setLanguage, getLanguage } from "../lib/i18n";

export function useTranslation() {
  const { t, i18n } = useI18NextTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const currentLang = getLanguage();

  return { t, changeLanguage, currentLang };
}
