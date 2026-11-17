document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTOS
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

    setTimeout(() => {
      capa.classList.add("hidden");
      transitionScreen.classList.remove("show");
      site.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "instant"
      });
    }, 2500);
  });

  // NAVEGAÇÃO ENTRE AS ABAS
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
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      abrirAba(button.dataset.tab);
    });
  });

  // ACESSIBILIDADE: TAMANHO DO TEXTO
  let tamanhoTexto = 16;

  document.getElementById("aumentarTexto").addEventListener("click", () => {
    tamanhoTexto = Math.min(tamanhoTexto + 1, 22);
    document.documentElement.style.setProperty("--base", `${tamanhoTexto}px`);
  });

  document.getElementById("diminuirTexto").addEventListener("click", () => {
    tamanhoTexto = Math.max(tamanhoTexto - 1, 12);
    document.documentElement.style.setProperty("--base", `${tamanhoTexto}px`);
  });

  // ALTO CONTRASTE
  document.getElementById("altoContraste").addEventListener("click", () => {
    document.body.classList.toggle("high-contrast");
  });

  // TEMA CLARO E ESCURO
  document.getElementById("trocarTema").addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
  });

  // CALCULADORA DE CALORIAS
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

  function calcularCalorias() {
    const caloriasPor100g = Number(alimento.value);
    const gramas = Number(quantidade.value);

    if (!Number.isFinite(gramas) || gramas <= 0) {
      resultado.innerHTML = `
        <span>ATENÇÃO</span>
        <strong>Valor inválido</strong>
        <small>Informe uma quantidade maior que zero.</small>
      `;
      quantidade.focus();
      return;
    }

    const total = (caloriasPor100g * gramas) / 100;

    resultado.innerHTML = `
      <span>RESULTADO</span>
      <strong>${total.toFixed(1).replace(".", ",")} kcal</strong>
      <small>Estimativa para ${gramas} gramas do alimento selecionado.</small>
    `;
  }
});