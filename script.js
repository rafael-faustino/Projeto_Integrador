
document.addEventListener("DOMContentLoaded", () => {
  const capa = document.getElementById("capa");
  const entrarBtn = document.getElementById("entrarBtn");
  const site = document.getElementById("site");
  const transitionScreen = document.getElementById("transitionScreen");

  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");

  // ENTRADA DO SITE
  entrarBtn.addEventListener("click", () => {
    entrarBtn.disabled = true;
    transitionScreen.classList.add("show");
    transitionScreen.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      capa.classList.add("hidden");
      transitionScreen.classList.remove("show");
      transitionScreen.setAttribute("aria-hidden", "true");
      site.classList.remove("hidden");

      window.scrollTo({ top: 0, behavior: "smooth" });
      document.querySelector(".topbar").focus?.();
    }, 2500);
  });

  // NAVEGAÇÃO ENTRE ABAS
  function abrirAba(nomeAba) {
    tabPanels.forEach((panel) => {
      const ativo = panel.id === nomeAba;

      panel.classList.toggle("active", ativo);
      panel.hidden = !ativo;
    });

    tabButtons.forEach((button) => {
      const ativo = button.dataset.tab === nomeAba;

      button.classList.toggle("active", ativo);
      button.setAttribute("aria-selected", String(ativo));
      button.tabIndex = ativo ? 0 : -1;
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      abrirAba(button.dataset.tab);
    });
  });

  // TAMANHO DO TEXTO
  let tamanhoTexto = 16;

  const aumentarTexto = document.getElementById("aumentarTexto");
  const diminuirTexto = document.getElementById("diminuirTexto");

  function atualizarTexto() {
    document.documentElement.style.setProperty(
      "--base",
      `${tamanhoTexto}px`
    );
  }

  aumentarTexto.addEventListener("click", () => {
    tamanhoTexto = Math.min(tamanhoTexto + 1, 22);
    atualizarTexto();
  });

  diminuirTexto.addEventListener("click", () => {
    tamanhoTexto = Math.max(tamanhoTexto - 1, 12);
    atualizarTexto();
  });

  // ALTO CONTRASTE
  const altoContraste = document.getElementById("altoContraste");

  altoContraste.addEventListener("click", () => {
    const ativo = document.body.classList.toggle("high-contrast");
    altoContraste.setAttribute("aria-pressed", String(ativo));
  });

  // TEMA CLARO E ESCURO
  const trocarTema = document.getElementById("trocarTema");

  trocarTema.addEventListener("click", () => {
    const ativo = document.body.classList.toggle("light-theme");
    trocarTema.setAttribute("aria-pressed", String(ativo));
  });

  // CALCULADORA
  const alimento = document.getElementById("alimento");
  const quantidade = document.getElementById("quantidade");
  const calcularBtn = document.getElementById("calcularBtn");
  const resultado = document.getElementById("resultado");

  calcularBtn.addEventListener("click", calcularCalorias);

  quantidade.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      calcularCalorias();
    }
  });

  function mostrarResultado(titulo, valor, descricao) {
    resultado.replaceChildren();

    const legenda = document.createElement("span");
    legenda.textContent = titulo;

    const valorElemento = document.createElement("strong");
    valorElemento.textContent = valor;

    const detalhe = document.createElement("small");
    detalhe.textContent = descricao;

    resultado.append(legenda, valorElemento, detalhe);
  }

  function calcularCalorias() {
    const caloriasPor100g = Number(alimento.value);
    const gramas = Number(quantidade.value);

    if (
      quantidade.value.trim() === "" ||
      !Number.isFinite(gramas) ||
      gramas <= 0
    ) {
      mostrarResultado(
        "ATENÇÃO",
        "Valor inválido",
        "Informe uma quantidade maior que zero."
      );

      quantidade.focus();
      return;
    }

    const total = (caloriasPor100g * gramas) / 100;

    mostrarResultado(
      "RESULTADO",
      `${total.toFixed(1).replace(".", ",")} kcal`,
      `Estimativa para ${gramas} gramas do alimento selecionado.`
    );
  }
});
