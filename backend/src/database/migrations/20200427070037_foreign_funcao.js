exports.up = function (knex) {
	return knex.schema.table('usuarios', function (table) {
		table.foreign('funcao').references('idfuncoes').inTable('funcoes');
	});
};

exports.down = function (knex) {};
