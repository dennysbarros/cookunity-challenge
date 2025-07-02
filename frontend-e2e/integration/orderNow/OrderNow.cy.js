import { heroVerticalSliderSelectors, preferenceQuizSelectors, planSelectSelectors } from "./OrderNowSelectors";
import { loginSelectors } from "../login/LoginSelectors";
import { mealSelectSelectors } from "../mealSelect/MealSelectSelectors";
import { qa_mail } from "../../fixtures/users.json";
import { generateUniqueEmail } from "../../support/utils";

describe("Validate Order Now Promo", () => {
    const zipCode = "10001";
    let uniqueEmail;

    beforeEach(() => {
        uniqueEmail = generateUniqueEmail();
    });

    it("Verify that a new user can participate of the Order Now Promo", () => {
        cy.visit('/');
        cy.get(heroVerticalSliderSelectors.zipCodeInput).type(zipCode);
        cy.get(heroVerticalSliderSelectors.orderNowButton).click();
        cy.url().should('include', 'r=1&l=true')
        cy.get(preferenceQuizSelectors.skipAllButton).click();
        cy.get(planSelectSelectors.sixWeeklyMeals).click();
        cy.get(planSelectSelectors.planSelectContinueButton).click();
        cy.get(loginSelectors.signUpWithEmailButton).click();
        cy.get(loginSelectors.emailInput).type(uniqueEmail);
        cy.get(loginSelectors.submitEmailButton).click();
        cy.get(loginSelectors.passwordInput).type(qa_mail.password);
        cy.get(loginSelectors.submitFormButton).click();

        cy.url().should('include', 'en/meal-select');
        cy.get(mealSelectSelectors.allMealCards).should('have.length.greaterThan', 1);
    });
});
