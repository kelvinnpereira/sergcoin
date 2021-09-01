(function () {
    game = new Chess();

    function onDragStart(source, piece, position, orientation) {
        if (game.game_over()) {
            //escrever um aviso de game over.
            return false;
        }
        if ((game.turn() === 'w' && piece.charAt(0) === 'b') ||
            (game.turn() === 'b' && piece.charAt(0) === 'w')) {
            return false;
        }
    };

    function onDrop(source, target) {
        // game.move([options]) retorna se o movimento foi valido.

        var options = {
            from: source,
            to: target,
            promotion: 'q' // simplificando, sempre promovendo a peca para rainha.
        };

        var move = game.move(options);

        if (move === null) return 'snapback';
        socket.emit('mover', game);
        updateStatus();
    };

    function onSnapEnd() {
        socket.emit('mover', game.fen());
    };

    function updateStatus() {
        var status = '';
        var moveColor = game.turn() === 'b' ? 'Black' : 'White';

        // checkmate?
        if (game.in_checkmate()) {
            status = 'Game over, ' + moveColor + ' is in checkmate.';
        }
        // draw? regra dos 50 movimentos
        else if (game.in_draw()) {
            status = 'Game over, drawn position';
        }
        else {
            status = moveColor + ' to move';
            // check?
            if (game.in_check()) {
                status += ', ' + moveColor + ' is in check';
            }
        }
        $('#status').html(status);
    };

    var config = {
        draggable: true,
        position: 'start',
        showNotation: false,
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };

    board = Chessboard('myBoard', config);

    socket.on('mover', (fen) => {
        game.load(fen);
        board.position(fen);
        updateStatus();
    });

})();