---
layout: page
title: UnCrackable L1 Parte 1
date: 2024-01-14 13:37:00 -0300
categories: blog
---


“1 desafio 1001 maneiras de ser resolvido..."
<!--more-->

## O que é?
Segundo a própria [OWASP](https://mas.owasp.org/crackmes/), esse é um de uma série de desafios envolvendo mobile.
E que podem ser resolvidos utilizando o [MASTG](https://mas.owasp.org/MASTG/).<br>

<div class="alert alert-info" role="alert">
Vamos explorar algumas formas de resolver esse desafio!
</div>


## Introdução

>Esse desafio é o primeiro de uma série de aplicações mobile
que irei demonstrar como explorar.
>Apesar desse tipo de aplicação nunca ter sido meu maior motivador,
>estou bem facinado em como esse sistema faz você subverter todo seu pensamento
onde antes você tinha que atacar um backend no qual você "teoricamente" não tem acesso.
>E agora todo código está embutido em um dispositivo onde você tem total acesso.



## Engenharia Reversa (Rev)
Assim que o App é executado, é exibido um poupup de erro dizendo que 
o aparelho está Rootado e com isso não pode executar a aplicação!

<p align="center">
<img src="/assets/img/uncrack-l1-1.png" width="200" height="300"/>
</p>
<br>
Dito isso, o primeiro passo é fazer o Rev da aplicação e entender
como essa proteção está sendo feita. Utilizando o `jadx-gui` abra o 
arquivo **AndroidManifest.xml**

Como essa é uma aplicação simples para testes, esse XML é bem pequeno e fácil de ser interpretado.
Esse arquivo contém as principais informações do aplicativo, como nome, versão, algumas configurações e o LAUNCHER.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android" android:versionCode="1" android:versionName="1.0" package="owasp.mstg.uncrackable1">
    <uses-sdk android:minSdkVersion="19" android:targetSdkVersion="28"/>
    <application android:theme="@style/AppTheme" android:label="@string/app_name" android:icon="@mipmap/ic_launcher" android:allowBackup="true">
        <activity android:label="@string/app_name" android:name="sg.vantagepoint.uncrackable1.MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
    </application>
</manifest>
```
No AndroidManifest a action.MAIN e o category.LAUNCHER dentro da tag `<application>` diz para o App qual é a classe que vai inicializar o aplicativo.
Neste caso o XML está dizendo que o `sg.vantagepoint.uncrackable1.MainActivity` é a primeira classe que será
chamada no App e isso pode nos dar um bom rumo de por onde começar uma análise.

## Patch - (system exit & anti root)
Nesse processo de exploração, iremos realizar dois tipos diferentes de bypass.

O primeiro será fazendo o patch diretamente no código smali para que a aplicação
não consiga forçar o fechamento do App. Para entender melhor como essa proteção 
funciona, iremos olhar a comparação entre Java e smali no `jadx-gui`

<p align="center">
<img src="/assets/img/uncrack-l1-2.png"/>
</p>
<br>

É nesse trecho de código que o App nos retorna a mensagem de erro avisando que 
não podemos executar a aplicação. Porém é na linha 25 do código java que é setado como `false`
o cancelamento daquele alerta. Então se modificarmos para `true` podemos simplesmente ignorar o 
alerta e continuar no App.


Decompile o APK usando: 
- `apktool d UnCrackable-Level1.apk` 

Em seguida abra com o editor: 
- `vim UnCrackable-Level1/smali/sg/vantagepoint/uncrackable1/MainActivity.smali`

<p align="center">
<img src="/assets/img/uncrack-l1-3.png"/>
</p>
<br>
Foi alterada a linha 41 do código de `0x0` que significa **false** para `0x1` que significa **true**.
<br>

### Anti Root
Para fazer com que a aplicação não detecte que estamos utilizando um dispositivo com root, podemos realizar as alterações também diretamente no código para evitar que o APK consiga detectar e nos bloquear.

Se alterarmos as strings para coisas inexistentes a condição sempre retornará `false`.

<p align="center">
<img src="/assets/img/uncrack-l1-11.png"/>
</p>
<br>

Agora basta compilar novamente e assinar o App e testar o bypass.

<br>
<p align="center">
<img src="/assets/img/uncrack-l1-4.png"/>
</p>
<br>

Nesse exemplo o `uber-apk-signer` já faz todo o trabalho de forma automatizada, porém
em um próximo post eu mostro um pouco mais dos conceitos básicos e o que realmente
acontece por trás desse programinha.

Agora devemos ter um novo APK chamado: `UnCrackable-Level1-patched-aligned-debugSigned.apk`
basta instalar e ver a mágica acontecer. 

<br>

## Frida - (system exit & anti-root & flag)
Aqui vai a exploração com o frida...

**Bypass do System.exit:** <br>
Assim a aplicação não consegue fechar o app mesmo detectando o root.

```javascript
console.log("Script loaded successfully ");
Java.perform(function (){

	var system = Java.use("java.lang.System");
	system.exit.implementation = function(){
		send("System exit bypassed!");
	}
});
```

**Bypass Root check:** <br>
Agora a aplicação não identifica nosso dispositivo com o binário `su`, não irá identificar a aplicação como `debuggable` e nem vai conseguir validar se o alguns caminhos padrões de binários utilizados por celulares rootados.

```javascript
console.log("Script loaded successfully ");
Java.perform(function (){

	var root = Java.use("sg.vantagepoint.a.c");
	root.a.overload().implementation = function(){
		console.log("Su check bypass!");
		return false;
	}

	var tags = Java.use("sg.vantagepoint.a.c");
	tags.b.overload().implementation = function(){
		console.log("Build tags bypass!");
		return false;
	}

	var path = Java.use("sg.vantagepoint.a.c");
	path.c.overload().implementation = function(){
		console.log("BYpass path validation!");
		return false;
	}
});
```
**Bypass Flag:** <br>
No mesmo script vamos chamar a função que retorna a flag utilizando a própria função de decript do código.

```javascript
console.log("Script loaded successfully ");
Java.perform(function (){
	//Cracking the flag

	var key = Java.use("sg.vantagepoint.uncrackable1.a");
	var cipher = Java.use("sg.vantagepoint.a.a");

	var b64_func = Java.use("android.util.Base64");
	key = key.b("8d127684cbc37c17616d806cf50473cc")
	var secret = b64_func.decode("5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc=", 0)

	var flag = cipher.a(key, secret)
	console.log("inside crypto func");
	var result = "";
	console.log(flag);

	for (var i=0; i<flag.length; ++i){
	  result+= (String.fromCharCode(flag[i]));
	}

	console.log(result);
});
```
Esse é o resultado após a execução do script mostrado acima. 

<p align="center">
<img src="/assets/img/uncrack-l1-12.png" width="800" height="800"/>
</p>
<br>

>Em breve teremos um blog post sobre o `frida`.

<br>

[Parte 2 continuação...](../../../2024/03/18/UnCrackable-L1-2.html)
