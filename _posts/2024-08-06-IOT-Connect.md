---
layout: page
title: IOT Connect
date: 2024-08-06 13:37:00 -0300
categories: blog
---


“Insecure IOT?..."
<!--more-->

## Introdução
Esta é uma resolução do desafio do [Mobile Hacking Lab](https://www.mobilehackinglab.com/home)  
onde descobri recentemente que eles estão oferecendo treinamento e laboratórios gratuitos para explorar e praticar suas habilidades de hacking mobile.
Então, decidi fazer o curso e praticar os laboratórios.

## Visão geral
Ao ler a página do desafio **IOT Connect**, há uma descrição bem detalhada do objetivo e das habilidades necessárias.
Segundo o site:

**Objetivo**
>Explorar uma vulnerabilidade do _bradcast Receiver_: 
>Sua missão é manipular a funcionalidade do _broadcast receiver_ no aplicativo Android "IOT Connect", 
>permitindo que você ative o interruptor principal e controle todos os dispositivos conectados. 
>O desafio é enviar um comando de uma forma onde não é possível ser alcançada pelo usuário _guest_.

**Habilidades necessárias**

- Conhecimento básico do desenvolvimento do Android.
- Compreensão das implicações de segurança dos _broadcast receivers_.
- Técnicas de engenharia reversa para analisar e entender o código do aplicativo.

*** 
<div class="alert alert-danger" role="alert">
  <strong>Spoiler Alert</strong> Se você pretende tentar o lab sozinho leia com sabedoria.
</div>
*** 

## Analise Broadcast

O primeiro passo foi abrir o app e entender as suas funcionalidades, iniciei a aplicação, criei um usuário e fiz o login. Quando tentei um PIN qualquer na tela de MasterSwitch, apareceu a seguinte mensagem: _"The master switch can't be controlled by guests"_. Depois de entender que haviam restrições em alguns comandos para os usuários _guests_ eu decompilei o app e comecei os trabalhos de engenharia reversa para obter mais informações do aplicativo.  

  
Utilizando o `jadx-gui`, comecei olhando o ponto de entrada da aplicação, que é o arquivo **AndroidManifest.xml**. Após uma breve análise notei que o broadcast receiver está com a opção `exported="true"`  

<p align="center">
<img src="/assets/img/MHL_Receiver_exported.png" width="600" height="600"/>
</p>
<br>
  
Após procurar pelo nome "MasterReceiver" que é o nome desse componente, encontrei ele declarado dentro da classe "CommunicationManager".  

<p align="center">
<img src="/assets/img/MHL_MasterReceiver.png" width="800" height="800"/>
</p>
<br>
  
Após abrir o código dessa classe, notei que essa aplicação não possui nenhum tipo de ofuscação. Após olhar o trecho de código a seguir.

<p align="center">
<img src="/assets/img/MHL_BroadcastReceiver.png" width="600" height="600"/>
</p>
<br>

## Analise Intent

**Descobri as seguintes coisas:**

- A action "**MASTER_ON**" tem uma string extra chamada **_"key"_** que é o PIN da tela Master Switch;

- O código verifica o valor **_"key"_** em um pacote a parte com um segredo chumbado dentro da aplicação;

- Se o PIN estiver correto, a aplicação irá ligar todos os dispositivos e a mensagem de sucesso será exibida;

- Caso contrário, aparecerá a mensagem **_"Wrong PIN!!"_**.  

<br>

Sabendo dessas informações, utilizei o comando `adb` para tentar criar o meu payload e enviar o valor da chave utilizando a _"action"_ da intent "MASTER_ON"  

<p align="center">
<img src="/assets/img/MHL_wrong_pin.png" width="600" height="600"/>
</p>
<br>

Como demonstrado na imagem a aplicação devolve sempre a mensagem **_"Wrong PIN!!"_** independente do valor que eu enviar.
  
A princípio pensei em fazer um ataque de força bruta, mas enquanto a aplicação estiver a mostrando a primeira mensagem, é necessário esperar ela desaparecer para que a próxima possa ser exibida.
Assim acaba ficando bem demorado o processo de força bruta. 

Dando sequência a análise de código percebi que a aplicação realiza o `log` da mensagem: **_"All devices are turned on"_**

<p align="center">
<img src="/assets/img/MHL_iot_logging.png" width="600" height="600"/>
</p>
<br>
  

Então, decidi criar um shell script para automatizar este processo.

## Exploit

A ideia era enviar um broadcast com um valor do PIN num For Loop e enquanto meu script lê os registos de log do app para que uma vez que a mensagem desejada fosse logada isso significaria que o meu PIN estaria correto independente da mensagem que estivesse na tela.
  
  
O shell script fará o trabalho duro e tentará todas as combinações, já que o aplicativo nos diz que o PIN são 3 dígitos. 

<p align="center">
<img src="/assets/img/MHL_brute_iotconnect_sh.png" width="600" height="600"/>
</p>
<br>
  
Depois de executar o script e ter o valor correto, para confirmar o PIN eu fiz o comando: `adb shell am broadcast -a MASTER_ON --ei key 345`

Abaixo eu deixei um vídeo da PoC para a demonstração dessa execução!

## Video

<div style="padding:55.77% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1011446067?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="MHL_iotconnect"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>


## Referências

- [IOT Lab](https://www.mobilehackinglab.com/course/lab-iot-connect)
- [ADB commands](https://medium.com/@android-world/adb-intents-navigating-androids-communication-channels-89f5e89b8f73)
- [Curso Mobile Hacking Lab](https://www.mobilehackinglab.com/course/free-android-application-security-course)