const jwt = require('../utils/jwt');
const connection = require('../database/connection');

const authMiddleWare = async (request, response, next) => {
	token = request.headers['x-access-token'];
	try {
		const payload = await jwt.verify(token);
		const user = await connection('usuarios')
			.innerJoin('funcoes', 'funcoes.idfuncoes', 'usuarios.funcao')
			.select('idusuarios', 'nome', 'email', 'telefone', 'foto', 'nivelacesso')
			.where('idusuarios', payload.userId)
			.first();

		if (!user) {
			return response.sendStatus(401);
		}
		request.auth = user;
		next();
	} catch (error) {
		return response.status(401).send(error);
	}
};

module.exports = authMiddleWare;
