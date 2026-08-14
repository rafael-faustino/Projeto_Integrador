function dispararCaptura() {
    const pokebola = document.getElementById('pokebola');
    const raio = document.getElementById('raioSugador');
    const telaIntro = document.getElementById('telaIntro');
    const pokedexApp = document.getElementById('pokedexApp');

    // 1. Faz a pokébola dar o salto/pulo
    pokebola.classList.add('pokebola-saltar');

    // 2. Dispara o raio vermelho logo em seguida (200ms)
    setTimeout(() => {
        raio.classList.add('raio-ativo');
    }, 200);

    // 3. Remove a tela de introdução e exibe a Pokédex após o feixe cobrir os olhos do usuário
    setTimeout(() => {
        telaIntro.style.transition = "opacity 0.3s";
        telaIntro.style.opacity = "0";
        
        setTimeout(() => {
            telaIntro.classList.add('escondido');
            pokedexApp.classList.remove('escondido');
        }, 300);

    }, 700);
}
