import './commands';
import 'cypress-plugin-steps';

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
});