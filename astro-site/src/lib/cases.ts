export interface CaseStudy {
  title: string;
  href: string;
  img: string;
  desc: string;
  stack: string[];
}

export const CASES: CaseStudy[] = [
  {
    title: 'Mobile Framework',
    href: '/blog/2024-08-01-mobile-framework/',
    img: '/assets/img/android-ios.png',
    desc: 'Modelo que ajuda a medir a maturidade do aplicativo mobile e das suas respectivas defesas.',
    stack: ['Android', 'iOS', 'Threat Modeling'],
  },
  {
    title: 'Fraude as a Service',
    href: '/blog/2023-09-14-faas/',
    img: '/assets/img/fraude.jpg',
    desc: 'Simulação de um sistema de fraude para demonstração de impacto financeiro e reputacional.',
    stack: ['Simulação de Ataque', 'Impacto Financeiro'],
  },
  {
    title: 'DAST + Auth',
    href: '/blog/2020-10-18-dast-auth/',
    img: '/assets/img/zapproxy.png',
    desc: 'Implementação de pipeline DAST + Scan em API autenticado.',
    stack: ['OWASP ZAP', 'DAST', 'CI/CD'],
  },
  {
    title: 'Pentest Report',
    href: '/blog/2023-03-04-pentest-report/',
    img: '/assets/img/sunny.png',
    desc: 'Criação de modelo de report para pentest.',
    stack: ['Pentest', 'Reporting'],
  },
];
