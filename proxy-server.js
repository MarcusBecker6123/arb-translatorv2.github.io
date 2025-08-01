// proxy-server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 3001;
const DEEPL_API_KEY = "9108f100-4cf3-46b2-adff-f557f63e6ff5:fx";

app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { texts, targetLang } = req.body;

  if (!texts || !targetLang) {
    return res.status(400).json({ error: "Fehlende Parameter" });
  }

  const params = new URLSearchParams();
  params.append("auth_key", DEEPL_API_KEY);
  params.append("target_lang", targetLang);
  texts.forEach(t => params.append("text", t));

  try {
    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      body: params
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).send(errorText);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Fehler bei der Übersetzung:", error);
    res.status(500).json({ error: "Serverfehler beim Übersetzen" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy-Server läuft auf http://localhost:${PORT}`);
});