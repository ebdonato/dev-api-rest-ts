# O Desafio

No contexto dos meios de pagamento, o desafio é construir uma API Restful para gestão de contas.

Mais detalhes no repositório [cdt-baas/desafio-dev-api-rest](https://github.com/cdt-baas/desafio-dev-api-rest).

## A Solução

A solução é baseada no framework [Express](https://expressjs.com/pt-br/) para a interface web, e no Mapeamento Objeto Relacional (ORM) [Knex.js](https://knexjs.org/) para construção do banco de dados e de suas consultas.

Para organização dos arquivos/scripts, é utilizado o [Consign](https://github.com/jarradseers/consign).

## Manual de Execução

A aplicação utiliza duas soluções de banco de dados dependendo do valor da variável de ambiente **NODE_ENV**.

Caso a variável seja definida como _development_ (padrão), o banco de dados utilizado será SQLite, caso seja definido como _production_, o banco de dados utilizado será Postgres.

No modo _development_, para executar a aplicação baste executar o _script_ **NPM** **_dev_**, que o arquivo do SQLite será criado.

> npm run dev

No modo _production_, além de ajustar a variável **NODE_ENV** e necessário ajustar também a variável **PG_CONNECTION_STRING** com as configurações de conexão ao banco de dados Postgres.

Por exemplo:

```env
NODE_ENV=production
PG_CONNECTION_STRING=postgres://postgres:123456@localhost:5432/banco
```

> As variáveis de ambiente podem ser definidas em um arquivo **.env** no diretório raiz.

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
