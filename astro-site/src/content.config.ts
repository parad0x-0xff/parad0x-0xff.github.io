import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    category: z.enum(['tutorial', 'writeup', 'project', 'idea']).default('writeup'),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    readingTime: z.number().optional(),
  }),
});

export const collections = { blog };
