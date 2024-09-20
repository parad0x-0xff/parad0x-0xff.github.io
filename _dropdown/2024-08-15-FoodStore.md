---
layout: page
title: Food Store
description: Food Store
date: 2024-08-15 13:37:00 -0300
dropdown: Mobile
priority: 3
---


“Food Store 😋..."
<!--more-->

# Introdução
Esta é uma resolução do desafio do [Mobile Hacking Lab](https://www.mobilehackinglab.com/home)  
onde descobri recentemente que eles estão oferecendo treinamento e laboratórios gratuitos para explorar e praticar suas habilidades de hacking mobile. Então, decidi fazer o curso e praticar os laboratórios.

## Objetivo

>Explorar uma vulnerabilidade de _SQL injection_, 
que permita que você se registre como um usuário PRO, ignorando as restrições de usuário padrão.

*** 
<div class="alert alert-danger" role="alert">
  <strong>Spoiler Alert</strong> Se você pretende tentar o lab sozinho leia com sabedoria.
</div>
*** 

## Writeup

Quando iniciei o aplicativo, criei um usuário e depois fiz login. 
Notei que meu usuário tinha 100 créditos e foi classificado como um usuário comum.

Primeiro, comecei a fazer engenharia reversa e abri o aplicativo usando o `jadx-gui`.

**AndroidManifest.xml**
```xml
<activity  
	android:name="com.mobilehackinglab.foodstore.Signup"  
	android:exported="false"/>  
<activity  
	android:name="com.mobilehackinglab.foodstore.MainActivity"  
	android:exported="true"/>  
<activity  
	android:name="com.mobilehackinglab.foodstore.LoginActivity"  
	android:exported="true">  
	<intent-filter>  
		<action android:name="android.intent.action.MAIN"/>  
		<category android:name="android.intent.category.LAUNCHER"/>  
	</intent-filter>  
</activity>
```

Não havia muito o que ver no arquivo _AndroidManifest.xml_ - apenas três activities, e somente duas delas estavam exportadas.

O objetivo desse desafio é claro: **registrar-se como um usuário PRO**. Então, comecei examinando o processo _singup_ para entender melhor como funciona o registro de usuários.

<p align="center">
<img src="/assets/img/MHL_foodStore_1.png" width="600" height="600"/>
</p>
<br>


Percebi que o método `addUser` na classe `dbHelper` passa um objeto `newUser` como argumento, então decidi investigar como o usuário está sendo criado.

Aqui está o trecho de código `addUser`:

```java
public final void addUser(User user) {  
	Intrinsics.checkNotNullParameter(user, "user");  
	SQLiteDatabase db = getWritableDatabase();  
	byte[] bytes = user.getPassword().getBytes(Charsets.UTF_8);  
	Intrinsics.checkNotNullExpressionValue(bytes, "this as java.lang.String).getBytes(charset)");  
	String encodedPassword = Base64.encodeToString(bytes, 0);  
	String Username = user.getUsername();  
	byte[] bytes2 = user.getAddress().getBytes(Charsets.UTF_8);  
	Intrinsics.checkNotNullExpressionValue(bytes2, "this as java.lang.String).getBytes(charset)");  
	String encodedAddress = Base64.encodeToString(bytes2, 0);  
	String sql = "INSERT INTO users (username, password, address, isPRO) VALUES ('" + Username + "', '" + encodedPassword + "', '" + encodedAddress + "', 0)";  
	db.execSQL(sql);  
	db.close();  
}
```

As variáveis `Username`, `encodedPassword` e `encodedAddress` estão concatenadas. Esse é um exemplo claro de _SQL injection_.

**Coisas importantes a serem mencionadas:**

- O único valor que pode ser controlado é o nome de usuário, pois essa variável não é codificada em base64.
- O último valor, `0`, está chumbado para indicar se o usuário é um usuário PRO ou não.

### Payload

Durante a criação do payload, monitorei o `logcat` em busca de mensagens de erro SQL. Como o aplicativo está definido como `debuggable=“true”`, ele fornece informações mais detalhadas nos registros de log.

Quando tentei criar um usuário chamado **SuperUser** e adicionei uma aspa simples, recebi uma mensagem de erro nos logs.

<p align="center">
<img src="/assets/img/MHL_foodStore_2.png" width="600" height="600"/>
</p>
<br>

Agora que entendi como a consulta está sendo construída, só preciso recriá-la para me registrar como um usuário PRO.

Para explicar melhor, aqui está uma comparação entre a consulta SQL e meu payload:

A consulta: 
`VALUES ('“ + Username + ‘’, ‘” + encodedPassword + “’, ‘” + encodedAddress + “’, 0);`

Meu payload: 
`VALUES ('parad0x', 'MTIz', 'YWJj', '1'); --`

Simplesmente adicionei uma aspa simples para fechar o campo de nome de usuário, incluí os valores codificados em base64 para a senha e o endereço, alterei o valor final de `0` para `1` para tornar o usuário um PRO e, em seguida, fechei a consulta e adicionei `--` para comentar o restante da consulta original.

<p align="center">
<img src="/assets/img/MHL_foodStore_3.png" width="400" height="400"/>
</p>
<br>


Meu usuário agora é PRO.
<p align="center">
<img src="/assets/img/MHL_foodStore_4.png" width="400" height="400"/>
</p>
<br>

## Bonus


Durante a engenharia reversa, também encontrei uma maneira de obter mais créditos e ter um usuário PRO “temporário” usando a _Intent_ declarada dentro da _LoginActivity_ e enviando os valores extras por meio do ADB.

<p align="center">
<img src="/assets/img/MHL_foodStore_5.png" width="600" height="600"/>
</p>
<br>


Abaixo eu deixei um vídeo da PoC para a demonstração dessa execução!

<div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1011451411?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="FoodStore_xpl"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>


## Referências

- [Food Store Lab](https://www.mobilehackinglab.com/course/lab-food-store)
- [ADB commands](https://techblogs.42gears.com/list-of-all-widely-used-adb-commands/)
- [Curso Mobile Hacking Lab](https://www.mobilehackinglab.com/course/free-android-application-security-course)