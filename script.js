function mudarAba(indexAlvo) {
    // 1. Seleciona os elementos da página
    const cards = document.querySelectorAll('.card-missao');
    const botoes = document.querySelectorAll('.nav-btn');
    const lente = document.getElementById('pokedexLens');
    const caixaTexto = document.getElementById('professorText');

    // 2. Remove o estado ativo de todas as abas
    cards.forEach(card => card.classList.remove('active'));
    botoes.forEach(btn => btn.classList.remove('active'));

    // 3. Adiciona o estado ativo apenas no que foi clicado
    cards[indexAlvo].classList.add('active');
    botoes[indexAlvo].classList.add('active');

    // 4. Cria o efeito visual de piscar a lente do topo
    lente.classList.add('lens-flash');
    setTimeout(() => {
        lente.classList.remove('lens-flash');
    }, 200);

    // 5. Atualiza o texto do terminal simulando o escaneamento
    const nomes = ["Fibra Óptica", "Câmera de Segurança", "Microscópio", "Sensor de Barreira"];
    caixaTexto.innerHTML = `&gt; ESCANEANDO: Dados do equipamento [${nomes[indexAlvo]}] carregados com sucesso na tela principal!`;
}
