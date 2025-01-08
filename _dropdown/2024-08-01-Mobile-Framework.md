---
layout: page
title: Mobile Framework
description: Mobile Framework
dropdown: Projects
priority: 3
---


"Mobile + OWASP == framework"
<!--more-->

# Problemática
Durante meu ciclo em uma empresa, percebemos o quão difícil era reportar para a alta gestão e outros times como estavam as atuais defesas do aplicativo mobile. O ambiente mobile é muito dinâmico quando o assunto são defesas pois envolvem questões de erros e performance. Muito por conta que a maioria das empresas utilizam soluções terceiras para proteger seu aplicativo.

## Ideia
Para resolver esse problema foi criado um framework mobile que ajudasse não só o próprio time de segurança, mas os outros times e desse visibilidade para todos. Utilizando o MASVS da OWASP que é mundialmente reconhecido, foi possível criar essa plataforma para medir a maturidade das defesas do aplicativo assim como a maturidade da segurança do aplicativo como um todo.

## Resultado
Foi criada uma plataforma que contempla todo o ciclo de testes de segurança do aplicativo e sanou os problemas de visibilidade, trouxe ainda mais controle sobre as defesas atuais, facilitando assim o dia dia do time. Esse projeto foi divido em três partes: 

- **Diagrama**
- **Planilha**
- **Gráficos**

### Diagrama
Baseado nos pilares do MASVS que compõe toda a arquitetura do dispositivo mobile, foi criada uma representação visual das possíveis ameaças no aplicativo mobile. Assim além de ter embasamento, consegui demonstrar o impacto do que poderia acontecer caso alguma vulnerabilidade acontecesse nos seus respectivos pilares.

| OWASP MASVS |Exemplo Intent vulnerável| 
|-------------|-------------------------|
| <img src="/assets/img/masvs.png" height="150" width="180"/> OWASP MASVS (Mobile Application Security Verification Standard) é o padrão de boas práticas de segurança em dispositivos mobile. |<img src="https://res.cloudinary.com/snyk/image/upload/v1620937885/wordpress-sync/blog-android-intents-poisoned-intent.png" height="300" width="300" /> Exemplo de ataque de roubo de sessão, abusando de uma intent vulnerável. Esse atque afeta diretamente o pilar de "Platform". |


### Planilha
Em uma simples planilha foi colocado todos os testes do MASTG (Mobile Application Security Testing Guide), onde uma vez que o time fosse realizando os testes com base no resultado era preenchido se estava vulnerável ou não.

<p align="center">
<img src="/assets/img/masvs-planilha.png" width="800" height="800"/>MASVS OWASP
</p>
<br>

### Gráficos
Aqui unimos os resultados da planilha em uma página que transformava os dados de texto em gráficos, dando assim a visibilidade de como estava a maturidade do aplicativo em tempo real.

<p align="center">
<img src="/assets/img/masvs-dashboard.png" width="800" height="800"/>Mapa de calor por pilar
</p>
<br>

## Observação
Nesse projeto não existe uma prova de conceito pois foi construído para uso interno da empresa, porém como todas as fontes de dados que foram utilizada são públicas e os  dados utilizados aqui são de exemplo. Um dia pretendo criar o meu próprio framework e disponibilizar ele em um projeto aberto.

## Referências

- [OWASP MASVS](https://mas.owasp.org/MASVS/)
- [OWASP MASTG](https://mas.owasp.org/MASTG/)
- [Snyk](https://snyk.io/blog/exploring-android-intent-based-security-vulnerabilities-google-play/)
