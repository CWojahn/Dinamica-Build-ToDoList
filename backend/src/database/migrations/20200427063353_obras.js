exports.up = function (knex) {
	return knex.schema.createTable('obras', function (table) {
		table.increments('idobras').primary();
		table.integer('idcliente').notNullable();
		table.string('idcontato', 50);
		table.integer('idresponsavel');
		table.integer('idcidade');
		table.string('obra', 45);
		table.string('cep', 45);
		table.string('endereco', 45);
		table.string('utm', 45);
		table.integer('requisitos');
		table.date('dataentrega');
	});
};

exports.down = function (knex) {
	knex.schema.dropTable('obras');
};
