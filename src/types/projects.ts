export type Project = {
  source: "github" | "custom";
  id: number | string;
  name: string;
  url: string; // prefer html_url/homepage final link
  description: string | null;
  language: string | null;
  homepage?: string | null;
  html_url?: string | null;
};
