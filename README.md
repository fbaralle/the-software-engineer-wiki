# Software Engineering Wiki

A practical reference for algorithms, data structures, and system design — aimed at engineers who want a clear, example-driven guide without a formal CS background.

## Contents

- **[Documentation (Markdown)](./docs/)** — Browse the guide as markdown files in this repo. Start from [docs/README.md](./docs/README.md) for the full index.
- **[Website](https://your-website-url.vercel.app)** — Read the same content as a docs site (placeholder: deploy the `website/` app to Vercel and add your URL here).

## Repo structure

| Path | Description |
|------|-------------|
| `docs/` | Source content: modules, README index, and all markdown. Single source of truth for both GitHub and the website. |
| `website/` | Nextra app that serves `docs/` at `/docs`. Run locally with `cd website && npm run dev`. Deploy with root directory = `website`. |

The website uses a symlink `website/content` → `../docs` so the Nextra app reads the same files as the repo.
