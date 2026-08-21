 /* =====================================================
   SISTEMA DE ABAS
===================================================== */

function abrirAba(id, botao) {

    // Esconde todas as páginas
    document
        .querySelectorAll(".aba")
        .forEach(pagina => {

            pagina.classList.remove("ativa");

        });


    // Remove o estado ativo de todos os botões
    document
        .querySelectorAll(".menu-btn")
        .forEach(aba => {

            aba.classList.remove("active");

        });


    // Mostra a página selecionada
    const pagina = document.getElementById(id);

    if (pagina) {

        pagina.classList.add("ativa");

    }


    // Ativa o botão selecionado
    if (botao) {

        botao.classList.add("active");

    }


    // Volta para o topo
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   SCROLL PARA UMA SEÇÃO
===================================================== */

function scrollPara(id) {

    const elemento = document.getElementById(id);

    if (elemento) {

        elemento.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =====================================================
   BOTÃO VOLTAR AO TOPO
===================================================== */

function voltarTopo() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   MOSTRAR / ESCONDER BOTÃO DE TOPO
===================================================== */

window.addEventListener("scroll", function () {

    const botaoTopo = document.getElementById("topButton");

    if (!botaoTopo) return;

    if (window.scrollY > 500) {

        botaoTopo.classList.add("mostrar");

    } else {

        botaoTopo.classList.remove("mostrar");

    }

});


/* =====================================================
   GARANTE QUE O SITE COMECE NA PRIMEIRA ABA
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const primeiraPagina = document.getElementById("optica");

    const primeiroBotao = document.querySelector(".menu-btn");

    if (primeiraPagina) {

        document.querySelectorAll(".aba").forEach(pagina => {

            pagina.classList.remove("ativa");

        });

        primeiraPagina.classList.add("ativa");

    }

    if (primeiroBotao) {

        document.querySelectorAll(".menu-btn").forEach(botao => {

            botao.classList.remove("active");

        });

        primeiroBotao.classList.add("active");

    }

});