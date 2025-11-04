import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { About } from "~/welcome/about";
import { Projects } from "~/welcome/projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Home - AchmadGG" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <section id="heroes">
        <Welcome />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="projects">
        <Projects />
      </section>
    </>
  );
}
