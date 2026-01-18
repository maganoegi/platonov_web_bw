import { useEffect, useState } from "react";
import type { Project } from "../../types/projects";
import { loadProjects } from "../../services/projects";

function pickImg(language: string | null) {
  const lang = language ?? "";
  if (lang === "CSS" || lang === "JavaScript" || lang === "HTML" || lang === "html") {
    return "/resources/img/webpack.png";
  }
  return `/resources/img/${lang}.png`;
}

export function ProjectsGrid(_props: { username: string }) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects().then(setProjects).catch(() => setProjects([]));
  }, []);

  return (
    <div className="gitGrid">
      {projects.map((p) => {
        const link = (p.homepage && p.homepage.length > 0 ? p.homepage : p.html_url) ?? p.url;
        const imgSrc = pickImg(p.language);

        return (
          <div
            key={String(p.id)}
            className="gitwrapper"
            onClick={() => (window.location.href = link)}
          >
            <img src={imgSrc} alt="langbased" className="gitImg" />
            <div className="gitDesc">{p.description ?? ""}</div>
          </div>
        );
      })}
    </div>
  );
}
