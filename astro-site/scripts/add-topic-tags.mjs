import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = './src/content/blog';

const topics = {
  '2020-10-10-What-is-Code-Review.md': ['code-review'],
  '2020-10-17-Methods-Code-Review.md': ['code-review'],
  '2021-07-16-Docker-Code-Analyzer.md': ['code-review'],
  '2021-11-26-DCA-php.md': ['code-review'],
  '2022-07-20-CVE-2022-26352.md': ['code-review'],

  '2021-01-28-DVWS.md': ['ctf'],
  '2021-03-24-Vulnado.md': ['ctf'],
  '2021-03-28-Vulnado2.md': ['ctf'],
  '2021-03-30-Vulnado3.md': ['ctf'],

  '2024-01-14-UnCrackable-L1.md': ['mobile'],
  '2024-03-18-UnCrackable-L1-2.md': ['mobile'],
  '2024-08-06-IOT-Connect.md': ['mobile'],
  '2024-08-15-FoodStore.md': ['mobile'],
  '2024-09-10-GuessMe.md': ['mobile'],
  '2024-09-11-GuessMe2.md': ['mobile'],
  '2024-10-01-PostBoard1.md': ['mobile'],
  '2024-10-01-PostBoard2.md': ['mobile'],
  '2024-08-01-Mobile-Framework.md': ['mobile'],

  '2020-10-18-OwaspZap.md': [],
  '2020-10-18-Dast-Auth.md': [],
  '2023-03-04-pentest-report.md': [],
  '2023-09-14-FaaS.md': [],
};

for (const [file, tags] of Object.entries(topics)) {
  const path = join(DIR, file);
  const raw = readFileSync(path, 'utf-8');
  const literal = `[${tags.map((t) => `"${t}"`).join(', ')}]`;
  const updated = raw.replace(/^tags:.*$/m, `tags: ${literal}`);
  writeFileSync(path, updated);
  console.log(`tags=${literal}: ${file}`);
}
