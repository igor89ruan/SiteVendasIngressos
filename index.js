import express  from "express";
import process from  'process';
import path from "path";
import session from "express-session";
import autenticar from "./public/seguranca/autenticar.js";

const host = '0.0.0.0';// Representa todas as interfaces (placas de rede) do computador onde essa aplicação for executada
const porta = 3000; //Porta identifica um programa em execução no host hospedeiro

const app = express();

app.use(express.urlencoded( { extended: true }));//Permite o envio de dados do formulário por meio do método POST
//gerencie uma sessão  para cada usuário 
app.use(session({
    secret: 'minhachavesecreta',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 15, //Tempo da vida do cookie em milisegundos
    }
}))

app.post('/login', (requisicao, resposta)=> {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;

    if (usuario && senha && usuario === 'igor' && senha === '123') {
        requisicao.session.usuarioLogado = true;
        resposta.redirect('./privado/inicio.html')
    }  else{
        resposta.redirect('/login.html')
    }
})

app.get('/logout', (requisicao, resposta) => {
    requisicao.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar a sessão:', err);
        }
        resposta.redirect('/public/login.html');
    });
});


// O express oferece funcionalidades para permetir que o conteúdo estático seja fornecido
app.use(express.static(path.join(process.cwd(), 'public'))); // usa os conteudo estaticos desse caminho, ou seja, na pasta public

app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));

app.listen(porta, host, ()=>{
    console.log( `Servidor rodando na porta em http://${host}:${porta}` );
});