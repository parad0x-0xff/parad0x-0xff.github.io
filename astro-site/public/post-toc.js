function initPostToc() {
  const links = document.querySelectorAll('.post-toc [data-toc-link]');
  if (links.length === 0) return;

  const headingEls = [...links]
    .map((link) => document.getElementById(link.getAttribute('data-toc-link')))
    .filter((el) => el !== null);
  if (headingEls.length === 0) return;

  const linkFor = (id) => document.querySelector(`.post-toc [data-toc-link="${id}"]`);
  const visible = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      if (visible.size === 0) return;
      const current = headingEls.find((el) => visible.has(el.id));
      links.forEach((l) => l.classList.remove('active'));
      if (current) linkFor(current.id)?.classList.add('active');
    },
    { rootMargin: '0px 0px -70% 0px' }
  );

  headingEls.forEach((el) => observer.observe(el));
}

document.addEventListener('astro:page-load', initPostToc);
