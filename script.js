function abrirSite() {
    const botao = document.getElementById('btn-abrir');
    const pokebola = document.getElementById('tela-pokebola');
    const conteudo = document.getElementById('conteudo-principal');

    // 1. Faz o botão central pulsar em vermelho simulação de captura/ativação
    botao.classList.add('piscando');

    // 2. Aguarda a pulsação terminar para disparar as divisões e o raio
    setTimeout(() => {
        pokebola.classList.add('aberta');
        conteudo.classList.add('visivel');
    }, 600);

    // 3. Limpa a tela de bloqueio do DOM após a conclusão completa da animação física
    setTimeout(() => {
        pokebola.style.display = 'none';
    }, 1800);
}

function fecharSite() {
    // Função utilitária para resetar a animação caso queira voltar para a Pokébola
    const pokebola = document.getElementById('tela-pokebola');
    const conteudo = document.getElementById('conteudo-principal');
    const botao = document.getElementById('btn-abrir');

    botao.classList.remove('piscando');
    pokebola.classList.remove('aberta');
    conteudo.classList.remove('visivel');
    pokebola.style.display = 'flex';
}
