/* main.js */

// Variáveis globais simuladas para demonstração
let saldoUsuario = 10000; // Saldo inicial
let historicoInvestimentos = [
  { nome: "Impressora HP Deskjet 5107", ganhoDiario: 500 },
  { nome: "Impressora Canon PXM", ganhoDiario: 1100 },
];

// Função para atualizar o saldo na área do usuário
function atualizarSaldo() {
  const saldoDisplay = document.getElementById('saldo');
  if (saldoDisplay) {
    saldoDisplay.textContent = `${saldoUsuario} kz`;
  }
}

// Validação de formulário de login
document.getElementById('login-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const contacto = document.getElementById('contacto').value;
  const senha = document.getElementById('senha').value;
  if (contacto && senha) {
    alert('Login bem-sucedido!');
    window.location.href = 'home.html'; // Redirecionar para a página inicial
  } else {
    alert('Por favor, preencha todos os campos!');
  }
});

// Validação de formulário de cadastro
document.getElementById('cadastro-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const contacto = document.getElementById('contacto').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmar-senha').value;
  const codigoConvite = document.getElementById('codigo-convite').value;

  if (contacto && senha === confirmarSenha && codigoConvite) {
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html'; // Redirecionar para o login
  } else {
    alert('Por favor, verifique os campos preenchidos!');
  }
});

// Interações na página de recarga
document.querySelectorAll('.amount-btn')?.forEach(button => {
  button.addEventListener('click', function () {
    const valor = this.getAttribute('data-value');
    const inputCustom = document.getElementById('custom-amount');
    if (inputCustom) {
      inputCustom.value = valor;
    }
  });
});

document.getElementById('continuar-btn')?.addEventListener('click', function () {
  const valorRecarga = parseInt(document.getElementById('custom-amount').value);
  if (valorRecarga >= 2500) {
    saldoUsuario += valorRecarga;
    alert(`Recarga de ${valorRecarga} kz feita com sucesso!`);
    atualizarSaldo();
    window.location.href = 'usuario.html'; // Redirecionar para área do usuário
  } else {
    alert('Por favor, insira um valor válido de recarga (mínimo 2500 kz)!');
  }
});

// Validação na página de retirada
document.getElementById('retirar-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const valorRetirada = parseInt(document.getElementById('valor-retirar').value);
  const mensagemErro = document.getElementById('withdraw-message');
  if (valorRetirada >= 2000 && valorRetirada <= saldoUsuario) {
    saldoUsuario -= valorRetirada;
    alert('Retirada feita com êxito!');
    atualizarSaldo();
  } else if (valorRetirada < 2000) {
    mensagemErro.textContent = 'Erro: O valor de retirada deve ser de no mínimo 2000 kz.';
  } else {
    mensagemErro.textContent = 'Erro: Saldo insuficiente!';
  }
});

// Renderizar histórico de investimentos
function renderizarInvestimentos() {
  const listaInvestimentos = document.querySelector('.investment-history ul');
  if (listaInvestimentos) {
    listaInvestimentos.innerHTML = ''; // Limpar lista existente
    historicoInvestimentos.forEach(investimento => {
      const item = document.createElement('li');
      item.textContent = `${investimento.nome}: Ganho diário de ${investimento.ganhoDiario} kz`;
      listaInvestimentos.appendChild(item);
    });
  }
}

// Inicialização ao carregar as páginas
document.addEventListener('DOMContentLoaded', function () {
  atualizarSaldo(); // Atualizar saldo na área do usuário
  renderizarInvestimentos(); // Renderizar histórico de investimentos
});
