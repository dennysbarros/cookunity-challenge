// Custom command to wait for element and click it
Cypress.Commands.add("checkElementVisibility", (selector, maxAttempts = 3) => {
    let attempt = 1;
  
    const checkElement = () => {
      if (attempt > maxAttempts) {
        cy.log(`${selector} not found after ${maxAttempts} attempts`);
        throw new Error(`${selector} not found after ${maxAttempts} attempts`);
      }
      
      // Wait for page to be ready
      cy.window().its('document.readyState').should('eq', 'complete');
  
      cy.get("body").then($el => {
        const element = $el.find(selector);
        const isVisible = element.is(":visible") && element.length > 0;
  
        if (isVisible) {
          cy.log(`${selector} found on attempt ${attempt}`);
          return cy.wrap(true, { log: false });
        } else {
          attempt++;
          cy.log(`Attempt ${attempt}: ${selector} not visible, reloading...`);
          cy.reload();
          checkElement();
        }
      });
    };
  
    checkElement();
});

