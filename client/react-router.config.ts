import type { Config } from "@react-router/dev/config";

export default {
  // SSR aktif: setiap halaman dirender di server → crawlable oleh Googlebot
  ssr: true,

  // Prerender: React Router 7 akan me-render route berikut menjadi HTML statis
  // saat build. Sangat berguna untuk SEO — bot mendapat HTML penuh tanpa JS.
  // Untuk SPA murni (ssr: false) ini wajib; untuk SSR ini sebagai optimasi.
  prerender: ["/"],
} satisfies Config;
