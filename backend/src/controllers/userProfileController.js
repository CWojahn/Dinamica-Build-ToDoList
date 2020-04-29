const connection = require('../database/connection');
const crypto = require('crypto');
const jwt = require('../utils/jwt');
module.exports = {
	async index(request, response) {
		const [, hash] = request.headers.authorization.split(' ');
		const [username, password] = Buffer.from(hash, 'base64')
			.toString()
			.split(':');
		try {
			const user = await connection('usuarios')
				.where('username', username)
				.andWhere(
					'password',
					crypto.createHash('md5').update(password).digest('hex'),
				)
				.select('idusuarios')
				.first();

			if (!user) {
				return response.sendStatus(401);
			}
			const token = await jwt.sign({ userId: user.idusuarios });
			response.status(200).send({ user, token });
		} catch (error) {
			response.status(401).send(error);
		}
	},
};
