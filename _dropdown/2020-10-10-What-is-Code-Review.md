---
layout: page
title: O que é?
description: O que é..
dropdown: Code Review
priority: 3
---


O que compõe um code review e suas diferenças...
<!--more-->

## Introdução

> Neste post vamos utilizar o termo "code review" somente com o foco em segurança!

Se você trabalha com segurança da informação, provavelmente já ouviu sobre esses termos:
_code review, pentest whitebox e SAST_.
Mas você realmente sabe a diferença entre eles?? <br>

Já conheci pessoas que chegaram a me dizer que eram a **mesma coisa**, que uma ferramenta SAST é o suficiente e que um pentest bem feito substitui qualquer outra metodologia. Então vamos desmitificar de uma vez por todas e explicar de fato todas as diferenças entre essas metodologias e provar por A+B que essas afirmações estão erradas!

### Code Review

No meu ponto de vista a palavra "code review" engloba os termos citados anteriormente, então se eu fosse fazer uma analogia ficaria algo mais ou menos assim:
```json
{
    Code Review = {
        "pentest whitebox",
        "análise manual de código fonte", 
        "SAST"
    }
}
```
Code review é o ato de analisar o código fonte de uma aplicação afim de encontrar vulnerabilidades, fragilidades e a validação de boas práticas no que remete-se a codificação segura. Podendo ser feita uma analise manual, testes automatizados ou até mesmo a junção dos dois.<br> 

Devemos nos atentar que existem diferenças quando utilizamos o termo "code review", pois no mundo dos desenvolvedores este termo técnico está relacionado a verificação de performance, melhores práticas, código limpo, etc. Dependendo do revisor pode-se apontar falhas de segurança, mas isso não é o principal foco e normalmente as falhas estão relacionadas a lógica da aplicação que pode levar a uma fraude por exemplo.

* **Vulnerabilidade**:
    * É quando de fato encontramos alguma função, método ou classe que está diretamente ligado a uma vulnerabilidade. Algo que de fato exponha sua aplicação à algum tipo de ataque. Por exemplo:(XSS, SQLi, XXE, RCE, etc..)

* **Fragilidade**:
    * Não representa diretamente uma vulnerabilidade, mas um conjunto de fragilidades podem ser utilizadas para criar uma vulnerabilidade, normalmente validações fracas, erros de comparação, known bad (vulgo blacklist)

* **Boas práticas**:
    * Aqui estamos falando não das boas práticas em si, mas sim da falta dela.
    Senhas chumbadas no código, comentários contendo informações sensíveis, por exemplo: em HTML ou javascript que permita que alguém mesmo que não detenha o código fonte consiga ter ideia da regra de negócio ou como é o fluxo de sua aplicação.

#### Foco

Um code review aborda todos os quesitos de segurança de uma aplicação,<br> 
e está dividido em 7 áreas que são elas:

* Autenticação
* Autorização
* Gerenciamento de sessão
* Validação de dados
* Manipulação de erros
* Logs
* Criptografia


### SAST (Static Application Security Testing)

Quando estamos utilizando este termo, a primeira coisa que vem na nossa cabeça é algum tipo de ferramenta que realiza a análise de um código fonte de uma aplicação de forma automática.
E normalmente está integrada no CI/CD (continuos integration, continuos development).<br>

A principal ideia do SAST é automatizar o trabalho de um analista de revisar centenas de milhares de linhas de código, fazendo com que esse trabalho seja facilitado por uma ferramenta. Porém sabemos que nada é tão perfeito assim... <br>

As ferramentas de análise de código possuem algumas fraquezas, não conseguem entender sua regra de negócio, possuem um número alto de falsos positivos, precisam ter um suporte para diversas linguagens, constante manutenção, etc.<br> 
Fazendo com que o analista não fique isento de ter que trabalhar tendo uma ferramenta dessas rodando em seu pipeline. Elas são essenciais para um SSDLC (Security Software Development Lifecycle). Mas já percebemos que sozinhas não fazem milagres.


## Pentest Whitebox

No meu ponto de vista é a mistura de um code review + validação ou seja, o(a) pentester vai ter acesso ao código fonte da aplicação e ao mesmo tempo um ambiente rodando, seja localmente ou não. Então quando é identificada uma potencial vulnerabilidade em alguma função nós podemos validar esse possível finding de algumas maneiras por exemplo: <br>

Você está realizando um pentest whitebox, então resolveu executar uma ferramenta que realiza um fuzzing na aplicação.<br>

Enquanto está rolando um fuzzing com alguns payloads cabulosos, vamos supor que a aplicação quebre em algum ponto específico.<br>

Você pode verificar na sua IDE (Integrated Development Environment) debugando o código e verificando os valores das variáveis. Podendo encontrar um possível bypass para uma determinada proteção que foi construída para aquela função que você conseguiu quebrar através de um input.


### Conclusão

Apesar de todas as três metodologias terem suas vantagens e desvantagens uma completa a outra. E quando estamos falando de manter uma aplicação segura o ideal é que se implemente todas, para garantir uma maior segurança.<br>
Dificultando um possível ataque a sua aplicação.<br>

Mas isso não significa que sua aplicação estará totalmente protegida,<br> 
lembre-se nenhum sistema é 100% seguro, vulnerabilidades surgem todos os dias em aplicativos, frameworks, bibliotecas, então mantenha suas análises de segurança em dia identificando e corrigindo o máximo possível antes que outra pessoa faça isso.


#### Referências

[Mitre](https://www.mitre.org/publications/systems-engineering-guide/enterprise-engineering/systems-engineering-for-mission-assurance/secure-code-review)<br>
[OWASP](https://owasp.org/www-community/controls/Static_Code_Analysis)<br>
[OWASP code review guide](https://owasp.org/www-pdf-archive/OWASP_Code_Review_Guide_v2.pdf)<br>