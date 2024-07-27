const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: "https://www.saucedemo.com/",
    viewportWidth: 1280,
    viewportHeight: 720,
    chromeWebSecurity: false,
    testIsolation: false,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'cypress-tui-test (saucedemo.com)',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    },
  },
});
