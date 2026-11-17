
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

            // Inicia a animação
            spiders.classList.add("active");

            // Aguarda todas as aranhas atravessarem
            setTimeout(() => {

                cover.classList.add("hidden");
                site.classList.remove("hidden");

                spiders.classList.remove("active");

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

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            const id = button.dataset.tab;

            tabButtons.forEach(b => {
                b.classList.toggle("active", b === button);
            });

            panels.forEach(panel => {
                panel.classList.toggle(
                    "active-panel",
                    panel.id === id
                );
            });

        });

    });


    // AUMENTAR E DIMINUIR TEXTO
    let size = 16;

    document.getElementById("aumentarTexto")?.addEventListener("click", () => {

        size = Math.min(22, size + 1);

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
    document.getElementById("altoContraste")?.addEventListener("click", () => {

        document.body.classList.toggle("high-contrast");

    });


    // TROCAR TEMA
    document.getElementById("trocarTema")?.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

    });


    // CALCULADORA DE CALORIAS
    const food = document.getElementById("alimento");
    const grams = document.getElementById("quantidade");
    const calc = document.getElementById("calcular");
    const output = document.getElementById("resultado");


    if (food && grams && calc && output) {

        const calculate = () => {

            const amount = Number(grams.value);

            if (!Number.isFinite(amount) || amount < 0) {

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
