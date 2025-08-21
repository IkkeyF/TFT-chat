document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            login(username, password);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const summonerName = document.getElementById('summonerName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }

            register(summonerName, email, password);
        });
    }
});

function login(username, password) {
    // Simulação de autenticação
    window.appState.currentUser = username;
    
    // Simular atraso de rede
    setTimeout(() => {
        window.location.href = 'lobby.html';
    }, 500);
}

function register(summonerName, email, password) {
    // Simulação de registro
    window.appState.currentUser = summonerName;
    
    // Simular atraso de rede
    setTimeout(() => {
        window.location.href = 'lobby.html';
    }, 500);
}
