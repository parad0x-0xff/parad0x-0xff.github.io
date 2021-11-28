---
layout: page
title: Docker Code Analyzer
description: Docker Code Analyzer
dropdown: Code Review
priority: 3
---


“Analizando códigos via docker..."
<!--more-->

## DCA - Docker Code Analyzer

>Por muito tempo, estou enfrentando um problema ao fazer revisão de código e toda vez que eu queria depurar uma aplicação, era complicado. Então decidi criar DCA.
>
>A principal vantagem é que cada Dockerfile é configurado para se conectar remotamente no VSCode. Portanto, não preciso mais me preocupar em configurar um ambiente para depuração.


## Arquitetura

<img src="/assets/img/DCA.png">
<br>

Esta é a arquitetura inicial pensada para o projeto onde a principal ideia é ter vários contêiners já pré configurados com o modo debug habilitado para facilitar este processo.

Para isso vou criar um post para cada linguagem, explicando o passo a passo da configuração.

## Linguagens disponíveis

* [PHP](/dropdown/2021-11-26-DCA-php.html)