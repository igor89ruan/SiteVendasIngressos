const formularioCadastro = document.getElementById('formCadastro');
// cuidado para não chamar a função/ e sim atribuí-lo ao metodo onsubmit
formularioCadastro.onsubmit = validarFormulario;
window.onload = buscarEventos; // a função buscarEventos é chamada assim que o documento está carregado

document.getElementById('cadastrar').addEventListener('click', function(evento) {
    evento.preventDefault(); // Impede a submissão padrão do formulário
    validarFormulario(evento, 'cadastro');
});

document.getElementById('atualizar').addEventListener('click', function(evento) {
    evento.preventDefault(); // Impede a submissão padrão do formulário
    const codigo = document.getElementById('codigo').value; // Obtém o código do evento
    atualizarEvento(codigo); // Passa o código como argumento
});

document.getElementById('excluir').addEventListener('click', function(evento) {
    evento.preventDefault(); // Impede a submissão padrão do formulário
    apagarEvento(); // Chama a função de exclusão
});


function validarFormulario(evento, operacao = 'atualizar') {

    evento.preventDefault(); // Impede o envio do formulário se houver erros
    
    if (formularioCadastro.checkValidity()){
        formularioCadastro.classList.remove('was-validated');
        const nome_evento = document.getElementById('nome_evento').value;
        const nome_artista = document.getElementById('nome_artista').value;
        const ingresso_disp = document.getElementById('ingresso').value;
        const valor_ingresso = document.getElementById('valor_ingresso').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const endereco_evento = document.getElementById('endereco').value;
        const data_evento = document.getElementById('data_evento').value;

        const evento = {nome_evento, nome_artista, ingresso_disp, valor_ingresso, cidade, estado, endereco_evento, data_evento};
        if(operacao === 'cadastro'){
            cadastrarCliente(evento);
        } else if(operacao === 'atualizar'){
            atualizarEvento(evento);
        }
    } else {
        formularioCadastro.classList.add('was-validated');
        return false; // Adiciona a classe para exibir as mensagens de validação
    }
}

function cadastrarCliente(eventos) {
    //lembrando que o nosso backend responde requisitão HTTP - GET, POST, PUT, DELETE
    //FECTH API para fazer requisições em aplicações HTTP
    fetch('http://localhost:5000/eventos', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventos)
    }).then(resposta => {
        return resposta.json() // Retorna os dados para a próxima promessa na cadeia
    }).then(dados => {
        if(dados.status){//inclui corretamente o cliente no backend
            formularioCadastro.reset(); //limpa o formulário
            mostrarMensagem(dados.mensagem, true);
            buscarEventos(); //atualiza tabela
            
        }
        else{
            mostrarMensagem(dados.mensagem, false);
        }
    }).catch(erro => {
        mostrarMensagem(erro.message, false);
    });
};

function buscarEventos(){
    fetch('http://localhost:5000/eventos', {method: 'GET'}).then(resposta => {
        return resposta.json();
    }).then(dados => {
        if(Array.isArray(dados)){
            exibirTabela(dados);
        }
        else{
            mostrarMensagem(dados, false);
        }
    }).catch(erro => {
        mostrarMensagem(erro.message, false);
    })
}

function mostrarMensagem(mensagem, sucesso = false){
    const divMensagem = document.getElementById('mensagem');
    if(sucesso){
        divMensagem.innerHTML=`<div class="alert alert-success" role="alert">${mensagem}</div>`; //string Literal
    }
    else{
        divMensagem.innerHTML = `<div class="alert alert-danger" role="alert">${mensagem}</div>`; 
    }

    setTimeout(() => {divMensagem.innerHTML = ''}, 10000);
};

