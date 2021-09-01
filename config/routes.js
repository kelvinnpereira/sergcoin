const express = require('express');
const router = express.Router();
const mainController = require('../app/controllers/control');
const cursoController = require('../app/controllers/curso');
const entranceController = require('../app/controllers/entrance');
const areaController = require('../app/controllers/area');

//mainController
router.get('/'           , mainController.index);
router.get('/partida'    , mainController.partida);
router.get('/partida/:id', mainController.partida);
router.get('/sobre'      , mainController.sobre);
router.get('/ranking'    , mainController.ranking);

//areaController
router.get('/area', areaController.index);

//cursoController
router.get('/curso'             , cursoController.index);
router.get('/curso/read/:id'    , cursoController.read);
router.get('/curso/create'      , cursoController.create);
router.post('/curso/create'     , cursoController.create);
router.get('/curso/update/:id'  , cursoController.update);
router.post('/curso/update/:id' , cursoController.update);
router.delete('/curso/remove'   , cursoController.remove);

//entranceController
router.get('/signup'  , entranceController.signup);
router.post('/signup' , entranceController.signup);
router.get('/login'   , entranceController.login);
router.post('/login'  , entranceController.login);
router.get('/logout'  , entranceController.logout);
router.get('/forgot'  , entranceController.forgot);

module.exports = router;