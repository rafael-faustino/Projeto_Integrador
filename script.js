// Selecionando os elementos de transição de tela
const fachada = document.getElementById('fachada');
const interior = document.getElementById('interior');

// Selecionando os textos que vamos mudar dinamicamente
const tituloInterior = document.getElementById('titulo-interior');
const mensagemInterior = document.getElementById('mensagem-interior');

// Selecionando cada botão individualmente
const btnEntrar = document.getElementById('btn-entrar');
const btnCurar = document.getElementById('btn-curar');
const btnPc = document.getElementById('btn-pc');

// Função padrão para fazer a animação de transição de telas
function transicaoParaOInterior() {
    fachada.classList.add('fachada-escondida');
    interior.classList.add('interior-visivel');
}

// Ação do Botão 1: Apenas Entrar
btnEntrar.addEventListener('click', () => {
    tituloInterior.innerText = "Bem-vindo ao Centro Pokémon!";
    mensagemInterior.innerText = "Você acabou de passar pelas portas automáticas. A Enfermeira Joy está sorrindo para você!";
    transicaoParaOInterior();
});

// Ação do Botão 2: Ir direto curar os Pokémons
btnCurar.addEventListener('click', () => {
    tituloInterior.innerText = "Balcão de Cura";
    mensagemInterior.innerText = "Por favor, coloque suas Pokébolas na máquina. Vamos restaurar a vida dos seus companheiros!";
    transicaoParaOInterior();
});

// Ação do Botão 3: Acessar o PC do Bill
btnPc.addEventListener('click', () => {
    tituloInterior.innerText = "PC do Bill Acessado";
    mensagemInterior.innerText = "Conectando ao sistema de armazenamento... Pronto! Qual Pokémon você quer retirar ou depositar?";
    transicaoParaOInterior();
});
