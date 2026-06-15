// =========================================
// ESCAPE ROOM - JOGO INTERATIVO
// Desenvolvedor: Gustavo Douglas Nunes V.
// =========================================

// =========================================
// SALA 1 - Codigo do cadeado: 742
// =========================================
function investigar(objeto) {
  const pista = document.getElementById('pista');
  const mensagens = {
    quadro: "Atras do quadro ha um numero rabiscado: 7",
    cama: "Embaixo do travesseiro voce encontra um bilhete: 'segundo numero = 4'",
    tapete: "O tapete esta empoeirado, nada de util aqui.",
    livro: "Uma pagina marcada mostra o numero: 2"
  };
  pista.style.display = 'block';
  pista.innerText = mensagens[objeto];
}

function verificarCodigo() {
  const codigo = document.getElementById('codigo').value;
  const resultado = document.getElementById('resultado');
  if (codigo === '742') {
    resultado.innerHTML = '<div class="alert alert-success">Porta aberta! Indo para a Sala 2...</div>';
    setTimeout(() => window.location.href = 'sala2.html', 1500);
  } else {
    resultado.innerHTML = '<div class="alert alert-danger">Codigo errado! Tente de novo.</div>';
  }
}

// =========================================
// SALA 2 - Palavra secreta: FUGIR
// =========================================
function abrirLivro(num) {
  const letras = document.getElementById('letras');
  const livros = {
    1: "Letra encontrada: F",
    2: "Letra encontrada: U",
    3: "Pagina em branco... nada aqui.",
    4: "Letra encontrada: G",
    5: "Letras encontradas no fim do livro: IR"
  };
  letras.style.display = 'block';
  letras.innerText = livros[num];
}

function verificarPalavra() {
  const palavra = document.getElementById('palavra').value.toUpperCase().trim();
  const resultado = document.getElementById('resultado');
  if (palavra === 'FUGIR') {
    resultado.innerHTML = '<div class="alert alert-success">Palavra correta! Indo para a Sala 3...</div>';
    setTimeout(() => window.location.href = 'sala3.html', 1500);
  } else {
    resultado.innerHTML = '<div class="alert alert-danger">Palavra errada! Continue procurando.</div>';
  }
}

// =========================================
// SALA 3 - Sequencia: sol -> lua -> estrela
// =========================================
let sequenciaAtual = [];
const sequenciaCorreta = ['sol', 'lua', 'estrela'];

function puxarAlavanca(nome) {
  if (sequenciaAtual.includes(nome)) return;
  sequenciaAtual.push(nome);
  document.getElementById('sequencia').innerText = sequenciaAtual.join(' -> ').toUpperCase();

  const botoes = document.querySelectorAll('.alavanca');
  botoes.forEach(b => {
    if (b.innerText.toLowerCase().includes(nome)) b.classList.add('ativada');
  });

  if (sequenciaAtual.length === 3) {
    verificarSequencia();
  }
}

function verificarSequencia() {
  const resultado = document.getElementById('resultado');
  const correto = sequenciaAtual.every((v, i) => v === sequenciaCorreta[i]);
  if (correto) {
    resultado.innerHTML = '<div class="alert alert-success">A porta se abre! Voce escapou!</div>';
    setTimeout(() => window.location.href = 'vitoria.html', 1800);
  } else {
    resultado.innerHTML = '<div class="alert alert-danger">Sequencia errada! Resetando...</div>';
    setTimeout(resetarSequencia, 1500);
  }
}

function resetarSequencia() {
  sequenciaAtual = [];
  document.getElementById('sequencia').innerText = '(nenhuma)';
  document.getElementById('resultado').innerHTML = '';
  document.querySelectorAll('.alavanca').forEach(b => b.classList.remove('ativada'));
}
