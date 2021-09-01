(function () {
    function carregar(data) {
        $('.mensagens').append('<p> <strong>' + data.user + ': </strong>' + data.msg + '</p>');
    }

    $('#chatBox').submit((event) => {
        event.preventDefault();
        var user = $('input[name=usuario]').val();
        var msg = $('input[name=mensagem]').val();
        $('input[name=mensagem]').val('');
        var data = {
            user: user,
            msg: msg,
            board: board
        };
        socket.emit('enviar mensagem', data);
    });

    socket.on('receber mensagem', (data) => {
        carregar(data);
    });

    socket.on('carregar mensagens', (mensagens) => {
        mensagens.forEach((data) => {
            carregar(data);
        });
    });

})();