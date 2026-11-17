/* UM NOVO DIA | UCHIHA EDITION */

document.addEventListener("DOMContentLoaded", () => {
  const entrarBtn = document.getElementById("entrarBtn");
  const capa = document.getElementById("capa");
  const site = document.getElementById("site");
  const transitionScreen = document.getElementById("transitionScreen");

  // Entrada do site
  entrarBtn?.addEventListener("click", () => {
    entrarBtn.disabled = true;
    transitionScreen?.classList.add("show");

    window.setTimeout(() => {
      capa?.classList.add("hidden");
      transitionScreen?.classList.remove("show");
      site?.classList.remove("hidden");

      document.getElementById("inicio")?.scrollIntoView({
        behavior: "smooth"
      });

      document.querySelector(".skip-link")?.setAttribute("href", "#inicio");
    }, 2500);
  });

  // Navegação por abas
  const tabButtons = [...document.querySelectorAll(".tab-button")];
  const panels = [...document.querySelectorAll(".tab-panel")];

  function abrirAba(id, button) {
    panels.forEach(panel => {
      const ativo = panel.id === id;
      panel.hidden = !ativo;
      panel.classList.toggle("active", ativo);
    });

    tabButtons.forEach(tab => {
      const ativo = tab === button;
      tab.classList.toggle("active", ativo);
      tab.setAttribute("aria-selected", String(ativo));
      tab.setAttribute("tabindex", ativo ? "0" : "-1");
    });
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      abrirAba(button.dataset.tab, button);
    });

    button.addEventListener("keydown", event => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
        return;
      }

      event.preventDefault();
      let next = index;

      if (event.key === "ArrowRight") {
        next = (index + 1) % tabButtons.length;
      }

      if (event.key === "ArrowLeft") {
        next = (index - 1 + tabButtons.length) % tabButtons.length;
      }

      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabButtons.length - 1;

      tabButtons[next].focus();
      abrirAba(tabButtons[next].dataset.tab, tabButtons[next]);
    });
  });

  // Aumentar e diminuir texto
  let tamanhoBase = 16;

  const aplicarTamanho = () => {
    document.documentElement.style.setProperty(
      "--base",
      `${tamanhoBase}px`
    );
  };

  document.getElementById("aumentarTexto")?.addEventListener("click", () => {
    tamanhoBase = Math.min(22, tamanhoBase + 1);
    aplicarTamanho();
  });

  document.getElementById("diminuirTexto")?.addEventListener("click", () => {
    tamanhoBase = Math.max(13, tamanhoBase - 1);
    aplicarTamanho();
  });

  // Alto contraste
  const contrasteBtn = document.getElementById("altoContraste");

  contrasteBtn?.addEventListener("click", () => {
    const ativo = document.body.classList.toggle("high-contrast");
    contrasteBtn.setAttribute("aria-pressed", String(ativo));
  });

  // Tema claro e escuro
  const temaBtn = document.getElementById("trocarTema");

  temaBtn?.addEventListener("click", () => {
    const claro = document.body.classList.toggle("light-theme");

    temaBtn.setAttribute("aria-pressed", String(claro));
    temaBtn.setAttribute(
      "aria-label",
      claro ? "Ativar tema escuro" : "Ativar tema claro"
    );
  });

  // Calculadora de calorias
  const calcularBtn = document.getElementById("calcularBtn");
  const alimento = document.getElementById("alimento");
  const quantidade = document.getElementById("quantidade");
  const resultado = document.getElementById("resultado");

  function calcularCalorias() {
    const gramas = Number(quantidade?.value);
    const kcalPor100g = Number(alimento?.value);

    if (!Number.isFinite(gramas) || gramas <= 0) {
      resultado.innerHTML = `
        <span>ATENÇÃO</span>
        <strong>Informe a quantidade</strong>
        <small>Digite um valor em gramas maior que zero.</small>
      `;

      quantidade?.focus();
      return;
    }

    const kcal = (kcalPor100g * gramas) / 100;
    const nome = alimento?.selectedOptions[0]?.textContent ?? "Alimento";

    resultado.innerHTML = `
      <span>RESULTADO</span>
      <strong>${kcal.toLocaleString("pt-BR", {
        maximumFractionDigits: 1
      })} kcal</strong>
      <small>${nome} — ${gramas.toLocaleString("pt-BR")} g</small>
    `;
  }

  calcularBtn?.addEventListener("click", calcularCalorias);

  quantidade?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      calcularCalorias();
    }
  });
});