(function () {
    $(window).scroll(function () {
        var top = $(document).scrollTop();
        if (top > 50)
            $('#home > .navbar').removeClass('navbar-transparent');
        else
            $('#home > .navbar').addClass('navbar-transparent');
    });

    $("a[href='#']").click(function (e) {
        e.preventDefault();
    });

    $('.bs-component [data-toggle="popover"]').popover();
    $('.bs-component [data-toggle="tooltip"]').tooltip();
    $(".bs-component").each(function () {
        var $button = $("<button class='source-button btn btn-primary btn-xs' role='button' tabindex='0'>&lt; &gt;</button>");
        $(this).append($button);
    });

    $('body').on('click', '.source-button', function (e) {
        e.preventDefault();

        var html = $(this).parent().html();
        html = cleanSource(html);
        $("#source-modal pre").text(html);
        $("#source-modal").modal();
    });

    function cleanSource(html) {
        html = html.replace(/×/g, "&times;")
            .replace(/«/g, "&laquo;")
            .replace(/»/g, "&raquo;")
            .replace(/←/g, "&larr;")
            .replace(/→/g, "&rarr;");

        var lines = html.split(/\n/);

        lines.shift();
        lines.splice(-1, 1);

        var indentSize = lines[0].length - lines[0].trim().length,
            re = new RegExp(" {" + indentSize + "}");

        lines = lines.map(function (line) {
            if (line.match(re)) {
                line = line.substring(indentSize);
            }

            return line;
        });

        lines = lines.join("\n");

        return lines;
    }

})();

$(".delete-curso").click(function () {
    $("#delete-curso-confirma").data("id", $(this).data("id"));
    $("#delete-curso-confirma").data("nome", $(this).data("nome"));
    $("#curso-nome").html($("#delete-curso-confirma").data("nome"));
    $("#modal-delete").modal('show');
});

$("#delete-curso-confirma").click(function () {
    var id = $("#delete-curso-confirma").data("id");
    $.ajax({
        method: 'DELETE',
        url: '/curso/remove',
        data: {
            id: id,
            _csrf: $("#csrf").val()
        },
        success: function (data) {
            $("#modal-delete").modal('hide');
            $("#data-curso-" + id).remove();
        }
    });
    location.reload();
});

$('#criar-conta').click(function () {
    var field = $('#email').val();
    var erros = 0;
    usuario = field.substring(0, field.indexOf("@"));
    dominio = field.substring(field.indexOf("@") + 1, field.length);
    console.log(field);
    console.log(usuario);
    console.log(dominio);

    if ((usuario.length < 1) ||
        (dominio.length < 3) ||
        (usuario.search("@") != -1) ||
        (dominio.search("@") != -1) ||
        (usuario.search(" ") != -1) ||
        (dominio.search(" ") != -1) ||
        (dominio.search(".") == -1) ||
        (dominio.indexOf(".") < 1) ||
        (dominio.lastIndexOf(".") == dominio.length - 1)) {
        $('#email').addClass('is-invalid');
        erros++;
    } else {
        $('#email').removeClass('is-invalid');
    }
    if ($("#nome").val().length < 6 || $("#nome").val().length > 100) {
        $('#nome').addClass('is-invalid');
        erros++;
    } else {
        $('#nome').removeClass('is-invalid');
    }

    if ($("#senha").val().length < 6) {
        $('#senha').addClass('is-invalid');
        erros++;
    } else {
        $('#senha').removeClass('is-invalid');
    }

    if ($("#senha").val() != $("#confirma-senha").val()) {
        $('#confirma-senha').addClass('is-invalid');
        erros++;
    } else {
        $('#confirma-senha').removeClass('is-invalid');
    }

    if (!$("#termos").prop("checked")) {
        $('#termos').addClass('is-invalid');
        erros++;
    } else {
        $('#termos').removeClass('is-invalid');
    }

    if (erros > 0) {
        return false;
    }
});


