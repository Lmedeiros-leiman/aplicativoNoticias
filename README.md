# Aplicativo de Noticias

>Este projeto possui uma [versão online, verifique!](https://lmedeiros-leiman.github.io/aplicativoNoticias/)

Esse projeto foi criado utilizando [React](https://github.com/facebook/create-react-app).
Este projeto utiliza as seguintes dependencias:
> - Firebase CLI e Firebase-React-Hooks
> - Bootstrap
> - gh-pages
> - puppeteer (**Versão: 18.2.1** [versão mais atual apresentava problema de compatibilidade com o Firebase.] )

Atualmente o aplicativo busca noticias dos seguites websites:
> - G1
> - Correio do Povo

## Sobre o projeto
o modelo de visualização poderá ser atualizado no futuro.

O projeto utiliza os servidores do google para executar uma função salva na pasta **functions** na pasta raiz, sendo esta executada a cada hora todos os dias pegando partes do arquivo HTML e salvando os dados no banco de dados na nuvem. 

os dados então são puxados pelo applicativo React na pasta **fronteendapp** e então mostrados para o usuário, caso o usuário mantenha a aba aberta e a função seja executada o conteudo irá ser atualizado o mais rápido possivel, isto pode a vir causar frustações por não haver um aviso prévio.

Imagem do aplicativo em uso:
![Imagem do App em uso](https://github.com/Lmedeiros-leiman/aplicativoNoticias/assets/57924586/f26d62bf-e228-42e1-b9ee-52b192e17d5e)

## Como colocar no ar a sua própria versão?

o aplicativo é relativamente facil de ser copiado: basta criar uma conta e um projeto no site do [firebase](https://firebase.google.com).

em uma pasta no computador, inicie o seu cmd ou terminal e utilize os seguintes  comandos:
> git clone https://github.com/Lmedeiros-leiman/aplicativoNoticias/tree/main

no seu computador vamos precisas instalar os comandos de terminal do firebase para enviar o código para lá, para isso utilizamos o NPM.
> npm install firebase-cli-tools
> firebase deploy

ele irá pedir para logar na sua conta, para ganrantir que não é um estranho.

### não esqueça de:

> permitir firestore no seu projeto.
>
> colocar as suas crendenciais de projeto para o frontend poder buscar os dados.
>  >  fronteendapp /src /App.js -> firebaseConfig
>
