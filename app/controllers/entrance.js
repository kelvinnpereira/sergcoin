
const models = require('../models/index');
const bcrypt = require('bcryptjs');
const Curso = models.curso;
const User = models.user;

module.exports = {

    login: async function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            if (req.route.methods.get) {
                res.render('entrance/login', {
                    csrfToken: req.csrfToken()
                });
            } else {
                var user = await User.findOne({
                    where: {
                        email: req.body.email,
                    }
                });
                if (user) {
                    bcrypt.compare(req.body.senha, user.senha, (err, ok) => {
                        if (ok) {
                            req.session.user = user;
                            res.redirect('/');
                        } else {
                            res.render('entrance/login', {
                                csrfToken: req.csrfToken()
                            });
                        }
                    });
                } else {
                    res.render('entrance/login', {
                        csrfToken: req.csrfToken(),
                    });
                }
            }
        }
    },

    logout: async function (req, res) {
        if (req.session.user) {
            req.session.destroy();
        }
        res.redirect('/');
    },

    signup: async function (req, res) {
        if (req.session.user) {
            res.redirect('/');
        } else {
            if (req.route.methods.get) {
                var cursos = await Curso.findAll();
                res.render('entrance/signup', {
                    cursos: cursos,
                    csrfToken: req.csrfToken()
                });
            } else {
                try {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.senha, salt, async (err, hash) => {
                            if (!err) {
                                await User.create({
                                    nome: req.body.nome,
                                    email: req.body.email,
                                    senha: hash,
                                    id_curso: req.body.curso
                                });
                            } else {
                                console.log(err);
                            }
                        });
                    });
                    res.redirect('/');
                } catch (error) {
                    console.log(error);
                    res.redirect('/');
                }
            }
        }
    },

    forgot: async function (req, res) {
        res.redirect('/');
    },
}