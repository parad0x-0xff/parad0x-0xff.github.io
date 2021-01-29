---
layout: page
title: Estratégias
description: Code Review
dropdown: Code Review
priority: 3
---


Diferentes tipos e diversas metodologias...
<!--more-->



## Metodologias

Ao realizar uma análise de código, precisamos conhecer as metodologias para saber qual melhor se adapta ao nosso cenário. Abaixo temos uma lista das metodologias que podemos utilizar.

* Bug baseado em grep.
* Seguir o input do usuário.
* Revisar o código de forma aleatória.
* Analisar o código inteiro.
* Validar uma funcionalidade por vez.


## Bug baseado em grep

Esse é o método mais rápido, quando estamos falando dos **"low-hanging fruits"**, termo em inglês utilizado para a definição de algo fácil de se obter ou seja vulnerabilidades fáceis de serem encontradas por terem algum tipo de padrão. 
Essa abordagem tenta encontrar por padrões de vulnerabilidades conhecidas, por exemplo:

- `grep -Ri "shell_exec(" . --color`
- `grep -Ri "system(" . --color`
- `grep -Ri "exec(" . --color`

Porém, essa metodologia sofre de algumas limitações, por exemplo:

* Você não consegue obter muita cobertura e/ou garantia de qualidade e consequentemente segurança do código fonte. Você apenas sabe que com base em sua lista de padrões foi ou não possível encontrar vulnerabilidades.

* Você precisaria conhecer todas as funções e/ou padrões perigosos que podem levar à alguma vulnerabilidade.

* Você acaba utilizando expressões regulares muito complexas.

Procurar bugs baseado em grep funciona bem quando existe um prazo limitado de tempo, no qual você não tem tempo o suficiente para realizar uma análise mais profunda. Portanto quando o assunto é garantir a segurança de um código fonte, entender suas funcionalidades e ter uma boa cobertura de análise, o Grep se torna uma das **piores alternativas**.


## Seguindo o input do usuário

Outra maneira de se revisar código é seguindo todos os inputs da aplicação que são controlados pelo usuário e encontrar todas as maneiras de acessar a aplicação. Esse método também é conhecido como "Top to bottom".
Para começar você precisa encontrar todas as maneiras de enviar dados para a aplicação, por exemplo em PHP:

* $_POST 
* $_GET 
* $_REQUEST
* $_COOKIE  
* $_SERVER


Este método oferece uma boa cobertura do código fonte. Porém, você precisa ter um bom entendimento da estrutura da linguagem utilizada, como: conseguir identificar rotas, URIs, arquivos de configuração e tudo mais que estiver relacionado ao input do usuário.


## Revisando o código de forma aleatória

No primeiro momento parece uma forma meio burra de análisar código, né?<br>
Mas então eu vou te provar que pode ser muito interessante... Essa metodologia também é conhecida como "bottom to top" e nela você procura por funções que você acredita que possam causar alguma vulnerabilidade, então você faz o processo inverso e a partir dessa função você tenta identificar se é possível controlar os dados que passam por ela até chegar no topo por assim dizer.


Essa metodologia também possui uma cobertura muito boa, porém somente das funções que você seguiu o fluxo.


## Analisando o código inteiro

Esse com certeza é o método que vai lhe custar mais tempo!!!<br>
Mas para executar essa metodologia o ideal é que você vá com o pensamento de encontrar fraquezas na aplicação e não necessáriamente vulnerabilidades. A revisão do código inteiro de forma linear, não lhe dará ideia de quem se comunica com quem e como é o fluxo da aplicação. Mas sim de encontrar fraquezas que podem levar a uma vulnerabilidade. Esse tipo de abordagem cai bem quando você faz parte de um time interno e precisa realizar a análise de código, fazendo com que seu código tenha uma série de melhorias de segurança.

Sua cobertura de código é total, porém como já foi dito o tempo tem que ser o seu aliado se escolher utilizar essa abordagem!


## Validando um funcionalidade por vez


Uma outra maneira bem comum de se revisar um código é pegando um tipo de funcionalidade específica e testando uma por vez.
Por exemplo:

* Autenticação
* Reset de senha
* Upload de arquivos

Assim você se concentra em revisar todo o código relacionado a aquela funcionalidade da aplicação.
Uma das vantagens de se revisar por funcionalidade é se você estiver analisando diversas aplicações, por exemplo:

>A empresa XYZ, possui diversos produtos cada produto foi construido por uma squad diferente. Entretanto todos possuem uma funcionalidade em comum, como "reset de senha".
Então após a análise da primeira aplicação, você poderá comparar com as outras e verificar o que elas possuem em comum e o que possuem de diferente.

Essa abordagem oferece uma ótima cobertura de código para as funções analisadas e lhe ensinará alguns error geralmente cometidos quando as pessoas estão implementando uma funcionalidade específica.<br> 
Porém isso vale somente para o que você revisou.


## Conclusão

O mais importante aqui não é tentar identificar a melhor metodologia de code review, todas possuem seus pontos fortes e fracos.<br> 
O verdadeiro segredo aqui é você conhecer as metodologias, suas diferenças e não sair analisando código sem saber ao certo o que está fazendo.<br> 

Entender qual dessas abordagens pode ser melhor para o seu cenário é muito importante pois, assim poderá diversificar entre a utilização de cada uma. Sendo capaz de adaptar no seu cenário e consequentemente ter uma melhor cobertura de código e maior garantia de segurança. 

Por hoje é só pessoal!!<br>

![](https://media.giphy.com/media/APHFMUIaTnLIA/giphy.gif)

#### Referências

[PentesterLab](https://pentesterlab.com/badges/codereview)