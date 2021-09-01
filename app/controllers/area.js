var model = require('../models/index');
var Area = model.area;

const index = async (req, res) => {
	if (req.session.user) {
		var areas = await Area.findAll();
		res.render('area/index', {areas: areas});
	} else {
		res.redirect('/login');
	}
};

module.exports = {index}