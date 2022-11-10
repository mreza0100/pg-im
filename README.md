# PG index manager

### Pg-index manager is a cli tool that monitor your postgres and manage your indexes.

#### Futures Plans:

- Detect heavy used queries and index them.
- Detect unused indexs and remove them.
- Collect statistics of your queries.

### How It Works?

Pg-im will config your postgres to collect logs, then postgres will start collecting all the select queries.
Then pg-im will observe and parse the select queries to find where to index, when it detect repeated queries, it will index them.

### Architecture:

Pg-im have writen in Node.js and it use Hexagonal architecture.
It's a cli tool now, but it can be a library, or a server that your client can communicate with.

### Commands:

- `pg-im init ./path/to/db.json` will configure your Postgres database.
- `pg-im observe ./path/to/db.json` will watch the Postgres, collect logs, create/remove index.

#### note:

`./path/to/db.json` is the json file for pg-im to connect to Postgres.
Format:

```
{
"address": "20.0.0.10",
"port": 5432,
"user": "postgres",
"password": "password",
"database": "postgres"
}

```
