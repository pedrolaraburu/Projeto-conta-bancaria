const STORAGE_KEY = 'DEVinHouse';
let dados = []

let operacao = [
    {
        id: 1,
        nome: "Saque"
    },   
    {
        id: 2,
        nome: "Depósito"
    }, 
    {
        id: 3,
        nome: "Consulta saldo"
    }
]

function getConta() {
    return dados;
}

function criandoCategorias() {
    const resultado = document.getElementById('category');
    operacao.forEach(function (entCategoria) {
        const opcao = document.createElement('option');
        opcao.innerText = entCategoria.nome;
        opcao.value = entCategoria.id;
        resultado.appendChild(opcao);
    });
}

function realizaSaque(conta, valor){
    if(valor > 0){
        if(getSaldo(conta) >= valor){
            getConta().find(elemento => elemento.conta === conta).saldo -= valor;
            alert(`Saque realizado com sucesso!\nSaldo atual: ${getSaldo(conta)}`)
        } else {
            alert(`Saldo insuficiente\nSaldo atual: ${getSaldo(conta)}`)
        }
    } else{
        alert("Valor de saque inferior a 0.");
    }
}

function realizaDeposito(conta, valor){
    if (valor > 0){
        getConta().find(elemento => elemento.conta === conta).saldo += valor;
        alert(`Depósito realizado com sucesso!\nSaldo atual: ${getSaldo(conta)}`)
    } else {
        alert("Valor de depósito inválido")
    }
}

function consultaSaldo(conta){
    const nome = getConta().find(elemento => elemento.conta === conta).nome;
    alert(`Olá sr(a) ${nome}, o saldo da sua conta é ${getSaldo(conta)}`);
}

function getSaldo(conta){
    return getConta().find(elemento => elemento.conta === conta).saldo;
}


function validaSenhaOp() {
    let confirmaSenha = false;
    const res = document.getElementById('senhaOp').value;
    var json = obterDadosLocalStorage();
    json.map((element) => {
        const senha = element.senha;
        console.log(senha);
        if (senha === res) {
            confirmaSenha = true;
        } else if(res === '') {
            alert("Preencha os dados antes");
        } else {
            alert("Senha incorreta, tente novamente");
            confirmaSenha = false;
        }
    })
    return confirmaSenha;
}

function validaContaOp() {
    let confirmaConta = false;
    const res = document.getElementById('conta').value;
    var json = obterDadosLocalStorage();
    json.map((element) => {
        const conta = element.conta;
        if (conta === res) {
            confirmaConta = true;
        } else if(res === '') {
            alert("Preencha os dados antes");
        } else {
            alert("Número de conta inválido, tente novamente...");
            confirmaConta = false;
        }
    })
    return confirmaConta;
}

function desabilitaValor() {
    let res = document.getElementById('category').value;
    if (res === '3'){
        document.getElementById("valor").disabled = true;
        document.getElementById("conta").disabled = false;
    } else if(res === 'Selecione a operação'){
        document.getElementById("valor").disabled = true;
        document.getElementById("conta").disabled = true;
        document.getElementById("senhaOp").disabled = true;
    } else {
        document.getElementById("valor").disabled = false;
        document.getElementById("conta").disabled = false;
        document.getElementById("senhaOp").disabled = false;
    }
}


function validaSenha(evento){
    let retornoSenha = false;
    if (evento.target.senha.value != evento.target.senha2.value){
        alert("As senhas não são iguais, tente novamente");
        retornoSenha = false;
    } else {
        retornoSenha = true;
    }
    return retornoSenha;
}

function validandoNumeros(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    console.log(charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

  return true;
}

function validandoValores(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    console.log(charCode);
    if (charCode != 44 && charCode != 45 && charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
  return true;
}

function validaNome(evento){
    let retornoNome = false;
    let nome = evento.target.name.value;
    let nome_strip = nome.trim()
    if(nome_strip== "" || nome_strip == 1 || nome_strip == 0){
        alert("Nome inválido, tente novamente");
        retornoNome = false;
    } else {
        retornoNome = true;
    }
    return retornoNome;
}

const salvarDadosLocalStorage = (arrayDados) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayDados));
};


const obterDadosLocalStorage = () => {
    const dadosLS = localStorage.getItem(STORAGE_KEY);
  
    // Valida se tem algo no local storage
    // Se tiver realiza o parse, ou seja, converte novamente para um array
    // Se não tiver retorna um array vazio
    return dadosLS ? JSON.parse(dadosLS) : [];
};


function getDados(evento) {
    evento.preventDefault();
    let resRetornoS = validaSenha(evento);
    let resRetornoN = validaNome(evento);
    console.log(resRetornoS, resRetornoN);
    if (resRetornoS == true && resRetornoN == true){
        const dadosReal = {
            nome: evento.target.name.value,
            cpf: evento.target.cpf.value,
            telefone: evento.target.phone.value,
            senha: evento.target.senha.value,
            conta: String(Math.floor(1000 + Math.random() * 90000)),
            saldo: 0
        };
        salvaConta(dadosReal);
        salvarDadosLocalStorage(dados)
        alert(`Sua conta foi criada com sucesso! Número da conta: ${dadosReal.conta}`)
    } else {
        evento.preventDefault();
    }
}

function salvaConta(dadosR) {
    dados.push(dadosR);
}

function getDadosOp(evento) {
    var dadosConta = obterDadosLocalStorage();
    evento.preventDefault()
    const resConta = document.getElementById('conta').value;
    let resRetornoCop = validaContaOp()
    let resRetornoSop = validaSenhaOp()
    const categoria = document.getElementById('category').value;
    const valor = parseInt(document.getElementById('valor').value);
    if (resRetornoSop == true && resRetornoCop == true){
        if (categoria === '1'){
            realizaSaque(resConta, valor)
        } else if (categoria === '2'){
            console.log("oi deposito");
            realizaDeposito(resConta, valor)
        } else if (categoria === '3'){
            consultaSaldo(resConta)
        } else {
            evento.preventDefault()
        }
    }
    evento.preventDefault()
}



const formulario = document.getElementById('form-cadastro');
formulario.addEventListener('submit', getDados);

document.body.onload = criandoCategorias;


const formulario2 = document.getElementById('form-cadastro2');
formulario2.addEventListener('submit', getDadosOp);
