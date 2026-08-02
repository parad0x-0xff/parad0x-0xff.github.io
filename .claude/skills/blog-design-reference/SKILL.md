---
name: blog-design-reference
description: Design reference and methodology for the Blog Pirata Astro site (astro-site/). Use whenever doing visual/interaction design work on this blog — new pages, components, animations, or restyles. Documents lessons from getdesign.md and shadcn/ui, and the project's deliberate decision to stay dependency-light (no React/Tailwind).
---

# Blog design reference

Reference notes for design work on `astro-site/` (Astro, plain CSS, no framework — see `src/styles/tokens.css` for the token system already in place: black/green hacker palette, DM Sans + JetBrains Mono, 4px spacing scale, `data-theme` dark/light).

## Stack decision (confirmed with Allan, 2026-07-29)

Stay **dependency-light**: no React, no Tailwind, no shadcn/ui runtime. Reason: shadcn/ui components are React+Tailwind only — adding them would mean a real architecture shift (new framework, new build step, JS bundle in every "island") just to get UI patterns. Instead: **borrow the interaction/visual patterns, hand-build them in vanilla Astro + CSS + a few lines of JS.** Revisit only if a specific component (e.g. a real command palette with fuzzy search) turns out to be genuinely hard to hand-roll well.

## What getdesign.md teaches (methodology, not a tool)

getdesign.md (https://getdesign.md/) is a catalog of `DESIGN.md` files reverse-engineered from real sites — not an MCP, not installable, just a reference site. Its core idea, worth reusing here:

- Document a site's design system as **reasoning**, not just values: *why* this accent color, *why* this type scale — not just the hex codes. Our `tokens.css` has the values; if it ever needs a companion doc, follow this pattern (e.g. "green ramp chosen for CVSS-adjacent hacker-security tone, not brand-neutral SaaS green").
- Named reference points worth stealing *ideas* from when iterating on this blog's visual identity: Stripe (gradient depth, restrained motion), Tesla ("radical subtraction" — cut before you add), Nike (monochrome + one accent).
- Explicitly has **no motion/microinteraction guidance** — it's static tokens only. Don't go back to it looking for animation patterns.

## What shadcn/ui teaches (patterns to hand-build, not a dependency to add)

shadcn/ui (https://ui.shadcn.com) ships React+Tailwind components, distributed via an MCP server (`npx shadcn@latest mcp`) that browses/installs components by name. Not used directly here (see stack decision above). What's worth mining from it *as a spec*, then reimplementing in vanilla:

- **Command palette** (`cmdk`-style, ⌘K to open, fuzzy filter, keyboard nav) — good candidate for the blog's search/nav once there's enough content to justify it. Buildable vanilla: a `<dialog>` + a plain-JS substring filter over a small JSON index of posts, no fuzzy-search library needed at this content scale (~22 posts).
- **Consistent focus-visible / hover / active state layering** across all interactive elements (buttons, links, nav items) — shadcn is disciplined about this via Radix primitives; worth matching the *rigor* (every interactive element gets a deliberate hover+focus+active state) without needing Radix.
- **Composable primitives over monolith components** (e.g. `Dialog.Trigger` / `Dialog.Content` split) — informs how to structure hand-rolled Astro components: keep trigger markup and behavior separate from the panel/content markup even without a component-composition framework.

## Open items for future design passes

- Page-wide "smooth" feel (Allan's ask, 2026-07-29): old Jekyll theme had richer transition/detail polish than the current restyle. Candidates to evaluate: View Transitions API (`astro:transition`, native, zero JS cost) for page-to-page nav, scroll-reveal via `IntersectionObserver`, refined hover/focus states per the shadcn rigor note above. See the actual implementation plan (if written) for what was chosen — this file is reference/methodology, not a changelog.
