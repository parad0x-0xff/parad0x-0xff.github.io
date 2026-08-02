import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = './src/content/blog';

const overrides = {
  '2020-10-18-Dast-Auth.md': 'project',
  '2023-03-04-pentest-report.md': 'project',
  '2023-09-14-FaaS.md': 'project',
  '2024-08-01-Mobile-Framework.md': 'project',
  '2020-10-10-What-is-Code-Review.md': 'tutorial',
  '2020-10-17-Methods-Code-Review.md': 'tutorial',
  '2020-10-18-OwaspZap.md': 'tutorial',
};

for (const file of readdirSync(DIR)) {
  if (!overrides[file]) continue;
  const path = join(DIR, file);
  const raw = readFileSync(path, 'utf-8');
  if (/^category:/m.test(raw)) {
    console.log(`skip (already has category): ${file}`);
    continue;
  }
  const updated = raw.replace(/^---\n/, `---\ncategory: "${overrides[file]}"\n`);
  writeFileSync(path, updated);
  console.log(`set category=${overrides[file]}: ${file}`);
}
