import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

const WORDS_PER_MINUTE = 200;

export function getReadingTime(post: BlogPost): number {
  if (post.data.readingTime) return post.data.readingTime;
  // ponytail: split ingênuo conta código/pontuação como palavra, ajustar se
  // a estimativa ficar visivelmente inflada em posts com muito bloco de código.
  const words = post.body?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export const TOPICS = ['code-review', 'ctf', 'mobile'] as const;
export type Topic = (typeof TOPICS)[number];

const TOPIC_LABELS: Record<Topic, string> = {
  'code-review': 'Code Review',
  ctf: 'CTF',
  mobile: 'Mobile',
};

export function getTopicLabel(topic: Topic): string {
  return TOPIC_LABELS[topic];
}

export function getTopicCounts(posts: BlogPost[]) {
  return TOPICS.map((topic) => ({
    value: topic,
    label: TOPIC_LABELS[topic],
    count: posts.filter((p) => p.data.tags.includes(topic)).length,
  })).filter((t) => t.count > 0);
}

export function getRecentPosts(posts: BlogPost[], count = 5): BlogPost[] {
  return [...posts]
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, count);
}

export function getPostsByTopic(posts: BlogPost[], topic: Topic): BlogPost[] {
  return posts
    .filter((p) => p.data.tags.includes(topic))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getOtherPosts(posts: BlogPost[]): BlogPost[] {
  return posts
    .filter((p) => !TOPICS.some((topic) => p.data.tags.includes(topic)))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// Séries de posts em múltiplas partes — não dá pra derivar isso do frontmatter
// (título/data não bastam), então mapeia à mão. Adicionar aqui quando uma
// série nova nascer.
const SERIES: string[][] = [
  ['2021-03-24-vulnado', '2021-03-28-vulnado2', '2021-03-30-vulnado3'],
  ['2024-01-14-uncrackable-l1', '2024-03-18-uncrackable-l1-2'],
  ['2024-09-10-guessme', '2024-09-11-guessme2'],
  ['2024-10-01-postboard1', '2024-10-01-postboard2'],
];

export function getSeriesNav(post: BlogPost, allPosts: BlogPost[]) {
  const series = SERIES.find((ids) => ids.includes(post.id));
  if (!series) return { prev: null, next: null };

  const idx = series.indexOf(post.id);
  const findPost = (id: string | undefined) => allPosts.find((p) => p.id === id) ?? null;

  return {
    prev: findPost(series[idx - 1]),
    next: findPost(series[idx + 1]),
  };
}
