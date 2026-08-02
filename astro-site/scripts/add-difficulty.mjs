import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = './src/content/blog';

const difficulty = {
  '2020-10-10-What-is-Code-Review.md': 'easy',
  '2020-10-17-Methods-Code-Review.md': 'easy',
  '2020-10-18-OwaspZap.md': 'easy',
  '2021-03-24-Vulnado.md': 'easy',
  '2021-03-28-Vulnado2.md': 'medium',
  '2021-03-30-Vulnado3.md': 'hard',
  '2024-01-14-UnCrackable-L1.md': 'medium',
  '2024-03-18-UnCrackable-L1-2.md': 'medium',
  '2024-09-10-GuessMe.md': 'medium',
  '2024-09-11-GuessMe2.md': 'medium',
  '2024-10-01-PostBoard1.md': 'medium',
  '2024-10-01-PostBoard2.md': 'medium',
  '2021-01-28-DVWS.md': 'medium',
  '2024-08-15-FoodStore.md': 'easy',
  '2024-08-06-IOT-Connect.md': 'hard',
  '2022-07-20-CVE-2022-26352.md': 'hard',
  '2021-07-16-Docker-Code-Analyzer.md': 'medium',
  '2021-11-26-DCA-php.md': 'medium',
  '2020-10-18-Dast-Auth.md': 'medium',
  '2023-03-04-pentest-report.md': 'medium',
  '2023-09-14-FaaS.md': 'medium',
  '2024-08-01-Mobile-Framework.md': 'medium',
};

for (const [file, value] of Object.entries(difficulty)) {
  const path = join(DIR, file);
  const raw = readFileSync(path, 'utf-8');
  if (/^difficulty:/m.test(raw)) {
    console.log(`skip (already has difficulty): ${file}`);
    continue;
  }
  const updated = raw.replace(/^---\n/, `---\ndifficulty: "${value}"\n`);
  writeFileSync(path, updated);
  console.log(`difficulty=${value}: ${file}`);
}
