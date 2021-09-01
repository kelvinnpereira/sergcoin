const toLower = function (value) {
	return value.toLowerCase();
}
const toUpper = function (value) {
	return value.toUpperCase();
}

const checked = function (valor, campo) {
	return valor == campo ? 'checked' : '';
}

const showError = function (errors, field) {
	var mensagem;
	if (typeof errors != 'undefined') {
		errors.forEach(function (error) {
			if (error.path == field) {
				mensagem = error.message;
				return;
			}
		});
		return mensagem;
	}
}

const inc = function (val) {
	return val + 1;
}

const color = function (id_user, id) {
	if(id_user === undefined) return 'black';
	return id_user === id ? 'white' : 'black';
}

const nomeNulo = (nome) => {
	return nome === null || nome === undefined || nome === '' ? 'Aguardando Oponente' : nome;
}

const direction = (id1, id2) => {
	return id1 == id2 ? 'right' : 'left';
}

const userName = (user1, user2, id_user) => {
	return user1.id === id_user ? user1.nome : user2.nome; 
}

const dateTolocalStr = (date) => {
	console.log(date);
	return new Date(date).toLocaleString();
}

module.exports = {
	toLower: toLower,
	toUpper: toUpper,
	checked: checked,
	showError: showError,
	inc: inc,
	color: color,
	nomeNulo: nomeNulo,
	direction: direction,
	userName: userName,
	dateTolocalStr: dateTolocalStr,
};