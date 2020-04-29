const connection = require('../database/connection');
module.exports = {
	async index(request, response) {
		const { page = 1 } = request.query;
		const { idatividade } = request.body;

		const [count] = await connection('tarefas_atividade')
            .where('tarefas_atividade.idatividade', idatividade)
			.count();
		const tasks = await connection('tarefas_atividade')
			.innerJoin('tarefa', 'tarefa.idtarefa', 'tarefas_atividade.idtarefa')
			.where('tarefas_atividade.idatividade', idatividade)
			.limit(5)
			.offset((page - 1) * 5)
			.select([
				'tarefa',
				'lmstatus',
				'projstatus',
				'datalm',
				'dataproj',
				'tarefas_atividade.idtarefas',
				'tipo',
			]);

		response.header('X-Total-Count', count['count(*)']);
		return response.json(tasks);
	},

	async create(request, response) {
	},

	async update(request, response) {},

	async delete(request, response) {
		const { idtarefas } = request.params;
		const userlevel = request.headers.userlevel;

		if (userlevel > 1) {
			return response.status(401).json({ error: 'Operação não permitida.' });
		}
		await connection('tarefas_atividade').where('idtarefas', idtarefas).delete();
		return response.status(204).send();
	},
};
