import fs from "node:fs/promises";

const username = process.env.GITHUB_USER || "maganoegi";
const token = process.env.GITHUB_TOKEN || ""; // optional, CI-only
const outPath = "public/projects.json";

async function fetchAllRepos() {
  const perPage = 100;
  let page = 1;
  let all = [];

  while (true) {
    const url = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": username,
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`GitHub fetch failed ${res.status}: ${txt}`);
    }

    const batch = await res.json();
    all = all.concat(batch);

    if (batch.length < perPage) break;
    page++;
  }

  return all;
}

function toProject(repo) {
  return {
    source: "github",
    id: repo.id,
    name: repo.name,
    url: repo.url, // keep for parity
    description: repo.description,
    language: repo.language,
    homepage: repo.homepage,
    html_url: repo.html_url
  };
}

async function main() {
  const repos = await fetchAllRepos();
  const projects = repos.map(toProject);

  await fs.writeFile(outPath, JSON.stringify(projects, null, 2), "utf-8");
  console.log(`Wrote ${projects.length} projects to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
