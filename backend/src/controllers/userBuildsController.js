const connection = require('../database/connection');
module.exports = {
	async index(request, response) {
		const { idusuarios } = request.auth;

		const builds = await connection('obras')
			.innerJoin('atividades', 'atividades.idobra', 'obras.idobras')
			.innerJoin('clientes', 'clientes.idcliente', 'obras.idcliente')
			.innerJoin('cidade', 'cidade.id', 'obras.idcidade')
			.innerJoin('estado', 'estado.id', 'cidade.uf')
			.where('atividades.idresponsavel', idusuarios)
			.whereNull('atividades.concluida')
			.select([
				'obras.*',
				'clientes.cliente AS cliente',
				'cidade.nome AS cidade',
				'estado.uf AS uf',
			])
			.groupBy('idobras');

		const result = builds.map(function (el) {
			const o = Object.assign({}, el);
			let coordcreate = o.utm.split(', ');
			o.latitude = coordcreate[0];
			o.longitude = coordcreate[1];
			return o;
		});

		return response.json(result);
	},
};
