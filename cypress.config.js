const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://www.cookunity.com",
    defaultCommandTimeout: 10000,
    retries: { runMode: 2, openMode: 2 },
    screenshotOnRunFailure: true,
    specPattern: "./frontend-e2e/**/*.{spec.js,cy.js}",
    supportFile: 'frontend-e2e/support/e2e.js',
  },
});
