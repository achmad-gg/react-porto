import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative bg-background text-foreground py-16 px-6 md:px-12 lg:px-24 mt-20 border-t border-border/50 rounded-t-3xl md:rounded-t-[3rem] overflow-hidden">
      {/* Background Subtle Glow (sesuai tema lama) */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-blue-600/10 to-transparent pointer-events-none" />

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16 md:mb-24">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">
            {t("footerSub")}
          </h2>
        </div>
        
        <div className="flex gap-12 sm:gap-24 font-medium text-sm md:text-base">
          <ul className="flex flex-col gap-4 text-muted-foreground">
            <li>
              <a href="https://github.com/achmad-gg" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/achmadgg" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                LinkedIn
              </a>
            </li>
            <li>
              <a 
                href="https://www.instagram.com/achmadqt/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-foreground transition-colors"
                onClick={(e) => {
                  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                  if (isMobile) {
                    e.preventDefault();
                    window.location.href = "instagram://user?username=achmadqt";
                    setTimeout(() => {
                      window.location.href = "https://www.instagram.com/achmadqt/";
                    }, 1000);
                  }
                }}
              >
                Instagram
              </a>
            </li>
          </ul>
          <ul className="flex flex-col gap-4 text-muted-foreground">
            <li>
              <a href="#about" className="hover:text-foreground transition-colors">{t("aboutTitle")}</a>
            </li>
            <li>
              <a href="#projects" className="hover:text-foreground transition-colors">{t("projectsTitle")}</a>
            </li>
            <li>
              <a href="mailto:habibuachmad.gg@gmail.com" className="hover:text-foreground transition-colors">{t("contactTitle")}</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Middle Section: Massive Text */}
      <div className="w-full flex justify-center items-center mb-16 md:mb-24 select-none">
        <h1 className="font-footer text-[14vw] md:text-[13vw] lg:text-[14vw] leading-none tracking-tighter text-foreground">
          AchmadGG
        </h1>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium pt-8 border-t border-border/50">
        <div className="mb-6 md:mb-0">
          <span className="text-xl font-semibold tracking-tight text-muted-foreground">AchmadGG</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-muted-foreground">
          <span className="hover:text-foreground transition-colors cursor-default">© {new Date().getFullYear()} AchmadGG</span>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
