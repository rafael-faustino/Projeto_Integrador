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
     LEITOR DE TEXTO POR VOZ — LEITURA COMPLETA
  ========================================== */

  const ferramentas = document.querySelector(".access-tools");

  if ("speechSynthesis" in window && ferramentas) {
    const leitor = window.speechSynthesis;
    let partesDaLeitura = [];
    let indiceParte = 0;
    let lendo = false;
    let vozPortuguesa = null;

    // Cria os controles sem exigir alterações no HTML.
    const grupoLeitor = document.createElement("div");
    grupoLeitor.className = "voice-reader-tools";
    grupoLeitor.setAttribute("aria-label", "Leitor de texto por voz");

    grupoLeitor.innerHTML = `
      <button type="button" id="iniciarLeitor"
        aria-label="Ler todo o conteúdo do site em voz alta"
        title="Ouvir conteúdo">🔊 Ouvir</button>

      <button type="button" id="pausarLeitor"
        aria-label="Pausar leitura"
        title="Pausar leitura">⏸ Pausar</button>

      <button type="button" id="continuarLeitor"
        aria-label="Continuar leitura"
        title="Continuar leitura">▶ Continuar</button>

      <button type="button" id="pararLeitor"
        aria-label="Parar leitura"
        title="Parar leitura">⏹ Parar</button>
    `;

    ferramentas.appendChild(grupoLeitor);

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

    const statusLeitor = document.createElement("p");
    statusLeitor.className = "voice-reader-status";
    statusLeitor.setAttribute("aria-live", "polite");
    grupoLeitor.appendChild(statusLeitor);

    const iniciar = document.getElementById("iniciarLeitor");
    const pausar = document.getElementById("pausarLeitor");
    const continuar = document.getElementById("continuarLeitor");
    const parar = document.getElementById("pararLeitor");

    function escolherVoz() {
      const vozes = leitor.getVoices();

      vozPortuguesa =
        vozes.find(voz => voz.lang.toLowerCase() === "pt-br") ||
        vozes.find(voz => voz.lang.toLowerCase().startsWith("pt")) ||
        null;
    }

    escolherVoz();
    leitor.addEventListener?.("voiceschanged", escolherVoz);

    // Divide o conteúdo em trechos curtos para evitar que o navegador
    // interrompa a fala quando o texto é muito grande.
    function dividirTexto(texto, limite = 220) {
      const frases = texto
        .replace(/\s+/g, " ")
        .split(/(?<=[.!?;:])\s+/)
        .map(frase => frase.trim())
        .filter(Boolean);

      const resultado = [];
      let atual = "";

      frases.forEach(frase => {
        if (frase.length > limite) {
          if (atual) {
            resultado.push(atual);
            atual = "";
          }

          for (let i = 0; i < frase.length; i += limite) {
            resultado.push(frase.slice(i, i + limite));
          }
          return;
        }

        if ((atual + " " + frase).trim().length > limite) {
          if (atual) resultado.push(atual);
          atual = frase;
        } else {
          atual = (atual + " " + frase).trim();
        }
      });

      if (atual) resultado.push(atual);
      return resultado;
    }

    function obterTextoDoSite() {
      const seletores = [
        ".hero",
        ".welcome-strip",
        ".tab-panel",
        ".footer"
      ];

      const secoes = [];

      seletores.forEach(seletor => {
        document.querySelectorAll(seletor).forEach(secao => {
          // Clona a seção para retirar botões e elementos de interface
          // sem alterar o que aparece na página.
          const copia = secao.cloneNode(true);

          copia.querySelectorAll(
            "button, script, style, input, select, textarea, .voice-reader-tools"
          ).forEach(elemento => elemento.remove());

          const texto = (copia.innerText || copia.textContent || "")
            .replace(/\s+/g, " ")
            .trim();

          if (texto) secoes.push(texto);
        });
      });

      return secoes.join(". ");
    }

    function falarProximaParte() {
      if (!lendo || indiceParte >= partesDaLeitura.length) {
        if (indiceParte >= partesDaLeitura.length) {
          lendo = false;
          statusLeitor.textContent = "Leitura de todo o conteúdo finalizada.";
        }
        return;
      }

      const fala = new SpeechSynthesisUtterance(
        partesDaLeitura[indiceParte]
      );

      fala.lang = "pt-BR";
      fala.rate = 0.88;
      fala.pitch = 1;

      if (vozPortuguesa) fala.voice = vozPortuguesa;

      fala.onend = () => {
        indiceParte++;
        // Pequena pausa entre trechos para o navegador não cortar a sequência.
        window.setTimeout(falarProximaParte, 120);
      };

      fala.onerror = evento => {
        if (evento.error === "canceled" || evento.error === "interrupted") {
          return;
        }

        statusLeitor.textContent =
          "Houve um problema na leitura. Pressione Ouvir para tentar novamente.";
        lendo = false;
      };

      leitor.speak(fala);
    }

    iniciar.addEventListener("click", () => {
      leitor.cancel();

      const textoCompleto = obterTextoDoSite();
      partesDaLeitura = dividirTexto(textoCompleto);
      indiceParte = 0;

      if (!partesDaLeitura.length) {
        statusLeitor.textContent = "Não encontrei conteúdo para ler.";
        return;
      }

      escolherVoz();
      lendo = true;
      statusLeitor.textContent = "Lendo o conteúdo do site, incluindo todas as abas.";
      falarProximaParte();
    });

    pausar.addEventListener("click", () => {
      if (leitor.speaking && !leitor.paused) {
        leitor.pause();
        statusLeitor.textContent = "Leitura pausada.";
      }
    });

    continuar.addEventListener("click", () => {
      if (leitor.paused) {
        leitor.resume();
        statusLeitor.textContent = "Leitura continuada.";
      }
    });

    parar.addEventListener("click", () => {
      lendo = false;
      indiceParte = partesDaLeitura.length;
      leitor.cancel();
      statusLeitor.textContent = "Leitura encerrada.";
    });

  } else if (!("speechSynthesis" in window)) {
    console.warn("Este navegador não oferece suporte à leitura por voz.");
  }

});