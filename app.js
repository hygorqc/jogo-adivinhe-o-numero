const numerosSorteados = [];
let limiteMax = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 })
}
function exibirMensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', `Escolha um número entre 1 e ${limiteMax}`);
}
exibirMensagemInicial();

function verificarChute() {
  let chute = document.querySelector('.container__input').value;
  if (chute == numeroSecreto) {
    exibirTextoNaTela('h1', 'Acertou!');
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}.`;
    exibirTextoNaTela('p', mensagemTentativas);
    document.querySelector('#reiniciar').removeAttribute('disabled');
    document.querySelector('.container__botao').setAttribute('disabled', true);
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O número secreto é menor.');
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior.');
    }
    limparCampo()
    tentativas++;
  }
}

function gerarNumeroAleatorio() {
  let numeroEsolhido = parseInt(Math.random() * limiteMax + 1);
  let quantidadeElementosNaLista = numerosSorteados.length;

  if (quantidadeElementosNaLista == limiteMax) {
    numerosSorteados = [];
  }

  if (numerosSorteados.includes(numeroEsolhido)) {
    return gerarNumeroAleatorio();
  } else {
    numerosSorteados.push(numeroEsolhido);
    return numeroEsolhido;
  }
}

function limparCampo() {
  let chute = document.querySelector('.container__input');
  chute.value = '';
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  exibirMensagemInicial();
  tentativas = 1;
  document.querySelector('.container__botao').removeAttribute('disabled');
  document.querySelector('#reiniciar').setAttribute('disabled', true);
}