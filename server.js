import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.send('Backend API is running');
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



const allowedOrigins = ['https://marcusbecker6123.github.io'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/translate', async (req, res) => {
    let { texts, targetLang, apiKey } = req.body;

    // Eingabe prüfen
    if (!Array.isArray(texts) || typeof targetLang !== 'string') {
      return res.status(400).json({ error: "Ungültige Anfrage: 'texts' muss ein Array sein und 'targetLang' ein String." })
    }

    let limitedTexts;
    let usedKey;

    if (!apiKey) {
      // Kein eigener key => Texte limitieren und Standardkey verwenden
      limitedTexts = texts.slice(0, 10);
      usedKey = DEEPL_API_KEY;
    } else {
      // Eigener Key => alles übersetzen
      limitedTexts = texts;
      usedKey = apiKey;
    }

    const params = new URLSearchParams();
    params.append("auth_key", usedKey);
    params.append("target_lang", targetLang);
    limitedTexts.forEach(t => params.append("text", t));

    try {
        const response = await fetch("https://api-free.deepl.com/v2/translate", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    const isRender = process.env.RENDER === 'true';
    const envMsg = isRender
      ? `Backend läuft auf Render unter Port ${PORT}`
      : `Backend läuft lokal unter http://localhost:${PORT}`;
    console.log(envMsg);
});