exports.up = function (knex) {
	return knex.schema.createTable('clientes', function (table) {
		table.increments('idcliente').primary();
		table.string('cliente', 60);
		table.string('CNPJ', 45);
		table.integer('idcidade');
		table.string('CEP', 45);
		table.string('endereco', 150);
	});
};

exports.down = function (knex) {
	knex.schema.dropTable('clientes');
};
