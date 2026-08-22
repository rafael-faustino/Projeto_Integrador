/* =====================================================
   SISTEMA DE ABAS
===================================================== */

function abrirAba(id, botao) {

    document.querySelectorAll(".aba").forEach(pagina => {
        pagina.classList.remove("ativa");
    });

    document.querySelectorAll(".menu-btn").forEach(aba => {
        aba.classList.remove("active");
    });

    const pagina = document.getElementById(id);

    if (pagina) {
        pagina.classList.add("ativa");
    }

    if (botao) {
        botao.classList.add("active");
    }

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
   DISCO DE NEWTON
===================================================== */

function girarDisco() {

    const disco = document.getElementById("discoNewton");

    if (!disco) {
        console.error("Disco de Newton não encontrado.");
        return;
    }

    disco.classList.toggle("girando");

}


/* =====================================================
   VOLTAR AO TOPO
===================================================== */

function voltarTopo() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ---------------------------------------------
       TELA DE ENTRADA
    --------------------------------------------- */

    const intro = document.getElementById("pokemonIntro");
    const entrarSite = document.getElementById("entrarSite");

    if (intro && entrarSite) {

        entrarSite.addEventListener("click", function () {

            intro.classList.add("sair");

            // Libera a página depois da animação
            setTimeout(function () {
                intro.style.display = "none";
            }, 700);

        });

    }


    /* ---------------------------------------------
       PRIMEIRA ABA
    --------------------------------------------- */

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


    /* ---------------------------------------------
       DISCO COMEÇA PARADO
    --------------------------------------------- */

    const disco = document.getElementById("discoNewton");

    if (disco) {
        disco.classList.remove("girando");
    }

});


/* =====================================================
   BOTÃO VOLTAR AO TOPO
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
