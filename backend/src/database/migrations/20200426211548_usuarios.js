exports.up = function (knex) {
	return knex.schema.createTable('usuarios', function (table) {
		table.increments('idusuarios').primary();
		table.string('nome', 45).notNullable();
		table.integer('ativo').notNullable();
		table.date('data_admissao');
		table.string('email', 60);
		table.string('funcao').notNullable();
		table.string('username', 45).notNullable();
		table.string('telefone', 45);
		table.string('foto');
		table.string('password', 128).notNullable();
		table.foreign('funcao').references('idfuncoes').inTable('funcoes');
	});
};

exports.down = function (knex) {
	knex.schema.dropTable('usuarios');
};
