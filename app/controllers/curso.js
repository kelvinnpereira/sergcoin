const model = require('../models/index');
const Curso = model.curso;
const Area = model.area;

module.exports = {

	index: async function (req, res) {
		if (req.session.user) {
			var cursos = await Curso.findAll();
			res.render('curso/index', {
				cursos: cursos,
				csrfToken: req.csrfToken(),
			});
		} else {
			res.redirect('/login');
		}
	},

	create: async function (req, res) {
		if (req.session.user) {
			if (req.route.methods.get) {
				var areas = await Area.findAll();
				res.render('curso/create', {
					areas: areas,
					csrfToken: req.csrfToken(),
				});
			} else {
				try {
					await Curso.create(req.body);
					res.redirect('/curso');
				} catch (error) {
					console.log(error);
					var areas = await Area.findAll();
					res.render('curso/create', {
						curso: req.body,
						areas: areas,
						errors: error.errors,
						csrfToken: req.csrfToken(),
					});
				}
			}
		} else {
			res.redirect('/login');
		}
	},

	read: async function (req, res) {
		if (req.session.user) {
			var cursoId = parseInt(req.params.id);
			var curso = await Curso.findByPk(cursoId);
			var area = await Area.findByPk(curso.id_area);
			curso.area = area.nome;
			res.render('curso/read', {
				curso: curso,
			});
		} else {
			res.redirect('/login');
		}
	},

	update: async function (req, res) {
		if (req.session.user) {
			var cursoId = parseInt(req.params.id);
			if (req.route.methods.get) {
				var curso = await Curso.findByPk(cursoId);
				var areas = await Area.findAll();
				res.render('curso/update', {
					curso: curso,
					areas: areas,
					csrfToken: req.csrfToken(),
				});
			} else {
				try {
					await Curso.update({
						sigla: req.body.sigla,
						nome: req.body.nome,
						descricao: req.body.descricao,
						id_area: req.body.area,
					}, {
						where: {
							id: cursoId
						}
					});
					res.redirect('/curso');
				} catch (error) {
					res.redirect('/');
				}
			}
		} else {
			res.redirect('/login');
		}
	},

	remove: async function (req, res) {
		if (req.session.user) {
			if (req.route.methods.delete) {
				console.log('remove');
				var cursoId = parseInt(req.body.id);
				Curso.destroy({
					where: {
						id: cursoId
					}
				});
			}
		} else {
			res.redirect('/login');
		}
	},
}