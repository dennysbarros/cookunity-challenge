const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://www.cookunity.com",
    defaultCommandTimeout: 10000,
    retries: { runMode: 2, openMode: 2 },
    screenshotOnRunFailure: true,
    specPattern: "./tests/**/*.{spec.js,cy.js}",
    supportFile: 'tests/support/e2e.js',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'mochawesome-report',
      overwrite: false,
      html: false, 
      json: true,
    },
  },
});
