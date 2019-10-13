module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DBFILE || './data.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
