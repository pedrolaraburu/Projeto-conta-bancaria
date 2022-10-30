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

function criandoCategorias() {
    const resultado = document.getElementById('category');
    operacao.forEach(function (entCategoria) {
        const opcao = document.createElement('option');
        opcao.innerText = entCategoria.nome;
        opcao.value = entCategoria.id;
        resultado.appendChild(opcao);
    });
}

function olaUsuario(){
    var json = obterDadosLocalStorage()
    const conteudo = document.getElementById('conteudo');
    json.map((element) => {
        const nomeAp = document.createElement('h2')
        nomeAp.innerText = `Bem vindo, ${element.nome}!`
        nomeAp.classList.add("elemento-nome")
        conteudo.prepend(nomeAp)
    })

}

function realizaSaque(){

}

function realizaDeposito(){

}

function consultaSaldo(dados){
    var json = dados;
    json.map((element) => {
        const saldoConta = element.saldo;
        console.log("Saldo:" + saldoConta);
        alert(`O saldo da sua conta é ${saldoConta}`);
    })
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


function Redirect()
{
    window.location="/operacoes.html";
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
        dados.push(dadosReal);
        salvarDadosLocalStorage(dados)
        alert(`Sua conta foi criada com sucesso! Número da conta: ${dadosReal.conta}`)
        alert("Redirecionado você para a página de operações");
        setTimeout('Redirect()', 2000);
    } else {
        evento.preventDefault();
    }
}

function getDadosOp(evento) {
    var dadosConta = obterDadosLocalStorage();
    evento.preventDefault()
    const resConta = document.getElementById('conta').value;
    let resRetornoCop = validaContaOp()
    let resRetornoSop = validaSenhaOp()
    const categoria = document.getElementById('category').value;
    console.log("Categoria: " + categoria);
    console.log(typeof(categoria))
    console.log(resRetornoCop, resRetornoSop)
    if (resRetornoSop == true && resRetornoCop == true){
        if (categoria === '1'){
            realizaSaque()
        } else if (categoria === '2'){
            realizaDeposito()
        } else if (categoria === '3'){
            consultaSaldo(dadosConta)
        } else {
            evento.preventDefault()
        }
    }
    evento.preventDefault()
}



const formulario = document.getElementById('form-cadastro');
formulario.addEventListener('submit', getDados);
console.log(dados)

document.body.onload = criandoCategorias;

console.log(document.getElementById("category"))
console.log("Obtendo dados");
var json = obterDadosLocalStorage()
console.log("testando");
const dadosatu = json.map((teste) => {
    console.log(teste.nome)
    return {...teste}
})
console.log(dadosatu)
olaUsuario()


const formulario2 = document.getElementById('form-cadastro');
formulario2.addEventListener('submit', getDadosOp);
