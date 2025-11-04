import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Welcome() {
  const { t } = useTranslation();

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const targetY = aboutSection.getBoundingClientRect().top + window.scrollY;
      const startY = window.scrollY;
      const duration = 1500;
      const startTime = performance.now();

      const easeOutQuad = (t: number) => t * (2 - t);

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        window.scrollTo(0, startY + (targetY - startY) * easedProgress);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  return (
    <section className="min-h-screen overflow-hidden text-white">
      {/* Background Gradient Blue Glow */}
      <div className="flex justify-center overflow-hidden">
        <motion.div
          initial={{ y: 1000, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-[20rem] h-80 xs:w-[25rem] xs:h-[25rem] sm:w-120 sm:h-120 md:w-160 md:h-160 lg:w-240 lg:h-240 bg-blue-600/80 blur-[80px] xs:blur-[100px] sm:blur-[120px] md:blur-[150px] lg:blur-[200px] rounded-full -top-60 xs:-top-[18rem] sm:-top-80 md:-top-100 lg:-top-160 -z-10"
        />
      </div>

      <div className="flex items-center justify-center w-full min-h-screen px-4 xs:px-6 sm:px-8 md:items-end md:px-12">
        <div className="text-center md:text-left">
          <p className="fade-up-fast xs:text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-white/70 drop-shadow-sm max-w-[90%] xs:max-w-[80%] sm:max-w-[70%] md:max-w-240 mx-auto md:mx-0">
            {t("intro")}
          </p>

          <div className="relative w-20 mx-auto my-2 md:mx-0">
            <button
              className="fade-up-fast cursor-pointer title text-[16px] xs:text-[18px] sm:text-[20px] md:text-[20px] lg:text-[20px] group"
              onClick={scrollToAbout}
            >
              {t("explore")}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-linear-to-r from-white to-gray-400 transition-all duration-500 group-hover:w-full z-50" />
            </button>
          </div>

          <div className="fade-up-slow">
            <h1 className="my-heading">AchmadGG</h1>
          </div>
        </div>
      </div>
    </section>
  );
}
