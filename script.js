
/* ==========================================
   UM NOVO DIA | UCHIHA EDITION
   JavaScript completo + leitor de voz
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const entrarBtn = document.getElementById("entrarBtn");
  const capa = document.getElementById("capa");
  const site = document.getElementById("site");
  const transitionScreen = document.getElementById("transitionScreen");

  /* ==========================================
     ENTRADA DO SITE
  ========================================== */

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


  /* ==========================================
     NAVEGAÇÃO POR ABAS
  ========================================== */

  const tabButtons = [...document.querySelectorAll(".tab-button")];
  const panels = [...document.querySelectorAll(".tab-panel")];

  function abrirAba(id, button) {

    // Interrompe a leitura ao trocar de aba
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

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


  /* ==========================================
     TAMANHO DO TEXTO
  ========================================== */

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


  /* ==========================================
     ALTO CONTRASTE
  ========================================== */

  const contrasteBtn = document.getElementById("altoContraste");

  contrasteBtn?.addEventListener("click", () => {

    const ativo = document.body.classList.toggle("high-contrast");

    contrasteBtn.setAttribute("aria-pressed", String(ativo));
  });


  /* ==========================================
     TEMA CLARO E ESCURO
  ========================================== */

  const temaBtn = document.getElementById("trocarTema");

  temaBtn?.addEventListener("click", () => {

    const claro = document.body.classList.toggle("light-theme");

    temaBtn.setAttribute("aria-pressed", String(claro));

    temaBtn.setAttribute(
      "aria-label",
      claro ? "Ativar tema escuro" : "Ativar tema claro"
    );
  });


  /* ==========================================
     CALCULADORA DE CALORIAS
  ========================================== */

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
    if (event.key === "Enter") calcularCalorias();
  });


  /* ==========================================
     LEITOR DE TEXTO POR VOZ
  ========================================== */

  const ferramentas = document.querySelector(".access-tools");

  if ("speechSynthesis" in window && ferramentas) {

    // Cria os botões automaticamente
    const grupoLeitor = document.createElement("div");

    grupoLeitor.className = "voice-reader-tools";
    grupoLeitor.setAttribute("aria-label", "Leitor de texto por voz");

    grupoLeitor.innerHTML = `
      <button type="button" id="iniciarLeitor"
        aria-label="Ler conteúdo da página em voz alta"
        title="Ouvir conteúdo">
        🔊 Ouvir
      </button>

      <button type="button" id="pausarLeitor"
        aria-label="Pausar leitura"
        title="Pausar leitura">
        ⏸ Pausar
      </button>

      <button type="button" id="continuarLeitor"
        aria-label="Continuar leitura"
        title="Continuar leitura">
        ▶ Continuar
      </button>

      <button type="button" id="pararLeitor"
        aria-label="Parar leitura"
        title="Parar leitura">
        ⏹ Parar
      </button>
    `;

    ferramentas.appendChild(grupoLeitor);

    // Pequenos ajustes visuais dos botões
    const estiloLeitor = document.createElement("style");

    estiloLeitor.textContent = `
      .voice-reader-tools {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin-top: 8px;
      }

      .voice-reader-tools button {
        cursor: pointer;
        font: inherit;
        padding: 9px 12px;
        border: 1px solid currentColor;
        border-radius: 8px;
        background: transparent;
        color: inherit;
      }

      .voice-reader-tools button:focus-visible {
        outline: 3px solid #ffcc00;
        outline-offset: 3px;
      }

      .voice-reader-tools button:hover {
        opacity: 0.8;
      }

      .voice-reader-status {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;

    document.head.appendChild(estiloLeitor);

    // Área de aviso para tecnologias assistivas
    const statusLeitor = document.createElement("p");

    statusLeitor.className = "voice-reader-status";
    statusLeitor.setAttribute("aria-live", "polite");

    grupoLeitor.appendChild(statusLeitor);

    const iniciar = document.getElementById("iniciarLeitor");
    const pausar = document.getElementById("pausarLeitor");
    const continuar = document.getElementById("continuarLeitor");
    const parar = document.getElementById("pararLeitor");

    // Iniciar leitura
    iniciar.addEventListener("click", () => {

      window.speechSynthesis.cancel();

      const abaAtiva = document.querySelector(
        ".tab-panel:not([hidden])"
      );

      const hero = document.querySelector(".hero");
      const boasVindas = document.querySelector(".welcome-strip");
      const rodape = document.querySelector(".footer");

      let texto = "";

      if (hero) texto += hero.innerText + ". ";
      if (boasVindas) texto += boasVindas.innerText + ". ";
      if (abaAtiva) texto += abaAtiva.innerText + ". ";
      if (rodape) texto += rodape.innerText;

      if (!texto.trim()) {
        statusLeitor.textContent = "Nenhum conteúdo disponível para leitura.";
        return;
      }

      const leitura = new SpeechSynthesisUtterance(texto);

      leitura.lang = "pt-BR";
      leitura.rate = 0.9;
      leitura.pitch = 1;

      leitura.onstart = () => {
        statusLeitor.textContent = "Leitura iniciada.";
      };

      leitura.onend = () => {
        statusLeitor.textContent = "Leitura finalizada.";
      };

      leitura.onerror = () => {
        statusLeitor.textContent = "Não foi possível realizar a leitura.";
      };

      window.speechSynthesis.speak(leitura);
    });

    // Pausar leitura
    pausar.addEventListener("click", () => {

      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        statusLeitor.textContent = "Leitura pausada.";
      }
    });

    // Continuar leitura
    continuar.addEventListener("click", () => {

      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        statusLeitor.textContent = "Leitura continuada.";
      }
    });

    // Parar leitura
    parar.addEventListener("click", () => {

      window.speechSynthesis.cancel();
      statusLeitor.textContent = "Leitura encerrada.";
    });

  } else if (!("speechSynthesis" in window)) {

    console.warn("Este navegador não oferece suporte à leitura por voz.");

  }

});
