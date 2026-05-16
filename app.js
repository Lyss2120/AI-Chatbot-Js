import { apikey } from "./config.js";


const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apikey}`


window.onload = () => {
    const savedChat = localStorage.getItem('chatHistory')
    console.log(savedChat);
    if (savedChat) {
        chatBox.innerHTML = savedChat;
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function addMessage(message, userName) {
    // crear el div ponerle las clase smsg y user añadirle el texto del input
    const msgDiv = document.createElement('div')
    msgDiv.classList.add('message', userName)
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight

}

function showTiping() {
    const typingDiv = document.createElement('div')
    typingDiv.classList.add('message', 'bot-message')
    typingDiv.textContent = 'typing...'
    chatBox.appendChild(typingDiv)
    chatBox.scrollTop = chatBox.scrollHeight
    return typingDiv
}
async function getBotReplay(message) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "contents": [
                    {
                        "parts": [
                            { "text": message }
                        ]
                    }
                ]
            })
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status}`);
        }
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error(error);
    }
}


sendBtn.onclick = async () => {
    const message = userInput.value;
    if (message === '') return;

    addMessage(message, 'user-message')
    userInput.value = '';

    const typingBot = showTiping()
    const botReplay = await getBotReplay(message)

    typingBot.remove()
    addMessage(botReplay, 'bot-message')
    localStorage.setItem('chatHistory', chatBox.innerHTML)
}


// cuando presione enter se llama a la funcion 
userInput.addEventListener('keydown', (event) => {
    const message = userInput.value
    if (event.key === 'Enter') sendBtn.click()
})

