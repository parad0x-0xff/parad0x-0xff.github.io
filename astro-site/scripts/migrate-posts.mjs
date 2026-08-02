import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = '../_posts';
const OUT = './src/content/blog';

mkdirSync(OUT, { recursive: true });

for (const file of readdirSync(SRC)) {
  if (!file.endsWith('.md')) continue;
  const raw = readFileSync(join(SRC, file), 'utf-8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) { console.warn(`skip (no frontmatter): ${file}`); continue; }

  const [, fm, body] = match;
  const title = fm.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1] ?? file;
  const date = fm.match(/^date:\s*(.+?)\s*$/m)?.[1];
  const categories = fm.match(/^categories:\s*(.+?)\s*$/m)?.[1];
  const tags = categories ? categories.split(/\s+/) : [];

  const newFm = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `pubDate: ${date}`,
    tags.length ? `tags: [${tags.map(t => `"${t}"`).join(', ')}]` : null,
    '---',
  ].filter(Boolean).join('\n');

  writeFileSync(join(OUT, file), `${newFm}\n\n${body.trim()}\n`);
  console.log(`migrated: ${file}`);
}
