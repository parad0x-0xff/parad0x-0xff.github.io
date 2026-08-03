(function () {
  const DICT = {
    pt: {
      'nav.home': 'home',
      'nav.blog': 'blog',
      'nav.blog.all': 'ver tudo',
      'nav.blog.recent': 'recentes',
      'nav.blog.other': 'projetos & outros',
      'nav.start': 'comece aqui',
      'nav.about': 'about',
      'nav.theme': 'Alternar tema',

      'hero.systitle': 'SISTEMA: BLOG PIRATA v3.0',
      'hero.eyebrow': 'Segurança ofensiva & code review',
      'hero.h1.line1': 'Hackers são',
      'hero.h1.accent': 'piratas',
      'hero.h1.line2': 'do código',
      'hero.desc':
        'Escrevo sobre secure code review, pentest whitebox e exploração de vulnerabilidades reais — compartilhando conhecimento em português para fortalecer a comunidade.',
      'hero.cta': 'Ler o blog',
      'hero.boot.identifying': '> IDENTIFICANDO OPERADOR...',
      'hero.boot.operator': '> OPERADOR: PARAD0X',
      'hero.boot.specialist': '> ESPECIALISTA EM SEGURANÇA OFENSIVA.',
      'hero.boot.role': '> CODE REVIEW, DEVSECOPS E ARQUITETO.',
      'hero.boot.mission': '> MISSÃO: DISSEMINAR CONHECIMENTO.',
      'hero.boot.certs': '> CERTIFICAÇÕES: OSCP · DCPT · EHPX',
      'hero.boot.welcome': '> BEM-VINDO AO BLOG PIRATA.',

      'home.cases.title': 'Principais cases',
      'home.cases.cta': 'Ler case',
      'home.posts.title': 'Posts recentes',
      'home.posts.viewall': 'ver tudo →',
      'home.posts.status': '● publicado',
      'home.posts.cta': 'Ler mais',
      'home.stats.posts': 'posts publicados',
      'home.stats.topics': 'temas cobertos',
      'home.stats.years': 'anos escrevendo',
      'home.stats.last': 'última publicação',
      'home.stats.daysago': 'd atrás',
      'home.aviso':
        'Todos os artigos escritos aqui se limitam apenas para fins educativos, não me responsabilizando pelo uso indevido das informações escritas aqui.',

      'badge.tutorial': 'tutorial',
      'badge.writeup': 'writeup',
      'badge.project': 'projeto',
      'badge.idea': 'ideia',

      'blog.title': 'Blog',
      'blog.section.other': 'outros',
      'blog.search.label': 'grep -i',
      'blog.search.placeholder': 'code review, ctf, mobile...',
      'blog.search.empty': 'Nenhum post bate com essa busca.',

      'about.label.name': 'Nome',
      'about.label.role': 'Profissão',
      'about.label.specialty': 'Especialidade',
      'about.label.experience': 'Experiência',
      'about.label.community': 'Comunidade',
      'about.label.certs': 'Certificações',
      'about.label.talks': 'Palestras',
      'about.value.role': 'Especialista em Segurança Cibernética',
      'about.value.experience': '+8 anos de experiência de mercado.',
      'about.value.community': 'Contribuição em projetos de código aberto.',
      'about.h2.experience': 'Experiência Profissional',
      'about.h2.career': ' Carreira',
      'about.h2.talks': ' Palestras',
      'about.career.lead':
        'Aqui estão os projetos que realizei durante minha trajetória para solucionar problemas nas empresas das quais eu trabalhei e que tiveram impacto real.',
    },
    en: {
      'nav.home': 'home',
      'nav.blog': 'blog',
      'nav.blog.all': 'view all',
      'nav.blog.recent': 'recent',
      'nav.blog.other': 'projects & other',
      'nav.start': 'get started',
      'nav.about': 'about',
      'nav.theme': 'Toggle theme',

      'hero.systitle': 'SYSTEM: BLOG PIRATA v3.0',
      'hero.eyebrow': 'Offensive security & code review',
      'hero.h1.line1': 'Hackers are',
      'hero.h1.accent': 'pirates',
      'hero.h1.line2': 'of code',
      'hero.desc':
        'I write about secure code review, whitebox pentesting and real-world vulnerability exploitation — sharing knowledge to strengthen the community.',
      'hero.cta': 'Read the blog',
      'hero.boot.identifying': '> IDENTIFYING OPERATOR...',
      'hero.boot.operator': '> OPERATOR: PARAD0X',
      'hero.boot.specialist': '> OFFENSIVE SECURITY SPECIALIST.',
      'hero.boot.role': '> CODE REVIEW, DEVSECOPS & ARCHITECT.',
      'hero.boot.mission': '> MISSION: SPREAD KNOWLEDGE.',
      'hero.boot.certs': '> CERTIFICATIONS: OSCP · DCPT · EHPX',
      'hero.boot.welcome': '> WELCOME TO BLOG PIRATA.',

      'home.cases.title': 'Featured cases',
      'home.cases.cta': 'Read case',
      'home.posts.title': 'Recent posts',
      'home.posts.viewall': 'view all →',
      'home.posts.status': '● published',
      'home.posts.cta': 'Read more',
      'home.stats.posts': 'posts published',
      'home.stats.topics': 'topics covered',
      'home.stats.years': 'years writing',
      'home.stats.last': 'last published',
      'home.stats.daysago': 'd ago',
      'home.aviso':
        'All articles here are strictly for educational purposes — I take no responsibility for any misuse of the information shared.',

      'badge.tutorial': 'tutorial',
      'badge.writeup': 'writeup',
      'badge.project': 'project',
      'badge.idea': 'idea',

      'blog.title': 'Blog',
      'blog.section.other': 'other',
      'blog.search.label': 'grep -i',
      'blog.search.placeholder': 'code review, ctf, mobile...',
      'blog.search.empty': 'No posts match this search.',

      'about.label.name': 'Name',
      'about.label.role': 'Role',
      'about.label.specialty': 'Specialty',
      'about.label.experience': 'Experience',
      'about.label.community': 'Community',
      'about.label.certs': 'Certifications',
      'about.label.talks': 'Talks',
      'about.value.role': 'Cybersecurity Specialist',
      'about.value.experience': '+8 years of market experience.',
      'about.value.community': 'Contributor to open source projects.',
      'about.h2.experience': 'Professional Experience',
      'about.h2.career': '💡 Career',
      'about.h2.talks': '📚 Talks',
      'about.career.lead':
        'Here are the projects I built throughout my career to solve real problems at the companies I worked for.',
    },
  };

  function currentLang() {
    return localStorage.getItem('lang') === 'en' ? 'en' : 'pt';
  }

  function apply(lang) {
    const dict = DICT[lang];
    document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
    document.documentElement.setAttribute('data-lang', lang);

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = dict[el.getAttribute('data-i18n')];
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = dict[el.getAttribute('data-i18n-placeholder')];
      if (value !== undefined) el.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const value = dict[el.getAttribute('data-i18n-aria-label')];
      if (value !== undefined) el.setAttribute('aria-label', value);
    });

    const toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.textContent = lang === 'en' ? 'PT-BR' : 'EN-US';
  }

  function init() {
    apply(currentLang());
    const toggle = document.getElementById('lang-toggle');
    if (toggle && !toggle.dataset.bound) {
      toggle.dataset.bound = 'true';
      toggle.addEventListener('click', () => {
        const next = currentLang() === 'en' ? 'pt' : 'en';
        localStorage.setItem('lang', next);
        apply(next);
      });
    }
  }

  document.addEventListener('astro:page-load', init);
})();
