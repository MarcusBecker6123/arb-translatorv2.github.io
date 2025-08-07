
# 🌍 ARB Translator

**ARB Translator** is a web application that simplifies the localization workflow for Flutter developers by automating the translation of `.arb` files. These files are used to provide multilingual support in Flutter apps by mapping keys to translated text strings.

This tool allows developers to upload their `.arb` files, translate them into multiple languages using DeepL (and in the future, other providers), and download the translated `.arb` files for immediate use in their Flutter projects.

---

## 🚀 Live App

- **Frontend** hosted on **GitHub Pages**:  
  [https://marcusbecker6123.github.io/arb-translatorv2.github.io/](https://marcusbecker6123.github.io/arb-translatorv2.github.io/)
- **Backend** hosted on **Render**  
  Both use free-tier services and can be easily forked or adapted for personal use.

The web app also contains a detailed **description section** that guides users through the entire process, including how to use their own DeepL API key.

---

## 🎯 Project Motivation

I discovered the need for this tool while building a personal working hours calculator app with Flutter. Managing translations across multiple `.arb` files was tedious and error-prone. Hardcoding strings like `"Login"` had to be replaced by `AppLocalizations.of(context)?.login`, and I found myself duplicating work. That’s when I decided to automate the process.

What began as a simple Python script evolved into a browser-based tool to help others streamline their localization process, too.

---

## ✨ Features

- Parses `.arb` files and reads keys and values
- Ignores metadata fields like `@@locale`, `@description`, etc.
- Preserves placeholders like `{name}` across all translations
- Translates content via **DeepL Free API** (limited to supported languages)
- Users can enter their own **DeepL API key** to unlock full translation
- Without a key, only the first 10 entries are translated (for demo purposes)
- Translations are regenerated as downloadable `.arb` files

---

## 🧪 What I Learned

Through this project, I deepened my understanding of:

- JavaScript fundamentals (`fetch`, `async/await`, DOM manipulation)
- RESTful API interaction and request throttling
- File handling in the browser (FileReader API, Blob download)
- Deployment with GitHub Pages and Render
- CORS configuration and security
- Working with localization best practices

---

## 🧱 Tech Stack & Architecture

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Backend:** Node.js server on Render, acting as a proxy to DeepL
- **Hosting:** GitHub Pages (frontend), Render (backend)
- **Browser-Side:** File upload & parsing, async translations, Blob file generation

---

## 🧩 Challenges Faced

- **Placeholder Protection:** DeepL often altered variables like `{user}`. I had to replace placeholders with temp tokens during translation and restore them afterward.
- **Encoding Issues:** Special characters and emojis broke formatting — fixed by adjusting character handling.
- **CORS Errors:** Solved through proper backend header configuration.
- **Too Many Requests:** Translating into many languages at once caused API rate limits. I solved this by inserting a timeout between requests to space them out. While slightly slower, it made the process more stable.

---

## 🔮 Planned Enhancements

- **More Translation Providers:** Add support for Google Translate, Microsoft Translator, or open-source APIs. Users could select their preferred service and provide their own API key.
- **Fallback Support:** Automatic fallback if one provider fails.
- **Dart File to `.arb` Conversion:**  
  Many developers don’t know how to create `.arb` files. A future version will allow uploading a Dart localization file (e.g., `app_localizations.dart`) to auto-generate an English `.arb` file. From there, users can translate into any language.
- **Step-by-Step Mode:** A guided experience for beginners — from file upload to download.

---

## 📚 Final Thoughts

This is my **final project for Harvard’s CS50 course**. I chose to learn by building — solving real problems instead of waiting until I felt "ready." I hope others find this tool useful in their development workflow.

---

**Built with ❤️ by Marcus Becker**
