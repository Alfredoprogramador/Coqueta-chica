import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for AI Stylist (Asistente de Estilo "Coqueta Chic")
app.post("/api/stylist", async (req, res) => {
  try {
    const { occasion, style, userGoal, preferredCategory } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        recommendation: "¡Hola hermosa! Para hoy te sugerimos nuestro Conjunto Deportivo 'ALO Vibe' o el Vestido 'Chic Romance'. Recuerda: el mejor outfit siempre es tu seguridad y amor propio. ✨",
        outfitName: "Look Elevado Coqueta Chic",
        tips: ["Combínalo con accesorios dorados", "Añade tu lip gloss favorito"]
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const prompt = `Eres la estilista experta e inspiradora de 'Coqueta Chic', una tienda online de moda, ropa deportiva estilo ALO, accesorios y belleza enfocada en elevar la autoestima de las mujeres.
    
Un cliente te pide consejo con los siguientes datos:
- Ocasión: ${occasion || 'Cualquiera / Diario'}
- Estilo preferido: ${style || 'Chic / Coqueta / Deportivo / Elegante'}
- Categoria de interés: ${preferredCategory || 'Ropa o Accesorios'}
- Meta/Sensación deseada: ${userGoal || 'Sentirme hermosa, confiada y cómoda'}

Responde en ESPAÑOL con un tono cálido, empoderador, chic y cariñoso ("hola hermosa", "eres bella tal como eres").
Recomienda una combinación de atuendo y productos de Coqueta Chic, junto con 2 consejos de estilo y una afirmación de amor propio.
Devuelve únicamente un objeto JSON con el siguiente formato estricto:
{
  "recommendation": "Tu consejo personalizado y cariñoso...",
  "outfitName": "Nombre elegante del outfit sugerido",
  "tips": ["Tip 1 de estilo", "Tip 2 de estilo"],
  "affirmation": "Una hermosa afirmación de amor propio"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json(data);
  } catch (error) {
    console.error("Error in AI Stylist endpoint:", error);
    return res.status(200).json({
      recommendation: "¡Hola hermosa! Para resaltar tu belleza hoy, te recomendamos combinar nuestras prendas deportivas estilo chic con un accesorio dorado delicado. ¡Eres única y radiante!",
      outfitName: "Estilo Coqueta Radiante",
      tips: ["Usa colores suaves como rosa pastel o beige", "Sonríe y camina con confianza"],
      affirmation: "Invertir en mi bienestar y belleza es mi acto favorito de amor propio."
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor de Coqueta Chic ejecutándose en http://0.0.0.0:${PORT}`);
  });
}

startServer();
