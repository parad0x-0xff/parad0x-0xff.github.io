# Blog Pirata

Writeups, tutoriais e projetos de segurança ofensiva — code review, pentest whitebox e exploração de vulnerabilidades reais. Publicado em [blog.parad0x.vip](https://blog.parad0x.vip).

Construído com [Astro](https://astro.build) — sem framework de UI, CSS e JS simples.

## Estrutura

Todo o site vive em [`astro-site/`](./astro-site):

```
astro-site/
├── public/            assets estáticos (imagens, scripts, CNAME)
├── src/
│   ├── components/    Nav, TerminalHero, PostCard, etc.
│   ├── content/blog/  posts (Markdown, Astro content collections)
│   ├── layouts/        Layout.astro
│   ├── lib/            helpers (blog.ts, cases.ts)
│   ├── pages/           home, /blog/, /about/
│   └── styles/          tokens.css, global.css, effects.css
```

## Desenvolvimento

```sh
cd astro-site
npm install
npm run dev       # http://localhost:4321
npm run build     # gera ./dist
npm run preview   # serve o build de produção localmente
```

## Deploy

Deploy automático via GitHub Actions (`.github/workflows/deploy.yml`) a cada push em `master`: builda `astro-site/` e publica no GitHub Pages.

## Aviso

Todos os artigos escritos aqui se limitam apenas para fins educativos, não me responsabilizando pelo uso indevido das informações escritas aqui.
