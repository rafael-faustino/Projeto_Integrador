/* =====================================================
SISTEMA DE EVENTOS - POKÉDEX DA ÓPTICA
===================================================== */
document.addEventListener("DOMContentLoaded", () => {
const telaInicio = document.getElementById("inicio");
const telaSite = document.getElementById("site"); 

// Verifica se os elementos cruciais existem no HTML antes de executar
if (telaInicio && telaSite) {
// Evento de clique para remover a abertura e exibir o site principal
telaInicio.addEventListener("click", () => {
    // Adiciona a classe que faz a Pokébola se aproximar e desaparecer suavemente
    telaInicio.classList.add("saindo");
    
    // Ativa a exibição do painel principal da Pokédex
    telaSite.classList.add("visivel");
});

// Alternativa: Permite pressionar qualquer tecla para iniciar (Estilo Jogo de GBA)
document.addEventListener("keydown", function iniciarPorTeclado(event) {
    // Executa apenas se a tela inicial ainda estiver visível
    if (!telaInicio.classList.contains("saindo")) {
        telaInicio.classList.add("saindo");
        telaSite.classList.add("visivel");
        
        // Remove o ouvinte do teclado para poupar memória do navegador
        document.removeEventListener("keydown", iniciarPorTeclado);
    }
});

}

});