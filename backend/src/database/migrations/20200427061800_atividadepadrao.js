exports.up = function (knex) {
	return knex.schema.createTable('atividadepadrao', function (table) {
		table.increments('idatividadepadrao').primary();
		table.string('atividadepadrao', 45);
		table.integer('tipo');
	});
};

exports.down = function (knex) {
	knex.schema.dropTable('atividadepadrao');
};
