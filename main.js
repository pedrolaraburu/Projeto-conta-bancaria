const STORAGE_KEY = 'DEVinHouse';
let dados = []

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
    } else {
        evento.preventDefault();
    }
  }



const formulario = document.getElementById('form-cadastro');
formulario.addEventListener('submit', getDados);
console.log(dados)