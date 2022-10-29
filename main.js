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

function desabilitaValor() {
    let res = document.getElementById('category').value;
    if (res === '3' || res === 'Selecione a operação'){
        document.getElementById("valor").disabled = true;
    } else {
        document.getElementById("valor").disabled = false;
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


const obterDicasLocalStorage = () => {
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
        alert(`Sua conta foi criado com sucesso! Número da conta: ${dadosReal.conta}`)
        alert("Redirecionado você para a página de operações");
        setTimeout('Redirect()', 2000);
    } else {
        evento.preventDefault();
    }
  }



const formulario = document.getElementById('form-cadastro');
formulario.addEventListener('submit', getDados);
console.log(dados)

document.body.onload = criandoCategorias;

console.log(document.getElementById("category"))