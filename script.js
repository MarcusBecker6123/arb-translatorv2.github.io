import { extractPlaceholders, restorePlaceholders } from "./utils.js";

let json, translatables, textsToTranslate, keys;

document.getElementById("fileInput").addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;

    const text = await file.text();

    try {
        json = JSON.parse(text);
    } catch (err) {
        console.error("Fehler beim Parsen:", err);
        return;
    }

    const selectedLanguages = Array.from(
        document.querySelectorAll('input[name="language"]:checked')
    ).map(cb => cb.value);

    keys = Object.keys(json);
    translatables = keys
        .filter(k => typeof json[k] === "string")
        .map(k => ({
            key: k,
            ...extractPlaceholders(json[k])
        }));

    textsToTranslate = translatables.map(t => t.newText);
});

document.getElementById("submit").addEventListener("click", async () => {
    const selectedLanguages = Array.from(
        document.querySelectorAll('input[name="language"]:checked')
    ).map(cb => cb.value);

    if (!json || !translatables || !textsToTranslate || !keys) {
        console.error("Keine Datei geladen oder ungültige Daten.");
        return;
    }

    const downloadArea = document.getElementById("downloads");
    downloadArea.replaceChildren();

    for (const lang of selectedLanguages) {
        try {
            const translated = await deeplTranslate(textsToTranslate, lang);
            await new Promise(resolve => setTimeout(resolve, 500));
            const final = {};

            // Übersetzte Werte mit Platzhalter wieder einsetzen
            for (let i = 0; i < translatables.length; i++) {
                final[translatables[i].key] = restorePlaceholders(translated[i], translatables[i].replacements);
            }

            // Nicht-übersetzbare (z. B. @metadata) wieder hinzufügen
            for (const k of keys) {
                if (typeof json[k] !== "string") {
                    final[k] = json[k];
                }
            }

            // Ersetze @@locale am Anfang
            const localeValue = lang.toLowerCase().split("-")[0];
            delete final["@@locale"];
            const finalWithLocaleFirst = {
                "@@locale": localeValue,
                ...final
            };

            function preservAllKeysReplacer(key, value) {
                return value;
            }

            // Download-Button erzeugen
            const blob = new Blob([JSON.stringify(finalWithLocaleFirst, preservAllKeysReplacer, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const button = document.createElement("button");
            button.textContent = `Download ${lang}`;
            button.addEventListener("click", () => {
                const a = document.createElement("a");
                a.href = url;
                a.download = `app_${lang.toLowerCase()}.arb`;
                a.click();
                URL.revokeObjectURL(url);
            });

            downloadArea.appendChild(button);
        } catch (err) {
            console.error(`Übersetzung für ${lang} fehlgeschlagen:`, err);
        }
    }
});

// Ruft dein Express-Backend auf, das die DeepL-Übersetzung übernimmt
async function deeplTranslate(texts, targetLang, customKey = null) {
    if (!customKey) {
        texts = texts.slice(0, 10);
    }
    const apiKey = customKey || undefined;

    const response = await fetch("https://arb-translatorv2-github-io.onrender.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts, targetLang, apiKey })
    });

    if (!response.ok) {
        throw new Error("Fehler vom Übersetzungsserver: " + response.statusText);
    }

    const data = await response.json();
    return data.translations.map(t => t.text);
}

const dropdown = document.getElementById("languageDropdown");
  const selector = document.getElementById("languageSelector");

  selector.addEventListener("click", () => {
    dropdown.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });

const checkboxes = dropdown.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(cb => {
cb.addEventListener("change", () => {
    const selected = Array.from(checkboxes)
    .filter(c => c.checked)
    .map(c => c.parentElement.textContent.trim());

    selector.textContent = selected.length > 0
    ? selected.join(", ")
    : "Sprachen auswählen";
});
});