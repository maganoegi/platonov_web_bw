import type { Project } from "../types/projects";

let inMemory: Project[] | null = null;

export async function loadProjects(): Promise<Project[]> {
  if (inMemory) return inMemory;

  // static file with caching; hosting/CDN controls max-age/ETag
  const res = await fetch("/projects.json", { cache: "force-cache" });
  if (!res.ok) return [];
  const data = (await res.json()) as Project[];
  inMemory = data;
  return data;
}
