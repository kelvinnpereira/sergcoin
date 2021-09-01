const express = require('express');
const logger = require('morgan');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4567;
const handlebars = require('express-handlebars');
const router = require('./config/routes');
const sass = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const uuid = require('uuid/v4');
const session = require('express-session');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(csurf({ cookie: true }));
app.use(logger('short'));
app.use(session({
	genid: (req) => {
		return uuid()
	},
	secret: 'Hi9Cf#mK98',
	resave: false,
	saveUninitialized: true,
}));

app.use(sass({
	src: __dirname + '/public/scss',
	dest: __dirname + '/public/css',
	debug: true,
	outputStyle: 'compressed',
	prefix: '/css'
}));

app.use('/css', [
	express.static(__dirname + '/public/css')
]);

app.use('/img', [
	express.static(__dirname + '/public/img')
]);

app.use('/partida/img', [
	express.static(__dirname + '/public/img')
]);

app.use('/js', [
	express.static(__dirname + '/node_modules/jquery/dist/'),
	express.static(__dirname + '/node_modules/popper.js/dist/umd/'),
	express.static(__dirname + '/node_modules/bootstrap/dist/js/'),
	express.static(__dirname + '/public/js')
]);


app.engine('handlebars', handlebars({
	helpers: require(__dirname + '/app/views/helpers/helpers.js')
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/app/views');


app.use('/', (req, res, next) => {
	res.locals.session = req.session;
	next();
});

const models = require('./app/models/index');
const Partida = models.partida;
const Mensagem = models.mensagem;

const game = io.of('/game');
const chat = io.of('/chat');

game.on('connection', (socket) => {

});

chat.on('connection', (socket) => {
	
});


io.on('connection', (socket) => {
	console.log('socket conectado');

	socket.on('mensagem', async (data) => {
		Mensagem.create({
			id_partida: data.partida,
			id_user: data.user.id,
			mensagem: data.mensagem,
		});
		socket.broadcast.emit('mensagem', data);
	});

	socket.on('mover', (move) => {
		Partida.update({
			fen: move.position,
		}, {
			where: {
				id: move.partida,
			}
		});
		io.emit('mover', move);
	});

	socket.on('vitoria', (move) => {
		Partida.update({
			winner: move.winner,
		}, {
			where: {
				id: move.partida,
			}
		});
	});

	socket.on('b_ok', (msg) => {
		socket.broadcast.emit('b_ok', msg);
	})

	socket.on('disconnect', () => {
		console.log('socket desconectado');
	});
});

app.use(router);

server.listen(port, () => {
	console.log('Servidor rodando na porta ' + port);
});
