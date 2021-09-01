const models = require('../models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const Partida = models.partida;
const User = models.user;
const Mensagem = models.mensagem;

const index = async function (req, res) {
    if (req.session.user) {

        var partidasAceitas = await Partida.findAll({
            where: {
                id_user_2: {
                    [Op.ne]: null,
                },
                [Op.or]: {
                    id_user_1: {
                        [Op.eq]: req.session.user.id,
                    },
                    id_user_2: {
                        [Op.eq]: req.session.user.id,
                    },
                }
            },
            include: [{
                model: User,
                as: 'user1',
                attributes: ['nome'],
            }, {
                model: User,
                as: 'user2',
                attributes: ['nome'],
            },],
            order: Sequelize.col('id'),
        });

        var partidasAguardando = await Partida.findAll({
            where: {
                id_user_2: {
                    [Op.eq]: null,
                },
            },
            include: {
                model: User,
                as: 'user1',
                attributes: ['nome'],
            },
            order: Sequelize.col('id'),
        });

        res.render('index', {
            partidasAceitas: partidasAceitas,
            partidasAguardando: partidasAguardando,
        });
    } else {
        res.redirect('/login');
    }
};

const sobre = (req, res) => {
    const content = 'Página sobre a aplicação';
    res.render('sobre', {
        content: content
    });
};

const partida = async function (req, res) {
    if (req.session.user) {
        var partidaId = req.params.id;
        if (partidaId === undefined) {
            var nova_partida = await Partida.create({
                id_user_1: req.session.user.id,
                id_user_2: null,
                winner: null,
                fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 
            });
            res.redirect('/partida/'+nova_partida.id);
        } else {
            var partidaObj = await Partida.findByPk(partidaId);
            if (partidaObj === undefined) {
                res.redirect('/');
            } else {
                var mensagens = await Mensagem.findAll({
                    where: {
                        id_partida: {
                            [Op.eq]: partidaObj.id,
                        }
                    }
                });
                var user1 = await User.findByPk(partidaObj.id_user_1);
                var user2;
                if (partidaObj.id_user_1 === req.session.user.id || partidaObj.id_user_2 === req.session.user.id) {
                    user2 = await User.findByPk(partidaObj.id_user_2);
                    res.render('partida', {
                        partidaObj: partidaObj,
                        mensagens: mensagens,
                        my_user: user1.id === req.session.user.id ? user1 : user2,
                        op_user: user1.id !== req.session.user.id ? user1 : user2,
                        b_ok: false,
                    });
                } else if (partidaObj.id_user_2 === null) {
                    user2 = await User.findByPk(req.session.user.id);
                    Partida.update({
                        id_user_2: req.session.user.id,
                    }, {
                        where: {
                            id: partidaId,
                        }
                    });
                    partidaObj.id_user_2 = req.session.user.id;
                    res.render('partida', {
                        partidaObj: partidaObj,
                        mensagens: mensagens,
                        my_user: user1.id === req.session.user.id ? user1 : user2,
                        op_user: user1.id !== req.session.user.id ? user1 : user2,
                        b_ok: true,
                    });
                } else {
                    res.redirect('/');
                }
            }
        }
    } else {
        res.redirect('/login');
    }
};

const ranking = async (req, res) => {
    if (req.session.user) {
        var users = await User.findAll({
            attributes: ['nome', [Sequelize.fn('COUNT', Sequelize.col('winner')), 'vitorias']],
            include: {
                model: Partida,
                as: 'user_winner',
                attributes: [],
                where: {		
                     winner: {		
                         [Op.ne]: null,		
                     }		
                 },
            },
            group: ['user.id'],
            order: [[Sequelize.col('vitorias'), 'DESC']],
        });
        res.render('ranking', {
            users: users,
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    index: index,
    partida: partida,
    sobre: sobre,
    ranking: ranking,
}
