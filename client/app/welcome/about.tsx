import { motion, useInView } from "framer-motion";
import SpotlightCard from "~/components/SpotlightCard";
import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Komponen Typing Animation per baris
function TerminalLine({
  command,
  args,
  delay,
  inView,
}: {
  command: string;
  args: string[];
  delay: number;
  inView: boolean;
}) {
  const fullText = ` ${command} "${args.join('", "')}"`;
  const [displayedText, setDisplayedText] = useState("");
  const [setShowCursor] = useState(true);

  useEffect(() => {
    if (!inView) return;

    let index = 0;
    const timer = setInterval(
      () => {
        if (index < fullText.length) {
          setDisplayedText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      },
      50 + Math.random() * 30
    ); // Random speed agar natural

    const blinkTimer = setInterval(() => {}, 530);

    return () => {
      clearInterval(timer);
      clearInterval(blinkTimer);
    };
  }, [inView, fullText]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ delay }}
      className="flex items-center text-green-400"
    >
      <span className="text-blue-400 mr-2">$</span>
      <span className="text-gray-300">{displayedText}</span>
    </motion.p>
  );
}

export function About() {
  const { t } = useTranslation();
  // Refs for sections to detect when in view
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const stackRef = useRef(null);
  const currentlyRef = useRef(null);

  // UseInView hooks
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const descriptionInView = useInView(descriptionRef, {
    once: true,
    margin: "-100px",
  });
  const stackInView = useInView(stackRef, { once: true, margin: "-100px" });
  const currentlyInView = useInView(currentlyRef, {
    once: true,
    margin: "-100px",
  });

  // Variants for fade-up animation similar to AOS
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  // Stagger container for stack items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  // Globe variants with scale and rotation
  const globeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" as const },
    },
    hover: {
      rotate: 360,
      transition: { duration: 10, repeat: Infinity, ease: "linear" as const },
    },
  };

  const scrollToProject = () => {
    const aboutSection = document.getElementById("projects");
    if (aboutSection) {
      const offset = 50;
      const targetY =
        aboutSection.getBoundingClientRect().top + window.scrollY - offset;
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
    <>
      <div className="relative min-h-screen overflow-hidden">
        <div className="px-5 mx-auto md:px-16 lg:px-28">
          {/* Title */}
          <div className="pt-20" ref={titleRef}>
            <motion.h2
              variants={fadeUpVariants}
              initial="hidden"
              animate={titleInView ? "visible" : "hidden"}
              className="mb-6 text-5xl font-bold lg:text-7xl"
            >
              {t("aboutTitle")}
            </motion.h2>

            {/* Description */}
            <div className="flex items-start gap-4" ref={descriptionRef}>
              <motion.div
                initial={{ height: 0 }}
                animate={descriptionInView ? { height: 80 } : { height: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" as const }}
                className="w-1.5 bg-blue-600 rounded"
              />
              <motion.p
                variants={fadeUpVariants}
                initial="hidden"
                animate={descriptionInView ? "visible" : "hidden"}
                className="max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl"
              >
                {t("aboutDesc")}
              </motion.p>
            </div>
          </div>

          {/* Content Row */}
          <div className="grid grid-cols-1 gap-8 mt-10 md:grid-cols-2">
            {/* My Stack */}
            <div ref={stackRef}>
              <motion.h3
                variants={fadeUpVariants}
                initial="hidden"
                animate={stackInView ? "visible" : "hidden"}
                className="mb-6 text-2xl font-semibold"
              >
                {t("myStack")}
              </motion.h3>
              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                animate={stackInView ? "visible" : "hidden"}
              >
                {[
                  "Tailwindcss",
                  "React",
                  "Next Js",
                  "Vue Js",
                  "Nuxt Js",
                  "Team Player",
                  "JavaScript",
                  "PostgreSQL",
                ].map((item, i) => (
                  <motion.div key={i} variants={itemVariants}>
                    <SpotlightCard
                      className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-100 shadow-sm cursor-pointer rounded-xl "
                      spotlightColor="oklch(0.488 0.243 264.376)"
                    >
                      {item}
                    </SpotlightCard>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Currently Section - Terminal Window */}
            <div ref={currentlyRef}>
              <motion.h3
                variants={fadeUpVariants}
                initial="hidden"
                animate={currentlyInView ? "visible" : "hidden"}
                className="mb-6 text-2xl font-semibold"
              >
                {t("currently")}
              </motion.h3>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={currentlyInView ? "visible" : "hidden"}
              >
                <SpotlightCard
                  className="p-5 rounded-xl bg-gray-900/90 backdrop-blur-xl border border-gray-700 
                 font-mono text-sm shadow-2xl max-w-lg overflow-hidden"
                  spotlightColor="oklch(0.488 0.243 264.376)"
                >
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 mb-4 select-none">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-gray-500 text-xs tracking-wider">
                      ~/currently.sh
                    </span>
                  </div>

                  {/* Terminal Output with Typing Animation */}
                  <div className="space-y-2">
                    {[
                      {
                        cmd: "learning",
                        args: ["Next.js 15", "Prisma", "PostgreSQL"],
                      },
                      {
                        cmd: "building",
                        args: ["Portfolio v3", "Arduino Simulator"],
                      },
                      {
                        cmd: "exploring",
                        args: ["Cloudflare R2", "Edge Deploy"],
                      },
                    ].map((item, i) => (
                      <TerminalLine
                        key={i}
                        command={item.cmd}
                        args={item.args}
                        delay={i * 0.8}
                        inView={currentlyInView}
                      />
                    ))}
                  </div>
                  <div className="flex items-center text-blue-400 font-mono">
                    {/* Tanda $ - muncul SETELAH kursor */}
                    <motion.p
                      initial={{ opacity: 0, x: 0 }}
                      animate={currentlyInView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: 2.5, // 2.5s (kursor muncul) + 0.6s (durasi kursor)
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      className="text-md mt-1"
                    >
                      $
                    </motion.p>

                    {/* Kursor - muncul lebih dulu */}
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={currentlyInView ? { opacity: 1, scaleY: 1 } : {}}
                      transition={{
                        opacity: { delay: 3, duration: 0.6, ease: "easeOut" },
                        scaleY: { delay: 2.5, duration: 0.4, ease: "easeOut" },
                      }}
                      className="ml-2 inline-block relative"
                    >
                      {/* Kursor utama dengan blink halus */}
                      <motion.div
                        animate={{
                          opacity: [1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-0.5 h-5 bg-blue-400 rounded-full"
                      />
                    </motion.div>
                  </div>
                </SpotlightCard>
              </motion.div>
            </div>
          </div>
          <div className="flex justify-center pt-5 md:pt-11 md:mt-20">
            <div className="relative w-38 group">
              <button
                onClick={scrollToProject}
                className="w-full font-medium text-white hover:cursor-pointer z-10"
              >
                {t("projectButton")}
              </button>
              <span
                className="absolute left-0 -bottom-1 w-full h-0.5 bg-linear-to-r from-white to-gray-400 
                 transform scale-x-0 origin-center transition-transform duration-500 
                 group-hover:scale-x-100"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
