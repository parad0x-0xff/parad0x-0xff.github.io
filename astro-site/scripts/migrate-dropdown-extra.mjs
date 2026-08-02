import { readFileSync, writeFileSync } from 'node:fs';

const files = [
  '2020-10-18-Dast-Auth',
  '2023-03-04-pentest-report',
  '2023-09-14-FaaS',
  '2024-08-01-Mobile-Framework',
];

for (const name of files) {
  const raw = readFileSync(`../_dropdown/${name}.md`, 'utf-8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const [, fm, body] = match;
  const title = fm.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1] ?? name;
  const dateFromName = name.match(/^\d{4}-\d{2}-\d{2}/)[0];

  const newFm = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `pubDate: ${dateFromName} 13:37:00 -0300`,
    'tags: ["projeto"]',
    '---',
  ].join('\n');

  writeFileSync(`./src/content/blog/${name}.md`, `${newFm}\n\n${body.trim()}\n`);
  console.log(`migrated: ${name}`);
}
