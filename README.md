# Trybe Futebol Clube Project

Esta é uma aplicação informativa sobre partidas e classificações de futebol!

## Descrição

Neste projeto, desenvolvemos uma API utilizando a metodologia TDD (Test-Driven Development) e integramos as aplicações por meio do docker-compose para que elas funcionem consumindo um banco de dados.

O back-end foi dockerizado e utiliza o Sequelize para modelagem de dados. A API pode ser consumida por um front-end.

Para adicionar uma partida, é necessário possuir um token de autenticação, o que requer que o usuário esteja logado para efetuar alterações. Existe um relacionamento entre as tabelas 'teams' e 'matches' para realizar as atualizações das partidas.

Foram implementadas regras de negócio no back-end para popular adequadamente a tabela disponível no front-end, que será exibida para o usuário do sistema.

## Tecnologias Utilizadas

Durante o desenvolvimento deste projeto, foram utilizadas as seguintes tecnologias:

- [Node.js](https://nodejs.org/): Plataforma JavaScript para construção de aplicações do lado do servidor.
- [Express](https://expressjs.com/): Framework web para Node.js utilizado na construção de APIs.
- [Programação Orientada a Objetos (POO)](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_orientada_a_objetos): Metodologia de programação que utiliza objetos para organizar o código.
- [TypeScript](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática e outros recursos.
- [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), [Sinon](https://sinonjs.org/): Ferramentas de teste para JavaScript e TypeScript.
- [Sequelize](https://sequelize.org/): ORM (Object-Relational Mapping) para Node.js, utilizado para interagir com bancos de dados relacionais.
- [MySQL](https://dev.mysql.com/): Sistema de gerenciamento de banco de dados relacional.
- [Docker](https://www.docker.com/): Plataforma para desenvolvimento, envio e execução de aplicações em containers.

Utilize os links acima para acessar as documentações oficiais de cada tecnologia e aprender mais sobre como utilizá-las em seus projetos.


## Estrutura do Projeto

O projeto é composto por 4 entidades principais, cada uma detalhada abaixo:

<details>
<summary>Banco de Dados</summary>

- Um container docker MySQL é configurado no docker-compose por meio do serviço denominado 'db'.
- Este container tem o papel de fornecer dados para o serviço de backend.
- Durante a execução dos testes, o banco de dados é acessado pelo Sequelize através da porta 3002 do localhost.
- É possível conectar ao banco de dados utilizando um Cliente MySQL (por exemplo: Workbench, Beekeeper, DBeaver) e inserindo as credenciais configuradas no docker-compose para o serviço 'db'.

</details>

<details>
<summary>Back-end</summary>

- O back-end é executado na porta 3001, uma vez que o front-end faz requisições a esta porta por padrão.
- A aplicação é inicializada a partir do arquivo 'app/backend/src/server.ts'.
- O Express é utilizado e a aplicação escuta na porta configurada nas variáveis de ambiente.
- Todas as dependências extras, como 'joi', 'cors', '@types/cors', estão listadas em 'app/backend/packages.npm'.

</details>

<details>
<summary>Front-end</summary>

- O front-end foi disponibilizado pela escola Trybe para permitir a integração com o back-end.

</details>

<details>
<summary>Docker</summary>

- O arquivo docker-compose é responsável por unir os serviços containerizados (backend, frontend e db).
- As Dockerfiles foram configuradas nas raízes do front-end e back-end para inicializar as aplicações.

</details>

## Pré-requisitos em sua máquina

Certifique-se de que sua máquina atenda aos seguintes requisitos:

- **Sistema Operacional**: Distribuição Unix
- **Node**: Versão 16. [Guia de Instalação](https://nodejs.org/en/download/)
- **Docker**: [Guia de Instalação](https://docs.docker.com/get-docker/)
- **Docker Compose**: Versão >=1.29.2. [Guia de Instalação](https://docs.docker.com/compose/install/)

## Iniciando o Projeto

Siga os passos abaixo para iniciar o projeto em sua máquina:

1. Clone o repositório utilizando o comando:
   
```bash
   git clone git@github.com:claytongom/trybe-futebol-clube-project.git
```
2. Instale as dependências utilizando o seguinte comando:

```bash
   npm install
```
3. Execute o projeto utilizando o comando:

```bash
   npm run compose:up
```

## Testes de Cobertura

Foram implementados testes de cobertura no back-end utilizando TypeScript, mocha, chai e sinon. Os testes estão localizados na pasta `app/backend/src/tests/`.

Para executar os testes de cobertura no back-end, siga os comandos abaixo:

- Para rodar os testes:

```bash
  npm run test
```
 - Para rodar os testes de cobertura:
```bash
  npm run test:coverage
```
Isso garantirá que o back-end do projeto seja testado e que você tenha informações sobre a cobertura dos testes realizados.

---

Desenvolvido por [Clayton Gomes](https://www.linkedin.com/in/claytongomesdev/), © 2023



