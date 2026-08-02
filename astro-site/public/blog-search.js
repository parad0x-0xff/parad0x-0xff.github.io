function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function initBlogSearch() {
  const input = document.getElementById('post-search');
  const emptyState = document.getElementById('search-empty');
  const sections = document.querySelectorAll('section[data-section]');
  if (!input || !emptyState || sections.length === 0) return;

  input.addEventListener('input', () => {
    const query = normalize(input.value.trim());
    let totalVisible = 0;

    sections.forEach((section) => {
      const slots = section.querySelectorAll('.card-slot');
      let sectionVisible = 0;
      slots.forEach((slot) => {
        const match = query === '' || (slot.dataset.search || '').includes(query);
        slot.hidden = !match;
        if (match) {
          sectionVisible++;
          totalVisible++;
        }
      });
      section.hidden = sectionVisible === 0;
    });

    emptyState.hidden = totalVisible !== 0;
  });
}

document.addEventListener('astro:page-load', initBlogSearch);