function exibirTabela(listaEventos) {
    const espacoTabela = document.getElementById('tabela');
    espacoTabela.innerHTML = '';
    if (listaEventos.length > 0) {
        const tabela = document.createElement('table');
        tabela.className = 'table table-striped table-hover';
        const cabecalho = document.createElement('thead');
        cabecalho.innerHTML = `
            <tr>
                <th class='cabecalho'>Código</th>
                <th class='cabecalho'>Nome do Evento</th>
                <th class='cabecalho'>Nome do artista/Banda</th>
                <th class='cabecalho'>Quantidade de ingressos</th>
                <th class='cabecalho'>Valor do ingresso</th>
                <th class='cabecalho'>Cidade</th>
                <th class='cabecalho'>Estado</th>
                <th class='cabecalho'>Endereço do evento</th>
                <th class='cabecalho'>Data do evento</th>
                <th class='cabecalho'>Ações</th>
            </tr>
        `;
        tabela.appendChild(cabecalho);
        const corpo = document.createElement('tbody');
        for (let i = 0; i < listaEventos.length; i++) {
            const evento = listaEventos[i];
            console.log(evento); // Adiciona esta linha para verificar os detalhes do objeto evento
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td class='linhas'>${evento.id}</td>
                <td class='linhas'>${evento.nome_evento}</td>
                <td class='linhas'>${evento.nome_artista}</td>
                <td class='linhas'>${evento.ingresso_disp}</td>
                <td class='linhas'>${evento.valor_ingresso}</td>
                <td class='linhas'>${evento.cidade}</td>
                <td class='linhas'>${evento.estado}</td>
                <td class='linhas'>${evento.endereco_evento}</td>
                <td class='linhas'>${evento.data_evento}</td>
                <td>
                    <button class="button3" onclick="selecionarEvento('${evento.id}', 
                                                                    '${evento.nome_evento}', 
                                                                    '${evento.nome_artista}', 
                                                                    '${evento.ingresso_disp}', 
                                                                    '${evento.valor_ingresso}', 
                                                                    '${evento.cidade}', 
                                                                    '${evento.estado}', 
                                                                    '${evento.endereco_evento}', 
                                                                    '${evento.data_evento}')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                    </svg>
                    </button>
                </td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        espacoTabela.appendChild(tabela);
    } else {
        espacoTabela.innerHTML = '<div class="alert alert-danger" role="alert">Nenhum evento encontrado</div>';
    }
}


function selecionarEvento(id, nome_evento, nome_artista, ingresso_disp, valor_ingresso, cidade, estado, endereco_evento, data_evento){
    document.getElementById('codigo').value = id;
    document.getElementById('nome_evento').value = nome_evento;
    document.getElementById('nome_artista').value = nome_artista;
    document.getElementById('ingresso').value = ingresso_disp;
    document.getElementById('valor_ingresso').value = valor_ingresso;
    document.getElementById('cidade').value = cidade;
    document.getElementById('estado').value = estado;
    document.getElementById('endereco').value = endereco_evento;
    document.getElementById('data_evento').value = data_evento;
}

function apagarEvento() {
    const codigo = document.getElementById('codigo').value; // obtém o código do evento
    if (confirm("Confirma a exclusão do Evento?")) {
        fetch(`http://localhost:5000/eventos/${codigo}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .then(async resposta => {
            if (!resposta.ok) {
                return resposta.text().then(text => {
                    throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText} ${text}`);
                });
            }
            return resposta.json();
        })
        .then(dados => {
            if (dados && dados.mensagem) {
                mostrarMensagem(dados.mensagem, true);
            } else {
                mostrarMensagem("Ocorreu um erro ao processar a solicitação.", false);
            }
            buscarEventos(); // atualiza a lista após a exclusão
            formularioCadastro.reset();
            
        })
        .catch(erro => {
            mostrarMensagem(erro.message, false);
        });
    } else {
        selecionarEvento(); // limpa o formulário de edição
    }
}

function atualizarEvento(codigo) {
    if (confirm("Confirma atualização do Evento?")) {
        const nome_evento = document.getElementById('nome_evento').value;
        const nome_artista = document.getElementById('nome_artista').value;
        const ingresso_disp = document.getElementById('ingresso').value;
        const valor_ingresso = document.getElementById('valor_ingresso').value;
        const cidade = document.getElementById('cidade').value;
        const estado = document.getElementById('estado').value;
        const endereco_evento = document.getElementById('endereco').value;
        const data_evento = document.getElementById('data_evento').value;

        const evento = {codigo, nome_evento, nome_artista, ingresso_disp, valor_ingresso, cidade, estado, endereco_evento, data_evento};

        fetch(`http://localhost:5000/eventos/${codigo}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(evento)
        })
        .then(async resposta => {
            if (!resposta.ok) {
                const text = await resposta.text();
                throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText} ${text}`);
            }
            return resposta.json();
        })
        .then(dados => {
            console.log(dados); // Adicione esta linha para verificar a resposta do servidor
            if (dados && dados.mensagem) {
                mostrarMensagem(dados.mensagem, true);
                formularioCadastro.reset();
            } else {
                mostrarMensagem("Ocorreu um erro ao processar a solicitação.", false);
            }
            buscarEventos();
        })
        .catch((erro) => {
            mostrarMensagem(erro.message, false);
        });
    }
}
