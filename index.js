import Express  from "express";
import process from  'process';
import path from "path";

const host = '0.0.0.0';// Representa todas as interfaces (placas de rede) do computador onde essa aplicação for executada
const porta = 3000; //Porta identifica um programa em execução no host hospedeiro

const app = Express();

app.get("/",(pega, devolve) => {
    devolve.write('<h1>Seja bem-vindo ao nosso site!</h1>');
    devolve.end();
}); // Função de seta ou arrow function
// Pega é o parâmetro que recebe a requisição e Devolve é o parâmetro que envia a resposta

// req / res , ou seja, request e  response (requisição e resposta)
app.get('/index.html', (pega, devolve) => {
    devolve.write('<h1>Esse é o index.html</h1>');
    devolve.end();
});

// O express oferece funcionalidades para permetir que o conteúdo estático seja fornecido
app.use(Express.static(path.join(process.cwd(), 'public'))); // usa os conteudo estaticos desse caminho, ou seja, na pasta public



app.listen(porta, host, ()=>{
    console.log( `Servidor rodando na porta em http://${host}:${porta}` );
})