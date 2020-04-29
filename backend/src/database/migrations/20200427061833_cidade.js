exports.up = function (knex) {
	return knex.schema.createTable('cidade', function (table) {
		table.increments('id').primary();
		table.string('nome', 120).notNullable();
		table.integer('uf');
		table.integer('ibge');
	});
};

exports.down = function (knex) {
	knex.schema.dropTable('cidade');
};
