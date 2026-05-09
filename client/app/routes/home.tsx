import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { About } from "~/welcome/about";
import { Projects } from "~/welcome/projects";
import {
  buildMeta,
  PAGE_META,
  schemaWebSite,
  schemaPerson,
  schemaItemList,
  jsonLd,
} from "~/lib/seo";

// ─── 1. Meta tags per halaman ────────────────────────────────────────────────
// React Router 7 built-in meta() — tidak perlu react-helmet-async.
// Hasilnya dirender di server (SSR) sehingga crawlable oleh Googlebot.
export function meta({}: Route.MetaArgs) {
  return buildMeta(PAGE_META.home);
}

// ─── 2. Links — canonical sudah ada di buildMeta via tagName:"link" ──────────
// Jika ingin link tambahan (preload, dll) tambahkan di sini.
export const links: Route.LinksFunction = () => [];

// ─── 3. Halaman utama ────────────────────────────────────────────────────────
export default function Home() {
  // Data proyek (hardcoded di sini agar tersedia untuk JSON-LD SSR;
  // idealnya bisa di-fetch dari loader jika data dinamis)
  const projects = [
    {
      id: 1,
      title: "ToDo App",
      desc: "Personal ToDo list application built with Flutter and Hive for local storage with lottie animations.",
      tech: ["Hive", "Flutter", "Lottie"],
      link: "https://github.com/achmad-gg/FlutterToDo",
    },
    {
      id: 2,
      title: "ERP Dashboard",
      desc: "Simple ERP system with interactive charts and data management using PostgreSQL and Express.",
      tech: ["Vue", "Express", "PostgreSQL"],
      link: "",
    },
    {
      id: 3,
      title: "Web Kanban Board",
      desc: "Web-based Kanban board application with drag-and-drop using Next.js and rechartjs.",
      tech: ["Next.js", "rechartjs", "Tailwind CSS"],
      link: "https://github.com/achmad-gg/nextjs-kanban",
    },
  ];

  return (
    <>
      {/* ── Structured Data JSON-LD ─────────────────────────────────────── */}
      {/* Schema: WebSite — untuk halaman Home */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schemaWebSite) }}
      />
      {/* Schema: Person — untuk section About */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schemaPerson) }}
      />
      {/* Schema: ItemList — untuk section Projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schemaItemList(projects)) }}
      />

      {/* ── Sections ────────────────────────────────────────────────────── */}
      <section id="heroes" aria-label="Hero section">
        <Welcome />
      </section>

      <section id="about" aria-label="About section">
        <About />
      </section>

      <section id="projects" aria-label="Projects section">
        <Projects />
      </section>
    </>
  );
}
