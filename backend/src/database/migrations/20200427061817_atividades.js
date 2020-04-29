exports.up = function (knex) {
	return knex.schema.createTable('atividades', function (table) {
		table.increments('idatividades').primary();
		table.integer('idobra').notNullable();
		table.integer('idresponsavel');
		table.string('atividade', 45);
		table.float('peso');
		table.date('iniciolm');
		table.date('fimlm');
		table.date('iniciolmprev');
		table.date('fimlmprev');
		table.date('inicioproj');
		table.date('fimproj');
		table.date('inicioprojprev');
		table.date('fimprojprev');
		table.float('perclm');
		table.float('percproj');
		table.integer('concluida');
		table.integer('tipo');
		//
	});
};

exports.down = function (knex) {
	knex.schema.dropTable('atividades');
};
