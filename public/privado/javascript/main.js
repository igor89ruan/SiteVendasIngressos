

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });
    
    /*--------------------------
        Event Slider
    ----------------------------*/
    $(".event__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3,
            },
            768: {
                items: 2,
            },
            0: {
                items: 1,
            },
        }
    });
    
    /*--------------------------
        Videos Slider
    ----------------------------*/
    $(".videos__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 4,
            },
            768: {
                items: 3,
            },
            576: {
                items: 2,
            },
            0: {
                items: 1,
            }
        }
    });

    /*------------------
		Magnific
	--------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        CountDown
    --------------------*/
    // For demo preview
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if(mm == 12) {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = parseInt(mm) + 1;
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end
    

    // Use this for real timer date
    /* var timerdate = "2020/01/01"; */

	$("#countdown-time").countdown(timerdate, function(event) {
        $(this).html(event.strftime("<div class='countdown__item'><span>%D</span> <p>Days</p> </div>" + "<div class='countdown__item'><span>%H</span> <p>Hours</p> </div>" + "<div class='countdown__item'><span>%M</span> <p>Minutes</p> </div>" + "<div class='countdown__item'><span>%S</span> <p>Seconds</p> </div>"));
    });

    /*------------------
		Barfiller
	--------------------*/
    $('#bar1').barfiller({
        barColor: "#ffffff",
    });

    $('#bar2').barfiller({
        barColor: "#ffffff",
    });

    $('#bar3').barfiller({
        barColor: "#ffffff",
    });

    /*-------------------
		Nice Scroll
	--------------------- */
    $(".nice-scroll").niceScroll({
        cursorcolor: "#111111",
        cursorwidth: "5px",
        background: "#e1e1e1",
        cursorborder: "",
        autohidemode: false,
        horizrailenabled: false
    });

})(jQuery);

// validação dos campos do formulario
/*
function cache(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{1,})(\d{2})$/, '$1,$2');
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    valor = 'R$ ' + valor;
    return valor;
}

function telefone(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{2})(\d)/, '($1)  $2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    valor = valor.replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3');
    valor = valor.replace(/(\d{4})\d+?$/, '$1');
    return valor;
}

function cpf(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{2})/, '$1-$2');
    valor = valor.replace(/(-\d{2})\d+?$/, '$1');
    return valor;
}

function cnpj(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    valor = valor.replace(/(-\d{2})\d+?$/, '$1');
    return valor;
}

function cep(valor) {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    valor = valor.replace(/(-\d{3})\d+?$/, '$1');
    return valor;
}

function validarEmail(valor) {
    valor = valor.replace(/(^\s+|\s+$)/g, ''); // Remove espaços no início e no fim
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(valor);
}

const campos = document.querySelectorAll('input');

campos.forEach(campo => {
    campo.addEventListener('input', function() {
        if (this.name === 'cache') {
            this.value = cache(this.value);
        } else if (this.name === 'telefone') {
            this.value = telefone(this.value);
        } else if (this.name === 'cpf') {
            this.value = cpf(this.value);
        } else if (this.name === 'cnpj') {
            this.value = cnpj(this.value);
        } else if (this.name === 'cep') {
            this.value = cep(this.value);
        } else if (this.name === 'email') {
            this.value = this.value.replace(/(^\s+|\s+$)/g, ''); // Remove espaços no início e no fim
        }
    });

    campo.addEventListener('blur', function() {
        if (this.name === 'cache' && this.value.length < 4) {
            alert('Valor Inválido! Tente novamente.');
        } else if (this.name === 'telefone' && this.value.length < 16) {
            alert('Número de telefone Inválido! Tente novamente.');
        }   else if (this.name === 'cnpj' && this.value.length < 18) {
            alert('CNPJ Inválido! Tente novamente.');
        } 
        
        else if (this.name === 'cpf' && this.value.length < 14) {
            alert('CPF Inválido! Tente novamente.');
        } else if (this.name === 'cep' && this.value.length < 9) {
            alert('CEP Inválido! Tente novamente.');
        } else if (this.name === 'email' && !validarEmail(this.value)) {
            alert('E-mail Inválido! exemplo (exemple@dominio.com)');
        }
    });
});

const finalizacao = document.querySelector(".finalizacao");

finalizacao.addEventListener("click", function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll('input');
    let allFilled = true;

    inputs.forEach((input) => {
        if(input.value === '') {
            allFilled = false;
        }
    });

    if (!allFilled) {
        alert('Todos os Campos precisam ser preenchidos!');
    } else {
        alert("CADASTRO REALIZADO COM SUCESSO");
    }
});
*/