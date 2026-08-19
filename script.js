 =====================================================
   SISTEMA DE ABAS
===================================================== */

function abrir/*Aba(id, botao) {

    // Esconde todativa");

        });s as páginas
    document
        .querySelectorAll(".pagina-aba")
        .forEach(pagina => {

            pagina.classList.remove("ativa");

        });


    // Remove o estado ativo dos botões
    document
        .querySelectorAll(".aba")
        .forEach(aba => {

            aba.classList.remove("a


    // Mostra a página selecionada
    const pagina =
        document.getElementById(id);

    if (pagina) {

        pagina.classList.add("ativa");

    }


    // Ativa o botão selecionado
    if (botao) {

        botao.classList.add("ativa");

    }


    // Volta para o topo
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}