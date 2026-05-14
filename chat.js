import { GoogleGenAI } from '@google/genai';
import 'dotenv/config'; // Carga la clave desde un archivo .env






// Inicializa el SDK con tu clave de API
const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY 
});

async function iniciarChat() {
    // Creamos la sesión utilizando el modelo optimizado para texto y velocidad
    const chat = ai.chats.create({ 
        model: 'gemini-2.0-flash' 
    });

    // Primer turno del chat
    console.log("Usuario: Hola, ¿cómo estás?");
    let response = await chat.sendMessage({ 
        message: 'Hola, ¿cómo estás?' 
    });
    console.log(`Gemini: ${response.text}\n`);
    // Pausa de 3 segundos antes de la siguiente petición para no saturar el RPM
    await esperar(3000); 

    // Segundo turno (el modelo recuerda el mensaje anterior)
    console.log("Usuario: ¿Qué fue lo primero que te pregunté?");
    response = await chat.sendMessage({ 
        message: '¿Qué fue lo primero que te pregunté?' 
    });
    console.log(`Gemini: ${response.text}\n`);
    
    // Pausa de 3 segundos antes de la siguiente petición para no saturar el RPM
    await esperar(3000); 


    // Si necesitas recuperar los mensajes acumulados en la sesión:
    const historial = chat.getHistory();
    console.log(`Mensajes totales en la sesión: ${historial.length}`);
}

iniciarChat().catch(console.error);
