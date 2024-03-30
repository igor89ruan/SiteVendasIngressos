
const formularioCadastro = document.getElementById('formCadastro');
// cuidado para não chamar a função/ e sim atribuí-lo ao metodo onsubmit
formularioCadastro.onsubmit = validarFormulario;

function validarFormulario(evento){
    evento.preventDefault(); // Impede o envio do formulário se houver erros
    if (formularioCadastro.checkValidity()){
        formularioCadastro.classList.remove('was-validated');
        const cpf = document.getElementById('cpf').value;
        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        const cliente = {cpf, nome, endereco, bairro, cidade, estado, telefone, email, senha};
        cadastrarCliente(cliente);
    }else{
        formularioCadastro.classList.add('was-validated'); // Adiciona a classe para exibir as mensagens de validação
    }
    evento.preventDefault();//onsubmit deixa de ter o comportamento padrao de envio do formulário
    evento.stopPropagation();//Outros interessados no evento de submissao do formulário não serão notificados
}

function cadastrarCliente(cliente) {
    //lembrando que o nosso backend responde requisitão HTTP - GET, POST, PUT, DELETE
    //FECTH API para fazer requisições em aplicações HTTP
    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cliente)
    }).then(resposta => {
        return resposta.json();

    }).then(dados => {
        if(dados.status){//inclui corretamente o cliente no backend
            mostrarMensagem(dados.mensagem, true);
        }
        else{
            mostrarMensagem(dados.mensagem, false);
        }
    }).catch(erro => {
        mostrarMensagem(erro.message, false);
    });
};

function mostrarMensagem(mensagem, sucesso = false){
    const divMensagem = document.getElementById('mensagem');
    if(sucesso){
        divMensagem.innerHTML=`<div class="alert alert-success" role="alert">${mensagem}</div>`; //string Literal
    }
    else{
        divMensagem.innerHTML = `<div class="alert alert-danger" role="alert">${mensagem}</div>`; 
    }

    setTimeout(() => {divMensagem.innerHTML = '';}, 5000);
};