/* =====================================================
   SISTEMA DE ABAS
===================================================== */

function abrirAba(id, botao) {

    // Esconde todas as páginas
    document.querySelectorAll(".aba").forEach(pagina => {
        pagina.classList.remove("ativa");
    });

    // Remove o destaque dos botões
    document.querySelectorAll(".menu-btn").forEach(aba => {
        aba.classList.remove("active");
    });

    // Procura a página escolhida
    const pagina = document.getElementById(id);

    // Ativa a página
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
   INICIALIZAÇÃO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const primeiraAba = document.getElementById("inicio");
    const primeiroBotao = document.querySelector(".menu-btn");

    if (primeiraAba) {
        primeiraAba.classList.add("ativa");
    }

    if (primeiroBotao) {
        primeiroBotao.classList.add("active");
    }

});