function initReadingProgress() {
  const bar = document.getElementById('reading-progress-bar');
  const article = document.querySelector('.post-content');
  if (!bar || !article) return;

  function update() {
    const rect = article.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;
    bar.style.width = `${progress * 100}%`;
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  update();
}

document.addEventListener('astro:page-load', initReadingProgress);
