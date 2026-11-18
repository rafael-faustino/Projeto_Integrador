
/* UM NOVO DIA | UCHIHA EDITION */

document.addEventListener("DOMContentLoaded", () => {
  const entrarBtn = document.getElementById("entrarBtn");
  const capa = document.getElementById("capa");
  const site = document.getElementById("site");
  const transitionScreen = document.getElementById("transitionScreen");

  // ENTRADA DO SITE
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

      document.querySelector(".skip-link")
        ?.setAttribute("href", "#inicio");
    }, 2500);
  });

  // LEITURA EM VOZ ALTA
  const lerBtn = document.getElementById("lerPagina");
  const pararBtn = document.getElementById("pararLeitura");
  const statusLeitura = document.getElementById("statusLeitura");

  let falaAtual = null;

  function atualizarControlesLeitura(lendo) {
    if (lerBtn) lerBtn.disabled = lendo;
    if (pararBtn) pararBtn.disabled = !lendo;
  }

  function pararLeitura(mensagem = "Leitura interrompida.") {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    falaAtual = null;
    atualizarControlesLeitura(false);

    if (statusLeitura) {
      statusLeitura.textContent = mensagem;
    }
  }

  lerBtn?.addEventListener("click", () => {
    if (!("speechSynthesis" in window)) {
      if (statusLeitura) {
        statusLeitura.textContent =
          "Este navegador não oferece suporte à leitura em voz alta.";
      }
      return;
    }

    window.speechSynthesis.cancel();

    const hero = document.querySelector(".hero");

    const painelAtivo = document.querySelector(
      ".tab-panel.active:not([hidden])"
    );

    const texto = [
      hero?.innerText,
      painelAtivo?.innerText
    ]
      .filter(Boolean)
      .join(". ")
      .replace(/\s+/g, " ")
      .trim();

    if (!texto) {
      if (statusLeitura) {
        statusLeitura.textContent =
          "Não há conteúdo disponível para leitura.";
      }
      return;
    }

    falaAtual = new SpeechSynthesisUtterance(texto);

    falaAtual.lang = "pt-BR";
    falaAtual.rate = 1;
    falaAtual.pitch = 1;

    falaAtual.onstart = () => {
      atualizarControlesLeitura(true);

      if (statusLeitura) {
        statusLeitura.textContent =
          "Leitura em voz alta iniciada.";
      }
    };

    falaAtual.onend = () => {
      falaAtual = null;
      atualizarControlesLeitura(false);

      if (statusLeitura) {
        statusLeitura.textContent = "Leitura concluída.";
      }
    };

    falaAtual.onerror = () => {
      falaAtual = null;
      atualizarControlesLeitura(false);

      if (statusLeitura) {
        statusLeitura.textContent =
          "Não foi possível realizar a leitura.";
      }
    };

    atualizarControlesLeitura(true);
    window.speechSynthesis.speak(falaAtual);
  });

  pararBtn?.addEventListener("click", () => {
    pararLeitura();
  });

  // NAVEGAÇÃO POR ABAS
  const tabButtons = [
    ...document.querySelectorAll(".tab-button")
  ];

  const panels = [
    ...document.querySelectorAll(".tab-panel")
  ];

  function abrirAba(id, button) {
    if (
      "speechSynthesis" in window &&
      window.speechSynthesis.speaking
    ) {
      pararLeitura(
        "Leitura interrompida porque a aba foi alterada."
      );
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
      if (
        !["ArrowRight", "ArrowLeft", "Home", "End"]
          .includes(event.key)
      ) {
        return;
      }

      event.preventDefault();

      let next = index;

      if (event.key === "ArrowRight") {
        next = (index + 1) % tabButtons.length;
      }

      if (event.key === "ArrowLeft") {
        next = (index - 1 + tabButtons.length)
          % tabButtons.length;
      }

      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabButtons.length - 1;

      tabButtons[next].focus();

      abrirAba(
        tabButtons[next].dataset.tab,
        tabButtons[next]
      );
    });
  });

  // AUMENTAR E DIMINUIR TEXTO
  let tamanhoBase = 16;

  const aplicarTamanho = () => {
    document.documentElement.style.setProperty(
      "--base",
      `${tamanhoBase}px`
    );
  };

  document.getElementById("aumentarTexto")
    ?.addEventListener("click", () => {
      tamanhoBase = Math.min(22, tamanhoBase + 1);
      aplicarTamanho();
    });

  document.getElementById("diminuirTexto")
    ?.addEventListener("click", () => {
      tamanhoBase = Math.max(13, tamanhoBase - 1);
      aplicarTamanho();
    });

  // ALTO CONTRASTE
  const contrasteBtn = document.getElementById("altoContraste");

  contrasteBtn?.addEventListener("click", () => {
    const ativo = document.body.classList.toggle("high-contrast");

    contrasteBtn.setAttribute(
      "aria-pressed",
      String(ativo)
    );
  });

  // TEMA CLARO E ESCURO
  const temaBtn = document.getElementById("trocarTema");

  temaBtn?.addEventListener("click", () => {
    const claro = document.body.classList.toggle("light-theme");

    temaBtn.setAttribute("aria-pressed", String(claro));

    temaBtn.setAttribute(
      "aria-label",
      claro ? "Ativar tema escuro" : "Ativar tema claro"
    );
  });

  // CALCULADORA DE CALORIAS
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

    const nome =
      alimento?.selectedOptions[0]?.textContent ?? "Alimento";

    resultado.innerHTML = `
      <span>RESULTADO</span>
      <strong>
        ${kcal.toLocaleString("pt-BR", {
          maximumFractionDigits: 1
        })} kcal
      </strong>
      <small>
        ${nome} — ${gramas.toLocaleString("pt-BR")} g
      </small>
    `;
  }

  calcularBtn?.addEventListener("click", calcularCalorias);

  quantidade?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      calcularCalorias();
    }
  });
});
