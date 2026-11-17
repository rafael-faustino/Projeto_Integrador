
document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS DA CAPA
    const cover = document.getElementById("capa");
    const enter = document.getElementById("entrarBtn");
    const site = document.getElementById("site");
    const spiders = document.getElementById("spiderTransition");


    // ANIMAÇÃO DAS ARANHAS
    if (cover && enter && site && spiders) {

        enter.addEventListener("click", () => {

            if (enter.disabled) return;

            enter.disabled = true;
            spiders.classList.add("active");

            setTimeout(() => {

                cover.classList.add("hidden");
                site.classList.remove("hidden");
                spiders.classList.remove("active");

                document.getElementById("conteudoPrincipal")?.focus();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }, 2900);

        });

    }


    // NAVEGAÇÃO ENTRE AS ABAS
    const tabButtons = document.querySelectorAll(".tab-button");
    const panels = document.querySelectorAll(".tab-panel");

    function abrirAba(button) {

        const id = button.dataset.tab;

        tabButtons.forEach(b => {

            const selecionado = b === button;

            b.classList.toggle("active", selecionado);
            b.setAttribute("aria-selected", String(selecionado));
            b.tabIndex = selecionado ? 0 : -1;

        });

        panels.forEach(panel => {

            const selecionado = panel.id === id;

            panel.classList.toggle("active-panel", selecionado);
            panel.setAttribute("aria-hidden", String(!selecionado));

        });

    }

    tabButtons.forEach((button, index) => {

        button.addEventListener("click", () => {
            abrirAba(button);
        });

        // Navegação pelas setas do teclado
        button.addEventListener("keydown", event => {

            let novoIndex = index;

            if (event.key === "ArrowRight") {
                novoIndex = (index + 1) % tabButtons.length;
            } else if (event.key === "ArrowLeft") {
                novoIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            } else if (event.key === "Home") {
                novoIndex = 0;
            } else if (event.key === "End") {
                novoIndex = tabButtons.length - 1;
            } else {
                return;
            }

            event.preventDefault();

            const novaAba = tabButtons[novoIndex];

            abrirAba(novaAba);
            novaAba.focus();

        });

    });


    // AUMENTAR E DIMINUIR TEXTO
    let size = 16;

    document.getElementById("aumentarTexto")?.addEventListener("click", () => {

        size = Math.min(24, size + 1);

        document.documentElement.style.setProperty(
            "--base",
            size + "px"
        );

    });

    document.getElementById("diminuirTexto")?.addEventListener("click", () => {

        size = Math.max(13, size - 1);

        document.documentElement.style.setProperty(
            "--base",
            size + "px"
        );

    });


    // ALTO CONTRASTE
    const contraste = document.getElementById("altoContraste");

    contraste?.addEventListener("click", () => {

        const ativo = document.body.classList.toggle("high-contrast");

        contraste.setAttribute("aria-pressed", String(ativo));

    });


    // TROCAR TEMA
    const tema = document.getElementById("trocarTema");

    tema?.addEventListener("click", () => {

        const ativo = document.body.classList.toggle("light-theme");

        tema.setAttribute("aria-pressed", String(ativo));

    });


    // ESPAÇAMENTO DO TEXTO
    const espacamento = document.getElementById("espacamentoTexto");

    espacamento?.addEventListener("click", () => {

        const ativo = document.body.classList.toggle("wide-spacing");

        espacamento.setAttribute("aria-pressed", String(ativo));

    });


    // REDUZIR MOVIMENTOS
    const movimento = document.getElementById("reduzirMovimento");

    movimento?.addEventListener("click", () => {

        const ativo = document.body.classList.toggle("reduce-motion");

        movimento.setAttribute("aria-pressed", String(ativo));

    });


    // LEITOR DE TEXTO EM VOZ ALTA
    const lerPagina = document.getElementById("lerPagina");
    const pausarLeitura = document.getElementById("pausarLeitura");
    const pararLeitura = document.getElementById("pararLeitura");
    const statusLeitura = document.getElementById("statusLeitura");

    let falaAtual = null;

    function atualizarControlesLeitura(lendo) {

        pausarLeitura.disabled = !lendo;
        pararLeitura.disabled = !lendo;

    }

    function obterTextoParaLeitura() {

        const introducao = document.querySelector(".intro");
        const abaAtiva = document.querySelector(".tab-panel.active-panel");

        let texto = "";

        if (introducao) {
            texto += introducao.innerText + ". ";
        }

        if (abaAtiva) {
            texto += abaAtiva.innerText;
        }

        return texto.trim();

    }

    if ("speechSynthesis" in window) {

        lerPagina?.addEventListener("click", () => {

            window.speechSynthesis.cancel();

            const texto = obterTextoParaLeitura();

            if (!texto) {
                statusLeitura.textContent = "Não há conteúdo disponível para leitura.";
                return;
            }

            falaAtual = new SpeechSynthesisUtterance(texto);

            falaAtual.lang = "pt-BR";
            falaAtual.rate = 0.9;
            falaAtual.pitch = 1;

            falaAtual.onstart = () => {

                statusLeitura.textContent = "Leitura iniciada.";
                atualizarControlesLeitura(true);

            };

            falaAtual.onend = () => {

                statusLeitura.textContent = "Leitura concluída.";
                atualizarControlesLeitura(false);

            };

            falaAtual.onerror = () => {

                statusLeitura.textContent = "Não foi possível realizar a leitura.";
                atualizarControlesLeitura(false);

            };

            window.speechSynthesis.speak(falaAtual);

        });

        pausarLeitura?.addEventListener("click", () => {

            if (window.speechSynthesis.speaking) {

                if (window.speechSynthesis.paused) {

                    window.speechSynthesis.resume();
                    pausarLeitura.textContent = "Pausar";
                    statusLeitura.textContent = "Leitura retomada.";

                } else {

                    window.speechSynthesis.pause();
                    pausarLeitura.textContent = "Continuar";
                    statusLeitura.textContent = "Leitura pausada.";

                }

            }

        });

        pararLeitura?.addEventListener("click", () => {

            window.speechSynthesis.cancel();

            statusLeitura.textContent = "Leitura interrompida.";
            pausarLeitura.textContent = "Pausar";

            atualizarControlesLeitura(false);

        });

    } else {

        if (lerPagina) {
            lerPagina.disabled = true;
            lerPagina.title = "Leitura em voz alta não disponível neste navegador.";
        }

        if (statusLeitura) {
            statusLeitura.textContent =
                "Este navegador não oferece suporte à leitura em voz alta.";
        }

    }


    // CALCULADORA DE CALORIAS
    const food = document.getElementById("alimento");
    const grams = document.getElementById("quantidade");
    const calc = document.getElementById("calcular");
    const output = document.getElementById("resultado");

    if (food && grams && calc && output) {

        const calculate = () => {

            const amount = Number(grams.value);

            if (grams.value.trim() === "" || !Number.isFinite(amount) || amount < 0) {

                output.textContent = "Digite uma quantidade válida.";
                return;

            }

            const total = Number(food.value) * amount / 100;

            output.textContent =
                "Resultado: " +
                total.toLocaleString("pt-BR", {
                    maximumFractionDigits: 1
                }) +
                " kcal";

        };

        calc.addEventListener("click", calculate);
        food.addEventListener("change", calculate);
        grams.addEventListener("input", calculate);

    }

});
