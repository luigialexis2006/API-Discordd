const GEMINI_API_KEY = "AIzaSyCqRRtLSaWmA1Ad-T6x-feOgPX_uBvhZyU";

async function analyzeDiscordIntent() {
    const inputText = document.getElementById("userInput").value;
    const loader = document.getElementById("loader");
    const responseDiv = document.getElementById("response");

if (!inputText.trim()) {
    responseDiv.textContent = "Por favor escribe algo.";
    return;
}

loader.style.display = "block";
responseDiv.textContent = "";

const prompt = `Detecta si el siguiente mensaje quiere enviar algo a Discord. 
Si sí, responde solo "sí". Si no, responde solo "no". 
Mensaje: "${inputText}"`;

try {
    const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
        })
    }
    );

    const data = await res.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text.toLowerCase();

    if (resultText.includes("sí")) {
      responseDiv.textContent = "✅ Mensaje enviado al Discord.";
    } else {
      responseDiv.textContent = "❌ No se detectó intención de enviar al Discord.";
    }

    } catch (error) {
    console.error("Error:", error);
    responseDiv.textContent = "Error al contactar con la API.";
    } finally {
    loader.style.display = "none";
  }
}