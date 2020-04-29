const connection = require('../database/connection');
module.exports = {
	async index(request, response) {
		const { idusuarios } = request.auth;

		const builds = await connection('obras')
			.innerJoin('atividades', 'atividades.idobra', 'obras.idobras')
			.innerJoin('clientes', 'clientes.idcliente', 'obras.idcliente')
			.where('atividades.idresponsavel', idusuarios)
			.whereNull('atividades.concluida')
			.select(['idobras', 'clientes.cliente AS cliente', 'obra'])
			.groupBy('idobras');
		return response.json(builds);
	},
};
