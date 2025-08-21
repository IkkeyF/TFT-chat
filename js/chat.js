document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const closeBtn = document.getElementById('closeBtn');
    const typingIndicator = document.getElementById('typingIndicator');
    const roomName = document.getElementById('roomName');
    
    // Configurar estado inicial
    if (window.appState && window.appState.currentRoom) {
        roomName.textContent = `TFT Duo - ${window.appState.currentRoom}`;
    }
    
    // Simular parceiro conectado
    if (window.appState && window.appState.isHost) {
        setTimeout(() => {
            addSystemMessage(`${window.appState.partner || 'SeuDuo'} entrou na sala`);
        }, 1500);
    }

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    sendBtn.addEventListener('click', sendMessage);
    
    minimizeBtn.addEventListener('click', () => {
        document.querySelector('.chat-messages').classList.toggle('minimized');
    });
    
    closeBtn.addEventListener('click', () => {
        window.location.href = window.appState.isHost ? 'waiting.html' : 'lobby.html';
    });

    function sendMessage() {
        const text = messageInput.value.trim();
        if (!text) return;

        addMessage(text, 'sent');

        messageInput.value = '';

        if (!window.appState.isHost) {
            simulateResponse(text);
        }
    }

    function simulateResponse(userMessage) {
        typingIndicator.classList.remove('hidden');
        
        setTimeout(() => {
            typingIndicator.classList.add('hidden');
            
            let responseText = getBotResponse(userMessage);
            addMessage(responseText, 'received');
        }, 1000 + Math.random() * 2000);
    }

    function getBotResponse(message) {
        const lowerMsg = message.toLowerCase();
        const responses = {
            'oi': ['E aí!', 'Olá!', 'Oi! Pronto pra jogar?'],
            'time': ['Vamos de Kog + Blitz!', 'Prefiro comp de Mystic nesse patch', 'Dark Star tá forte'],
            'strat': ['Econ até 3-2', 'Hyperroll no nível 5', 'Vamos de fast 8'],
            'item': ['Prioriza Guinsoo', 'Sword+Rod is broken', 'Tank items no seu frontline']
        };
        
        for (const [keyword, possibleResponses] of Object.entries(responses)) {
            if (lowerMsg.includes(keyword)) {
                return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
            }
        }

        const defaultResponses = [
            'Concordo!',
            'Entendi',
            'Vamos nessa!',
            'Vou de econ',
            'Bora focar late game'
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        
        if (type === 'sent') {
            messageElement.textContent = text;
        } else if (type === 'received') {
            const sender = window.appState.isHost ? window.appState.partner : 'Host';
            messageElement.innerHTML = `
                <div class="sender">${sender}</div>
                <div class="text">${text}</div>
            `;
        }
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function addSystemMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message system';
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Adicionar mensagem inicial
    addSystemMessage(`Você entrou na sala ${window.appState.currentRoom || 'TFT Duo'}`);
});

// Funções de draggable overlay
function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    handle.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Tornar overlay arrastável
const overlay = document.querySelector('.chat-overlay');
const header = document.querySelector('.chat-header');

if (overlay && header) {
    makeDraggable(overlay, header);
}
