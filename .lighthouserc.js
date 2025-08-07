module.exports = {
  ci: {
    collect: {
      staticDistDir: "./", // dein statisches HTML-Verzeichnis
      url: ["http://localhost:5500/index.html"], // URL deiner Seite (lokal oder remote)
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["warn", { minScore: 1 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci-results",
    },
  },
};