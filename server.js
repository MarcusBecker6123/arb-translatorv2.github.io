import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/translate', async (req, res) => {
    const { texts, targetLang } = req.body;

    const params = new URLSearchParams();
    params.append("auth_key", "9108f100-4cf3-46b2-adff-f557f63e6ff5:fx");
    params.append("target_lang", targetLang);
    texts.forEach(t => params.append("text", t));

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
    console.log(`Proxy läuft auf http://localhost:${PORT}`);
});