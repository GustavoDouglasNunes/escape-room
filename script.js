// =========================================
// ESCAPE ROOM - JOGO INTERATIVO
// Desenvolvedor: Gustavo Douglas Nunes V.
// =========================================

// Helper para padronizar alertas visuais customizados no Tailwind
function exibirAlerta(elemento, tipo, mensagem) {
  elemento.innerHTML = `<div class="p-4 rounded-lg border font-medium ${
    tipo === "sucesso"
      ? "bg-green-950/40 text-green-400 border-green-800"
      : "bg-red-950/40 text-red-400 border-red-800"
  }">${mensagem}</div>`;
}

// =========================================
// SALA 1 - Código do cadeado: 742
// =========================================
function investigar(objeto) {
  const pista = document.getElementById("pista");
  const mensagens = {
    quadro: "🖼️ Atrás do quadro há um número rabiscado: 7",
    cama: "🛏️ Embaixo do travesseiro você encontra um bilhete: 'segundo número = 4'",
    tapete: "🧹 O tapete está empoeirado, nada de útil aqui.",
    livro: "📖 Uma página marcada mostra o número: 2",
  };

  if (mensagens[objeto]) {
    pista.innerText = mensagens[objeto];
    pista.classList.remove("hidden");
  }
}

function verificarCodigo() {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");

  if (codigo === "742") {
    exibirAlerta(
      resultado,
      "sucesso",
      "🎉 Porta aberta! Indo para a Sala 2...",
    );
    setTimeout(() => (window.location.href = "sala2.html"), 1500);
  } else {
    exibirAlerta(resultado, "erro", "❌ Código errado! Tente de novo.");
  }
}

// =========================================
// SALA 2 - Palavra secreta: FUGIR
// =========================================
function abrirLivro(num) {
  const letras = document.getElementById("letras");
  const livros = {
    1: "🔤 Letra encontrada: F",
    2: "🔤 Letra encontrada: U",
    3: "📖 Página em branco... nada aqui.",
    4: "🔤 Letra encontrada: G",
    5: "🔤 Letras encontradas no fim do livro: IR",
  };

  if (livros[num]) {
    letras.innerText = livros[num];
    letras.classList.remove("hidden");
  }
}

function verificarPalavra() {
  const palavra = document.getElementById("palavra").value.toUpperCase().trim();
  const resultado = document.getElementById("resultado");

  if (palavra === "FUGIR") {
    exibirAlerta(
      resultado,
      "sucesso",
      "🎉 Palavra correta! Indo para a Sala 3...",
    );
    setTimeout(() => (window.location.href = "sala3.html"), 1500);
  } else {
    exibirAlerta(resultado, "erro", "❌ Palavra errada! Continue procurando.");
  }
}

// =========================================
// SALA 3 - Sequência: sol -> lua -> estrela
// =========================================
let sequenciaAtual = [];
const sequenciaCorreta = ["sol", "lua", "estrela"];

function puxarAlavanca(nome) {
  if (sequenciaAtual.includes(nome)) return;
  sequenciaAtual.push(nome);
  document.getElementById("sequencia").innerText = sequenciaAtual
    .join(" ➡️ ")
    .toUpperCase();

  // Seleciona o botão específico da alavanca e aplica a classe ativa do Tailwind
  const botaoAtivo = document.getElementById(`btn-${nome}`);
  if (botaoAtivo) {
    botaoAtivo.classList.remove("bg-transparent", "text-yellow-500");
    botaoAtivo.classList.add("bg-yellow-500", "text-black");
  }

  if (sequenciaAtual.length === 3) {
    // Pequeno delay para o usuário conseguir ver o último clique acontecer antes do alerta
    setTimeout(verificarSequencia, 300);
  }
}

function verificarSequencia() {
  const resultado = document.getElementById("resultado");
  const correto = sequenciaAtual.every((v, i) => v === sequenciaCorreta[i]);

  if (correto) {
    exibirAlerta(resultado, "sucesso", "🎉 A porta se abre! Você escapou!");
    setTimeout(() => (window.location.href = "vitoria.html"), 1800);
  } else {
    exibirAlerta(resultado, "erro", "❌ Sequência errada! Resetando...");
    setTimeout(resetarSequencia, 1500);
  }
}

function resetarSequencia() {
  sequenciaAtual = [];
  document.getElementById("sequencia").innerText = "(nenhuma)";
  document.getElementById("resultado").innerHTML = "";

  // Limpa os estados de cores de todas as alavancas voltando para o estado padrão
  const ids = ["btn-sol", "btn-lua", "btn-estrela"];
  ids.forEach((id) => {
    const b = document.getElementById(id);
    if (b) {
      b.classList.remove("bg-yellow-500", "text-black");
      b.classList.add("bg-transparent", "text-yellow-500");
    }
  });
}
