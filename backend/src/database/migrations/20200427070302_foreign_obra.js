exports.up = function (knex) {
	return knex.schema.table('atividades', function (table) {
		table.foreign('idobra').references('idobras').inTable('obras');
	});
};

exports.down = function (knex) {};
