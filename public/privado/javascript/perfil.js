document.addEventListener('DOMContentLoaded', function () {
    const userMenu = document.getElementById('userMenu');
    const userAvatar = document.getElementById('userAvatar');

    userMenu.style.display = 'none'; // Inicialmente esconde o menu do usuário

    userAvatar.addEventListener('click', function (event) {
        event.stopPropagation(); // Impede que o evento de clique seja propagado para o documento
        userMenu.style.display = (userMenu.style.display === 'block') ? 'none' : 'block';
    });

    // Fecha o menu ao clicar fora
    document.addEventListener('click', function () {
        userMenu.style.display = 'none';
    });
});

function logout() {
    // Adicione sua lógica de logout aqui
    alert('Logout function called');
}

