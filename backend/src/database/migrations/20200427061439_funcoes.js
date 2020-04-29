exports.up = function (knex) {
	return knex.schema.createTable('funcoes', function (table) {
		table.increments('idfuncoes').primary();
		table.string('funcao', 45).notNullable();
		table.integer('nivelacesso');
	});
};

exports.down = function (knex) {
	knex.schema.dropTable('funcoes');
};
