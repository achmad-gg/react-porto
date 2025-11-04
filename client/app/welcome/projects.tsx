import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const currentLang = localStorage.getItem("lang") || "en";
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}/api/projects?lang=${currentLang}`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // scroll animation
  useEffect(() => {
    const items = document.querySelectorAll(".fade-up");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("show");
        });
      },
      { threshold: 0.2 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen py-16 text-white">
      <div className="container px-6 mx-auto md:px-16 lg:px-28">
        <h2 className="mb-10 text-4xl font-bold fade-up text-center md:text-left">
          {t("projectsTitle")}
        </h2>

        {/* ✨ Kondisi jika kosong */}
        {projects.length === 0 ? (
          <p className="text-center text-white/60 italic">
            {t("noProjects") || "No projects available at the moment."}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <div
                key={i}
                className="fade-up group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tech.map((t: string, j: number) => (
                    <span
                      key={j}
                      className="px-2 py-1 text-xs rounded-md bg-blue-600/20 text-blue-300 border border-blue-500/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {t("viewProject")} →
                </a>
              </div>
            ))}
          </div>
        )}
        {/* ✨ End kondisi */}
      </div>
    </div>
  );
}
