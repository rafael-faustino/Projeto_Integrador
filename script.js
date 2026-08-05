const musica = document.getElementById('musica-tema');
const btnSom = document.getElementById('btn-som');

function abrirSite() {
    const botao = document.getElementById('btn-abrir');
    const pokebola = document.getElementById('tela-pokebola');

    // 1. Inicia a pulsação luminosa no botão central
    botao.classList.add('piscando');

    // Tenta iniciar a trilha sonora imediatamente após o clique físico do usuário
    tocarMusica();

    // 2. Executa a abertura física da Pokébola e o disparo do raio após o piscar
    setTimeout(() => {
        pokebola.classList.add('aberta');
    }, 600);

    // 3. Remove a interatividade da camada para que o usuário clique no dashboard tranquilamente
    setTimeout(() => {
        pokebola.style.display = 'none';
    }, 1800);
}

function fecharSite() {
    const pokebola = document.getElementById('tela-pokebola');
    const botao = document.getElementById('btn-abrir');

    // Para a música ao sair do site
    musica.pause();
    musica.currentTime = 0;

    // Reseta os estados visuais das transições
    pokebola.style.display = 'flex';
    botao.classList.remove('piscando');
    
    // Pequeno delay para renderizar o display flex antes de fechar os painéis fisicamente
    setTimeout(() => {
        pokebola.classList.remove('aberta');
    }, 50);
}

function tocarMusica() {
    musica.volume = 0.3; // Define um volume confortável (30%)
    musica.play().catch(error => {
        console.log("O navegador bloqueou a reprodução automática. O som tocará ao interagir.");
    });
}

function alternarSom() {
    if (musica.paused) {
        musica.play();
        btnSom.innerText = "🎵 Som: Ligado";
        btnSom.style.backgroundColor = "#232323";
        btnSom.style.color = "white";
    } else {
        musica.pause();
        btnSom.innerText = "🔇 Som: Mutado";
        btnSom.style.backgroundColor = "#555";
        btnSom.style.color = "#aaa";
    }
}
