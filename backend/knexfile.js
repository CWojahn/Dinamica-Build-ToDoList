// Update with your config settings.

module.exports = {
	development: {
		client: 'mysql',
		connection: {
			host: 'db-dinamica-cable.crhekfd1zqj2.sa-east-1.rds.amazonaws.com',
			user: 'cableadmin',
			password: 'n1#ut7iP?cith84heT#iwL#ROMl',
			database: 'db-dinamica',
		},

		migrations: {
			directory: './src/database/migrations',
		},
		useNullAsDefault: true,
	},

	test: {
		client: 'sqlite3',
		connection: {
			filename: './src/database/test.sqlite',
		},
		migrations: {
			directory: './src/database/migrations',
		},
		useNullAsDefault: true,
	},
	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},

	production: {
		client: 'mysql',
		connection: {
			host: 'db-dinamica-cable.crhekfd1zqj2.sa-east-1.rds.amazonaws.com',
			user: 'cableadmin',
			password: 'n1#ut7iP?cith84heT#iwL#ROMl',
			database: 'db-dinamica',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};
