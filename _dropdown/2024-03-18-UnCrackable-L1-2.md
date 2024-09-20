---
layout: page
title: UnCrackable L1 Parte 2
description: UnCrackable L1 Parte 2
date: 2024-03-18 13:37:00 -0300
dropdown: Mobile
priority: 3
---


“Parte 2 continuação..."
<!--more-->

## JDWP - (system exit & flag)

primeiro passo é configurar o app em modo debug, quando se utiliza um device emulado esse processo pode ser feito mesmo sem realizar o patch do aplicativo. Mas se estiver utilizando um dispositivo físico, habilitar o modo debug é necessário e podemos fazer isso realizando o patch do APK.

### Patch AndroidManifest

Para realizar o patch do APK e deixar ele com o modo debug habilitado, basta adicionar a seguinte linha no **AndroidManifest.xml**: `android:debuggable="true"`

<p align="center">
<img src="/assets/img/uncrack-l1-5.png" width="400" height="600"/>
</p>
<br>

<mark>Depois desse processo é necessário compactar o APK novamente e assinar!</mark>

Uma vez que você alterou o aplicativo, assinou novamente e instalou, você deve ver uma tela parecida com esta.

<p align="center">
<img src="/assets/img/uncrack-l1-6.png" width="400" height="400"/>
</p>
<br>

Certo agora precisamos dizer para o nosso dispositivo que queremos debugar uma aplicação em específico.
O comando a seguir colocar o aplicativo em modo debug via linha de comando.

`adb shell am set-debug-app -w --persistent owasp.mstg.uncrackable1`

Para inicializar a aplicação via linha de comando, podemos executar o seguinte comando:

`adb shell am start -n owasp.mstg.uncrackable1/sg.vantagepoint.uncrackable1.MainActivity`

<p align="center">
<img src="/assets/img/uncrack-l1-7.png" width="400" height="400"/>
</p>
<br>

### Java Debugger

Agora que temos nosso APK em modo debug, podemos partir para o processo de conexão entre o APK e o nosso debuger.
Primeiro é preciso identificar o PID deste app para que possamos nos conectar via JDWP. 
Para identificar o PID do aplicativo que iremos debugar basta executar o seguinte comando:

`adb jdwp`

Este comando irá nos mostrar qual o PID do aplicativo em execução que está em modo debug. 


Outra maneira simples seria o `adb shell ps |grep owasp`, assim você vai ter o número do processo desse app.

>Você só será capaz de visualizar outros processos possíveis de serem "debugados" em dispositivo emulado, pois isso quebra algumas proteções do android por padrão. No celular fisíco mesmo com root é necessário realizar o patch do AndroidManifest para ter uma aplicação em modo debug.


É preciso fazer o encaminhamento entre o processo do aplicativo no device e o adb para que haja comunicação entre eles.
`adb forward tcp:1337 jdwp:<process ID>`

Agora é necessário fazer a conexão entre o app e o java debugger.

`{ echo "suspend"; cat; } | jdb -attach localhost:9999`

<p align="center">
<img src="/assets/img/uncrack-l1-8.png" width="600" height="800"/>
</p>
<br>

**Aqui que a mágica acontece, agora que de fato estamos debugando a aplicação e temos o controle da execução das variáveis que precisamos alterar.**

<br>
Primeiro criamos um breakpoint, lembra da função **setCancelable** que vimos no começo da análise, vamos utilizar essa função como breakpoint para que na hora em que o aplicativo executar o processo parar a aplicação no momento em que essa função for executada. Para conseguirmos visualizar e alterar os valores da variáveis locais e dar continuidade na aplicação, precisamos executar alguns comandos, tais como:

* `stop at android.app.Dialog.setCancelable` para definir um breakpoint.
* `resume` para resumir o fluxo da aplicação.
* `locals` para visualizar os valores das variáveis.
* `cont` para continuar o próximo passo do breakpoint.

Uma vez que o breakpoint foi atingido podemos olhar as variáveis locais e altera-las.
Por padrão da aplicação o valor da função **setCancelable** é igual a `false`, podemos altera-lo para `true` fazendo com que essa caixa de texto possa ser cancelada e assim alcançar o próximo fluxo da aplicação.

<p align="center">
<img src="/assets/img/uncrack-l1-9.png" width="600" height="800"/>
</p>
<br>

<mark>Esse processo precisa ser realizado quantas vezes forem necessárias para que você consiga realizar totalmente o bypass!</mark>

### Encontrando a flag

Agora para descobrir a flag podemos utilizar o método de comparação `java.lang.String.equals`, assim será possível atingir a hora em que a aplicação for comparar o que você digitou com a senha nesse caso a **flag**.

se utilizarmos o comando `monitor` podemos "automatizar" a execução de um comando pois esse comando será executado automaticamente.

Para encontrar a flag podemos executar os seguintes passos:

1. `stop at java.lang.String.equals`
2. `monitor cont`
3. `monitor locals`
4. `cont`


Após a execução dos comandos acima, você terá uma lista com todas as strings que passaram pela função de comparação.
Esse é um processo semi-automático que ainda necessita de alguma interação para obter os valores, mas isso já fornece um começo para que a base possa ser entendida e no futuro você automatize completamente este processo.

<div style="padding:46.88% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1011456274?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="uncrack-l1.mp4"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

## CyberChief - (flag)
Aqui seria a forma mais simples de se resolver esse crackme!

Basta apenas identificar no código o valor criptografado e a chave que foi utilizada para realizar esse processo.
Com essas duas informações conseguimos resgatar o valor original da flag, sem a necessidade de "hackear" o APK.

<p align="center">
<img src="/assets/img/uncrack-l1-10.png" width="600" height="800"/>
</p>
<br>

## Referências

* [1337 dcodx blog](https://1337.dcodx.com/research/owasp-mstg-crackme-1-writeup-android)
* [itendrapatro blog](https://blog.jitendrapatro.me/owasp-android-uncrackable-level-1/)
* [medium uncrackable L1](https://medium.com/@tksec/owasp-uncrackable-app-for-android-level-1-walkthrough-c43a00a16f59)
* [developers mews blog](https://developers.mews.com/cracking-uncrackable-android-apps-level-1/)
* [owasp uncrackable L1](https://mas.owasp.org/crackmes/Android/#android-uncrackable-l1)