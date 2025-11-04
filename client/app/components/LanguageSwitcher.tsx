import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const switchLang = (lang: string) => {
    i18n.changeLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLang("id")}
        className={`text-sm px-2 py-1 rounded transition ${
          i18n.language === "id"
            ? "bg-white/20 text-white"
            : "text-white/70 hover:text-white"
        }`}
      >
        ID
      </button>
      <button
        onClick={() => switchLang("en")}
        className={`text-sm px-2 py-1 rounded transition ${
          i18n.language === "en"
            ? "bg-white/20 text-white"
            : "text-white/70 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
}
