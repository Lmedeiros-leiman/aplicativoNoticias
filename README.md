# Aplicativo de Noticias

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

O projeto utiliza os servidores do google para executar uma função salva na pasta **functions** na pasta raiz, sendo esta executada a cada hora todos os dias pegando partes do arquivo HTML e salvando os dados no banco de dados na nuvem. 

os dados então são puxados pelo applicativo React na pasta **fronteendapp** e então mostrados para o usuário, caso o usuário mantenha a aba aberta e a função seja executada o conteudo irá ser atualizado o mais rápido possivel, isto pode a vir causar frustações por não haver um aviso prévio.

Imagem do aplicativo em uso:
![Imagem do app em usi](image.png)

## Busca criar um fork?

o aplicativo é relativamente facil de ser copiado: basta criar uma conta e um projeto no site do [firebase](https://firebase.google.com).

após isto basta instalar as dependencias de console do firebase e colocar as funções na pasta **functions** no servidor com o comando :
> firebase deploy

 não esqueça de colocar as credenciais do projeto ao qual o banco de dados esta subordinado na variavel de configuração dento do arquivo
 > fronteendapp /src /App.js -> firebaseConfig
