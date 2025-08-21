// Estado da aplicação
let appState = {
    currentUser: null,
    currentRoom: null,
    isHost: false,
    partner: null
};

// Elementos do DOM
const elements = {
    welcomeUser: document.getElementById('welcomeUser'),
    logoutBtn: document.getElementById('logoutBtn'),
    createRoomBtn: document.getElementById('createRoomBtn'),
    joinRoomBtn: document.getElementById('joinRoomBtn'),
    roomCode: document.getElementById('roomCode'),
    lobbyMessage: document.getElementById('lobbyMessage'),
    shareRoomCode: document.getElementById('shareRoomCode'),
    hostUsername: document.getElementById('hostUsername'),
    copyCodeBtn: document.getElementById('copyCodeBtn'),
    startChatBtn: document.getElementById('startChatBtn')
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Simular usuário logado (para testes)
    if (!appState.currentUser && location.pathname.includes('lobby.html')) {
        appState.currentUser = 'InvocadorTeste';
        updateUI();
    }

    // Configurar listeners
    if (elements.logoutBtn) {
        elements.logoutBtn.addEventListener('click', logout);
    }

    if (elements.createRoomBtn) {
        elements.createRoomBtn.addEventListener('click', createRoom);
    }

    if (elements.joinRoomBtn) {
        elements.joinRoomBtn.addEventListener('click', joinRoom);
    }

    if (elements.copyCodeBtn) {
        elements.copyCodeBtn.addEventListener('click', copyRoomCode);
    }

    if (elements.startChatBtn) {
        elements.startChatBtn.addEventListener('click', startChat);
    }
});

// Funções de navegação
function navigateTo(page) {
    location.href = page;
}

// Funções de autenticação
function login(username, password) {
    // Simulação de login
    appState.currentUser = username;
    updateUI();
    navigateTo('lobby.html');
}

function register(summonerName, email, password) {
    // Simulação de registro
    appState.currentUser = summonerName;
    updateUI();
    navigateTo('lobby.html');
}

function logout() {
    appState.currentUser = null;
    navigateTo('index.html');
}

// Funções de sala
function createRoom() {
    // Gerar código aleatório de 6 caracteres
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    appState.currentRoom = code;
    appState.isHost = true;
    
    updateUI();
    navigateTo('waiting.html');
}

function joinRoom() {
    const code = elements.roomCode.value.trim().toUpperCase();
    
    if (code.length !== 6) {
        showLobbyMessage('Código inválido. Deve ter 6 caracteres.', 'error');
        return;
    }
    
    appState.currentRoom = code;
    appState.isHost = false;
    appState.partner = 'DuoParceiro'; // Simulação
    
    updateUI();
    startChat();
}

function copyRoomCode() {
    navigator.clipboard.writeText(appState.currentRoom);
    
    const originalText = elements.copyCodeBtn.textContent;
    elements.copyCodeBtn.textContent = 'Copiado!';
    
    setTimeout(() => {
        elements.copyCodeBtn.textContent = originalText;
    }, 2000);
}

function startChat() {
    // Em produção, aqui seria feita a conexão real com o WebSocket
    navigateTo('chat.html');
}

// Funções auxiliares
function updateUI() {
    if (elements.welcomeUser) {
        elements.welcomeUser.textContent = `Olá, ${appState.currentUser}!`;
    }
    
    if (elements.hostUsername) {
        elements.hostUsername.textContent = appState.currentUser;
    }
    
    if (elements.shareRoomCode) {
        elements.shareRoomCode.textContent = appState.currentRoom;
    }
}

function showLobbyMessage(message, type = 'info') {
    if (!elements.lobbyMessage) return;
    
    elements.lobbyMessage.textContent = message;
    elements.lobbyMessage.className = 'message';
    
    if (type === 'error') {
        elements.lobbyMessage.classList.add('error');
    } else if (type === 'success') {
        elements.lobbyMessage.classList.add('success');
    }
}

// Exportar para uso em outros arquivos
window.appState = appState;
window.login = login;
window.register = register;
