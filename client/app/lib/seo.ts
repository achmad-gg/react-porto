/**
 * SEO Constants & Utilities
 * Terpusat di sini agar mudah diupdate
 */

export const SITE_CONFIG = {
  name: "AchmadGG",
  fullName: "Ragil Achmad Habibu",
  title: "AchmadGG — Website Developer",
  description:
    "Portofolio Ragil Achmad Habibu — Website Developer spesialisasi React, Next.js, dan Vue.js. Membangun antarmuka web yang modern, cepat, dan bisa diakses semua orang.",
  url: "https://gg-achmad.vercel.app",
  ogImage: "/og-image.png", // 1200x630px — simpan di /public/og-image.png
  locale: "id_ID",
  twitterHandle: "@achmadgg",
  linkedIn: "https://linkedin.com/in/achmadgg",
  github: "https://github.com/achmad-gg",
};

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  ogType?: "website" | "profile";
}

export const PAGE_META: Record<string, PageMeta> = {
  home: {
    title: `${SITE_CONFIG.name} — Website Developer`,
    description:
      "Howdy! Saya Achmad, Website Developer yang membangun website modern, elegan, dan mudah digunakan. Jelajahi portofolio, keahlian, dan proyek-proyek saya.",
    path: "/",
    ogType: "website",
  },
  about: {
    title: `About | ${SITE_CONFIG.name} — Website Developer`,
    description:
      "Kenali lebih dekat Ragil Achmad Habibu — seorang Website Developer dengan keahlian React, Next.js, Vue.js, dan PostgreSQL. Lihat stack teknologi dan apa yang sedang saya kerjakan.",
    path: "/#about",
    ogType: "profile",
  },
  projects: {
    title: `Projects | ${SITE_CONFIG.name} — Website Developer`,
    description:
      "Daftar proyek pilihan Achmad: ToDo App Flutter, ERP Dashboard Vue/Express, dan Web Kanban Board Next.js. Kode sumber tersedia di GitHub.",
    path: "/#projects",
    ogType: "website",
  },
};

/**
 * Membuat array meta tags standar React Router 7 untuk sebuah halaman.
 * Sudah mencakup title, description, canonical, OG, dan Twitter Card.
 */
export function buildMeta(page: PageMeta) {
  const canonicalUrl = `${SITE_CONFIG.url}${page.path}`;
  const ogImageUrl = `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  return [
    // --- Dasar ---
    { title: page.title },
    { name: "description", content: page.description },

    // --- Canonical ---
    { tagName: "link", rel: "canonical", href: canonicalUrl },

    // --- Open Graph ---
    { property: "og:title", content: page.title },
    { property: "og:description", content: page.description },
    { property: "og:type", content: page.ogType ?? "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:image", content: ogImageUrl },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: `${SITE_CONFIG.name} — Portofolio` },
    { property: "og:locale", content: SITE_CONFIG.locale },
    { property: "og:site_name", content: SITE_CONFIG.name },

    // --- Twitter Card ---
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: SITE_CONFIG.twitterHandle },
    { name: "twitter:creator", content: SITE_CONFIG.twitterHandle },
    { name: "twitter:title", content: page.title },
    { name: "twitter:description", content: page.description },
    { name: "twitter:image", content: ogImageUrl },
    { name: "twitter:image:alt", content: `${SITE_CONFIG.name} — Portofolio` },

    // --- Indexing ---
    { name: "robots", content: "index, follow, max-image-preview:large" },
  ];
}

/**
 * Membuat string JSON-LD untuk dimasukkan ke dalam <script type="application/ld+json">
 */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema);
}

// --- Schema definitions ---

export const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.description,
  author: {
    "@type": "Person",
    name: SITE_CONFIG.fullName,
    url: SITE_CONFIG.url,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_CONFIG.url}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export const schemaPerson = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.fullName,
  alternateName: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  jobTitle: "Website Developer",
  description:
    "Website Developer spesialisasi React, Next.js, Vue.js, dan PostgreSQL.",
  image: `${SITE_CONFIG.url}/og-image.png`,
  sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedIn],
  knowsAbout: [
    "React",
    "Next.js",
    "Vue.js",
    "Nuxt.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "PostgreSQL",
  ],
};

export interface ProjectItem {
  id?: number;
  title: string;
  desc: string;
  tech: string[];
  link: string;
}

export function schemaItemList(projects: ProjectItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Proyek Portofolio Achmad Ghifari Ghazali",
    description:
      "Daftar proyek pilihan yang dikerjakan oleh Achmad Ghifari Ghazali.",
    url: `${SITE_CONFIG.url}/#projects`,
    numberOfItems: projects.length,
    itemListElement: projects.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: p.title,
        description: p.desc,
        url: p.link || SITE_CONFIG.url,
        applicationCategory: "WebApplication",
        keywords: p.tech.join(", "),
        author: {
          "@type": "Person",
          name: SITE_CONFIG.fullName,
        },
      },
    })),
  };
}
