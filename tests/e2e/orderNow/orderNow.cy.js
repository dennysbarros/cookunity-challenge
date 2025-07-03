import { heroVerticalSliderSelectors, preferenceQuizSelectors, planSelectSelectors } from "./orderNowSelectors";
import { loginSelectors } from "../login/loginSelectors";
import { mealSelectSelectors } from "../mealSelect/mealSelectSelectors";
import { qa_user } from "../../fixtures/users.json"; 
import { generateUniqueEmail } from "../../support/utils";

describe("Validate Order Now feature", () => {
    it("Verify that a new user can use the Order Now feature", () => {
        const uniqueEmail = generateUniqueEmail();

        cy.step('Visit Cook Unity Home Page');
        cy.visit('/');

        cy.step('Fill the zip code field and click on Order Now button');
        cy.get(heroVerticalSliderSelectors.zipCodeInput).type(qa_user.zipCode);
        cy.get(heroVerticalSliderSelectors.orderNowButton).click();

        cy.step('Verify that the user is redirected to the preference quiz page');
        cy.url().should('include', 'r=1&l=true');

        cy.step('Skip the preference quiz');
        cy.get(preferenceQuizSelectors.skipAllButton).click();

        cy.step('Select the plan and continue');
        cy.get(planSelectSelectors.sixWeeklyMeals).click();
        cy.get(planSelectSelectors.planSelectContinueButton).click();

        cy.step('Sign up with email');
        cy.get(loginSelectors.signUpWithEmailButton).click();
        cy.get(loginSelectors.emailInput).type(uniqueEmail);
        cy.get(loginSelectors.submitEmailButton).click();
        cy.get(loginSelectors.passwordInput).type(qa_user.password);
        cy.get(loginSelectors.submitFormButton).click();

        cy.step('Verify that the user is redirected to the meal select page');
        cy.url().should('include', 'en/meal-select');

        cy.step('Verify that the user can see more than one meal card');
        cy.get(mealSelectSelectors.allMealCards).should('have.length.greaterThan', 1);
    });
});
