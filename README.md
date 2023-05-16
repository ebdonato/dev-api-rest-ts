# O Desafio

No contexto dos meios de pagamento, o desafio é construir uma API Restful para gestão de contas.

Mais detalhes no repositório [cdt-baas/desafio-dev-api-rest](https://github.com/cdt-baas/desafio-dev-api-rest).

## A Solução

A solução é baseada no framework [Express](https://expressjs.com/pt-br/) para a interface web, e no Mapeamento Objeto Relacional (ORM) [Knex.js](https://knexjs.org/) para construção do banco de dados e de suas consultas.

Para organização dos arquivos/scripts, é utilizado o [Consign](https://github.com/jarradseers/consign).

A aplicação está escrita em Typescript.

## Manual de Execução

A aplicação utiliza como solução de banco de dados o PostgreSQL, onde a conexão é configurada através de uma variável de ambiente, cujo valor padrão é:

```env
PG_CONNECTION_STRING=postgres://postgres:123456@localhost:5432/banco
```

> As variáveis de ambiente podem ser definidas em um arquivo **.env** no diretório raiz.

Para executar a aplicação com _hot reload_, utilize o seguinte comando:

> npm run dev

Para executar a aplicação com código Javascript, é necessário realizar o _build_ primeiro, com o seguinte comando:

> npm run build

A saída, em JS, estará no diretório `./dist`. Para rodar esse código gerado, utilize o seguinte comando:

> npm start

Por padrão, a aplicação escuta novas requisições na porta 3000, que também pode ser definido através de variável de ambiente.

## Desenvolvimento

### Migrações

Para criar um arquivo de migração, utilize o seguinte comando:

`npx knex migrate:make MIGRATION_NAME -x ts --knexfile ./src/knexfile.ts`

Onde `MIGRATION_NAME` é o nome da migração

> No dois caos, _development_ ou _production_, a aplicação irá realizar as migrações no banco de dados para criá-lo, conforme scripts descritos no diretório _./src/migrations_.

### Seed

Para criar um arquivo de migração, utilize o seguinte comando:

`npx knex seed:make SEED_NAME`

Onde `SEED_NAME` é o nome do arquivo seed

## Criando um container para o Banco de Dados (Postgres)

```shell
docker run --name some-postgres -e POSTGRES_PASSWORD=123456 -e POSTGRES_USER=postgres -e POSTGRES_DB=banco -p 5432:5432 -d postgres:13
```

Onde `some-postgres` é o nome do container.
