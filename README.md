# ARB Translator

My web application "ARB Translator" reads `.arb` files used in Flutter apps for localization. When you create an app and want it to adapt to the user’s device language, `.arb` files make it possible to automatically translate buttons, texts, hints, and more — improving the user experience significantly.

I discovered this need while developing a working hours calculator app for personal use. While experimenting with Flutter localization, I realized how repetitive and error-prone it is to manually translate every line in multiple `.arb` files and insert variables like `AppLocalizations.of(context)?.login` instead of hardcoded strings such as `"Login"`. I thought there must be a way to automate this process.

### Project Motivation and Evolution

Initially, I wrote a Python script to read `.arb` files, translate them, and write the output — but most of it was generated with the help of AI. Later, I decided to switch to web development and build a more user-friendly tool that runs directly in the browser.

The result is this app: a simple web interface that accepts `.arb` files, translates them using DeepL’s Free API (only supported languages), and allows you to download the translated versions.

### Features

- Parses `.arb` files and reads keys and values.
- Ignores metadata fields like `@@locale` or `@description`.
- Detects and preserves variable placeholders like `{name}` during translation.
- Translates content using DeepL's Free API (limited to supported languages).
- Allows users to download the translated `.arb` files for each selected language.
- Users can input their own DeepL API key to unlock full translation (beyond the 10-entry test limit).
- If no API key is entered, only the first 10 entries are translated to protect the limited usage of my testing key.

### Deployment

- The **frontend** is hosted on **GitHub Pages**:  
  [https://marcusbecker6123.github.io/arb-translatorv2.github.io/](https://marcusbecker6123.github.io/arb-translatorv2.github.io/)
- The **backend** is hosted on **Render** — this setup uses only free-tier services, which makes the tool easy to replicate or fork without cost.

There is also an integrated **description section within the Web App** that explains everything users need to do in order to make it work properly, including how to obtain and use their own DeepL API key.

### What I Learned

I learned basic HTML, CSS, and JavaScript through CS50 Web, FreeCodeCamp, and personal practice. I built small web pages that process user input and manipulate data — and this project helped deepen my understanding by applying those concepts in a real-world scenario.

### Tech Stack & Architecture

The frontend is built entirely with vanilla JavaScript, HTML, and CSS, using no frameworks — this was a conscious decision to deeply understand the fundamentals and keep the application lightweight. It uses the FileReader API to parse uploaded `.arb` files directly in the browser, and JavaScript’s `fetch()` to communicate with the backend via REST.

The backend, hosted on Render, is built with Node.js and acts as a proxy to the DeepL API. It receives translation requests and forwards them securely with the user’s API key (if provided). By separating the frontend (GitHub Pages) and backend (Render), I ensured that the app can be deployed for free and independently scaled if needed.

In the browser, translated content is regenerated as `.arb` files using dynamic Blob generation and offered for download without requiring any server-side storage.

### Challenges and What I Learned

One of the biggest challenges was handling variable placeholders like `{name}` inside the strings. I had to temporarily replace them with safe tokens before sending them to DeepL, then re-insert them afterward — otherwise, DeepL would translate or corrupt them. Another tricky part was dealing with character encoding and special characters like `¡Hola!` or emojis, which sometimes caused incorrect translations or formatting errors.

Additionally, working with asynchronous JavaScript functions (`async/await`) and managing user feedback (e.g., loading states or error messages) required careful planning. I also faced some CORS issues when deploying the backend to Render, which I solved by configuring proper headers.

Another challenge I encountered was when translating into multiple languages at once. If too many requests were sent simultaneously to the DeepL API — especially without a personal API key — I started receiving rate-limit errors or incomplete responses. To solve this, I implemented a simple delay between each translation request using `setTimeout`, which spaces out the API calls and ensures more stable delivery. While this adds a slight delay to the overall process, it greatly improves reliability and prevents failed translations, particularly when users choose multiple target languages at once.

All of these issues helped me gain a much deeper understanding of how web apps work, from client-side file handling to backend communication and third-party API usage.

### Planned Enhancements

In the future, I plan to expand the translator by integrating additional translation API providers beyond DeepL. While DeepL offers excellent quality, it comes with usage limits, especially on the free plan. By supporting alternative services such as Google Translate, Microsoft Translator, or even open-source models, I aim to provide users with more flexibility depending on their needs, budget, or preferred language support.

This would also allow the tool to automatically fall back to a secondary API if the primary one fails or is rate-limited. The modular backend architecture already makes it possible to extend the translation logic without changing the frontend. Ideally, users will be able to select their preferred provider from a dropdown menu and enter the corresponding API key.

Such features would make the ARB Translator more robust, scalable, and user-friendly for developers working on multilingual Flutter apps.

### Final Thoughts

This is my **final project for Harvard’s CS50 course**. It shows how I learned by building, rather than waiting until I felt "ready." Solving real problems — even small ones — is what helped me grow the most. I hope this tool is helpful to others as well.

---

**Built with ❤️ by Marcus Becker**