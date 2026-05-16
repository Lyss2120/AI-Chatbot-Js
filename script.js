// import { GoogleGenAI } from "@google/genai";
// import { GoogleGenAI } from "https://esm.sh";
// import "dotenv/config"; // Carga la clave desde un archivo .env




const userInput = document.getElementById('user-input')
const chatBox = document.getElementById('chat-box')
const sendBtn = document.getElementById('send-btn')

// Inicializa el SDK con tu clave de API
// const aiKey = process.env.GEMINI_API_KEY 


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



sendBtn.onclick = async () => {
    const message = userInput.value;
    if (message === '') return;

    addMessage(message, 'user-message')
    userInput.value = '';

    const typingBot = showTiping()
    const botReplay = await getBotReplay(message)
    
    typingBot.remove()
    addMessage(botReplay, 'bot-message')
    console.log(chatBox.innerHTML);

    localStorage.setItem('chatHistory', chatBox.innerHTML)
}


// cuando presione enter se llama a la funcion 
userInput.addEventListener('keydown', (event) => {
    const message = userInput.value
    if (event.key === 'Enter') sendBtn.click()
})

