'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('partida', [
			{
				id: 1,
				id_user_1: 1,
				id_user_2: 2,
				winner: null,
				fen: '8/8/8/8/8/6K1/4Q3/6k1 w - - 21 61',
				created_at: new Date(new Date() + "+0"),
				updated_at: new Date(new Date() + "+0"),
			},
			{
				id: 2,
				id_user_1: 2,
				id_user_2: 1,
				winner: null,
				fen: '8/8/8/8/8/6K1/4Q3/6k1 w - - 21 61',
				created_at: new Date(new Date() + "+0"),
				updated_at: new Date(new Date() + "+0"),
			},
			{
				id: 3,
				id_user_1: 1,
				id_user_2: 2,
				winner: null,
				fen: '2Rrkb2/5p2/6p1/6B1/p6P/P3p1P1/P7/5K2 w - - 2 37',
				created_at: new Date(new Date() + "+0"),
				updated_at: new Date(new Date() + "+0"),
			},
		], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('partida', {}, {});
	}
};
