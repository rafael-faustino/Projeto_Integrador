function iniciarCaptura() {
    const pokebola = document.getElementById('pokebola');
    const raio = document.getElementById('captureBeam');
    const telaIntro = document.getElementById('introScreen');
    const pokedex = document.getElementById('pokedexContainer');

    // 1. Faz a pokébola saltar e ativar a cor vermelha do botão
    pokebola.classList.add('pokebola-abrir');

    // 2. Dispara a expansão do raio de luz vermelha após 200 milissegundos
    setTimeout(() => {
        raio.classList.add('beam-active');
    }, 200);

    // 3. Esconde a intro e renderiza a Pokédex quando o raio cobrir a tela toda
    setTimeout(() => {
        telaIntro.style.opacity = '0';
        
        // Remove completamente a tela de introdução do fluxo após o fade-out
        setTimeout(() => {
            telaIntro.classList.add('hidden');
            pokedex.classList.remove('hidden');
        }, 500);

    }, 700);
}

function mudarAba(indexAlvo) {
    const cards = document.querySelectorAll('.data-card');
    const botoes = document.querySelectorAll('.nav-btn');
    const lenteAzul = document.getElementById('mainLens');
    const terminalTexto = document.getElementById('terminalTexto');

    cards.forEach(card => card.classList.remove('active'));
    botoes.forEach(btn => btn.classList.remove('active'));

    cards[indexAlvo].classList.add('active');
    botoes[indexAlvo].classList.add('active');

    lenteAzul.classList.add('lens-flash');
    setTimeout(() => {
        lenteAzul.classList.remove('lens-flash');
    }, 150);

    const nomesEquipamentos = ["Fibra Óptica", "Câmera de Segurança", "Microscópio", "Sensor de Barreira"];
    terminalTexto.innerHTML = `> ESCANEANDO ECOSSISTEMA...<br>> Dados do item [${nomesEquipamentos[indexAlvo]}] injetados com sucesso na tela principal.`;
}

