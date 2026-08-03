# Blog Pirata — Astro site

Source for [blog.parad0x.vip](https://blog.parad0x.vip). Astro, plain CSS (`src/styles/tokens.css` for the token system), no UI framework — see `.claude/skills/blog-design-reference` at the repo root for the design methodology and stack decision.

## Structure

```
public/            static assets (images, client scripts, CNAME)
src/
├── components/     Nav, TerminalHero, PostCard, Badge, PageFx, etc.
├── content/blog/   posts (Markdown, Astro content collections, see content.config.ts)
├── layouts/        Layout.astro
├── lib/            blog.ts (post helpers), cases.ts (career case studies)
├── pages/          index, /blog/, /about/
└── styles/         tokens.css, global.css, effects.css
```

## Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`        | Start dev server at `localhost:4321`          |
| `npm run build`      | Build production site to `./dist/`            |
| `npm run preview`    | Preview the production build locally          |

Deployed automatically via `.github/workflows/deploy.yml` on push to `master`.
