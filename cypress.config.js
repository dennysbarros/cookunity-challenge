const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: "https://www.cookunity.com",
    defaultCommandTimeout: 10000,
    retries: { runMode: 2, openMode: 2 },
    screenshotOnRunFailure: true,
    screenshotsFolder: 'test-reports/screenshots',
    specPattern: "./tests/**/*.{spec.js,cy.js}",
    supportFile: 'tests/support/e2e.js',
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'test-reports',
      overwrite: false,
      html: false, 
      json: true,
      reportFilename: '[name]_report.json',
    },
  },
});
