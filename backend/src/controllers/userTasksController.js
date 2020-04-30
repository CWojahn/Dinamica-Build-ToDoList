const connection = require('../database/connection');
module.exports = {
	async index(request, response) {
		const { idatividade } = request.body;

		const tasks = await connection('tarefas_atividade')
			.innerJoin('tarefa', 'tarefa.idtarefa', 'tarefas_atividade.idtarefa')
			.where('tarefas_atividade.idatividade', idatividade)
			.select(['tarefa', 'tipo', 'tarefas_atividade.*']);

		let projcount = 0;
		let lmcount = 0;
		tasks.map((e) => {
			if (e.tipo == 1) {
				projcount += 1;
			} else if (e.tipo == 2) {
				lmcount += 1;
			} else if (e.tipo == 3) {
				projcount += 1;
				lmcount += 1;
			}
		});

		const result = tasks.map(function (el) {
			const o = Object.assign({}, el);
			if (o.tipo == 1) {
				o.percentLm = 0;
				o.percentproj = 100 / projcount;
			} else if (o.tipo == 2) {
				o.percentLm = 100 / lmcount;
				o.percentproj = 0;
			} else if (o.tipo == 3) {
				o.percentLm = 100 / lmcount;
				o.percentproj = 100 / projcount;
			}
			return o;
		});
		return response.json(result);
	},

	async create(request, response) {},

	async update(request, response) {
		const {
			lmstatus,
			projstatus,
			datalm,
			dataproj,
			idtarefas,
			perclm,
			percproj,
			idatividades,
		} = request.body;

		const { userId } = request.auth;

		try {
			const taskUpdateDone = await connection('tarefas_atividade')
				.where('idtarefas', idtarefas)
				.update({ lmstatus, projstatus, datalm, dataproj });

			const activityPercentUpdateDone = await connection('atividades')
				.where('idatividades', idatividades)
				.update({ perclm, percproj });

			// if (taskUpdateDone == 1 && activityPercentUpdateDone == 1) {
			return response.sendStatus(200);
			//}
		} catch (error) {
			console.log(error);
			return response.status(400).send(error);
		}
	},

	async delete(request, response) {
		const { idtarefas } = request.params;
		const userlevel = request.headers.userlevel;

		if (!user) {
			return response.status(401).json({ error: 'Operação não permitida.' });
		}
		await connection('tarefas_atividade')
			.where('idtarefas', idtarefas)
			.delete();
		return response.status(204).send();
	},
};
