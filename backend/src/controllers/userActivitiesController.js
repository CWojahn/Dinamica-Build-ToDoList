const connection = require('../database/connection');
module.exports = {
	async index(request, response) {
		const { page = 1 } = request.query;
		const { idobra } = request.body;
		const { idusuarios } = request.auth;

		const [count] = await connection('atividades')
			.where('atividades.idobra', idobra)
			.andWhere('atividades.idresponsavel', idusuarios)
			.count();
		const activities = await connection('atividades')
			.innerJoin('usuarios', 'atividades.idresponsavel', 'usuarios.idusuarios')
			.leftJoin(
				'controleOS',
				'atividades.idatividades',
				'controleOS.idatividade',
			)
			.whereNull('fim')
			.where('atividades.idobra', idobra)
			.andWhere('usuarios.idusuarios', idusuarios)
			.whereNull('concluida')
			.limit(5)
			.offset((page - 1) * 5)
			.select(['atividades.*', 'nome']);

		const result = activities.map(function (el) {
			const o = Object.assign({}, el);
			if (
				(Date.now - activities.inicioprojprev) *
					(100 / (activities.fimprojprev - activities.inicioprojprev)) <=
				100
			) {
				o.projecttarget =
					(Date.now - activities.inicioprojprev) *
					(100 / (activities.fimprojprev - activities.inicioprojprev));
			} else {
				o.projecttarget = 0;
			}

			if (
				(Date.now - activities.iniciolmprev) *
					(100 / (activities.fimlmprev - activities.iniciolmprev)) <=
				100
			) {
				o.listatarget =
					(Date.now - activities.iniciolmprev) *
					(100 / (activities.fimlmprev - activities.iniciolmprev));
			} else {
				o.listatarget = 0;
			}
			return o;
		});

		response.header('X-Total-Count', count['count(*)']);
		return response.json(result);
	},

	async create(request, response) {
		const userlevel = request.headers.userlevel;
		const {
			idobra,
			idresponsavel,
			atividade,
			peso,
			iniciolmprev,
			fimlmprev,
			inicioprojprev,
			fimprojprev,
			tipo,
		} = request.body;

		if (userlevel > 1) {
			return response.status(401).json({ error: 'Operação não permitida.' });
		}

		const [idatividades] = await connection('atividades').insert({
			idobra,
			idresponsavel,
			atividade,
			peso,
			iniciolmprev,
			fimlmprev,
			inicioprojprev,
			fimprojprev,
			tipo,
		});
		return response.json({ idatividades });
	},

	async update(request, response) {},

	async delete(request, response) {
		const { idatividades } = request.params;
		const userlevel = request.headers.userlevel;

		if (userlevel > 1) {
			return response.status(401).json({ error: 'Operação não permitida.' });
		}
		await connection('atividades').where('idatividades', idatividades).delete();
		return response.status(204).send();
	},
};
