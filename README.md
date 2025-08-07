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

### Final Thoughts

This is my **final project for Harvard’s CS50 course**. It shows how I learned by building, rather than waiting until I felt "ready." Solving real problems — even small ones — is what helped me grow the most. I hope this tool is helpful to others as well.

---

**Built with ❤️ by Marcus Becker**