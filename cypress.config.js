const { defineConfig } = require("cypress");
const dotenvPlugin = require("cypress-dotenv");
const mochawesome = require("cypress-mochawesome-reporter/plugin");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    setupNodeEvents(on, config) {
      config = dotenvPlugin(config);
      mochawesome(on);
      return config;
    },
  },
});

