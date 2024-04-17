// / <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare namespace Cypress {
    interface Chainable {
        login(email: string, password: string): Chainable<void>
        drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
        dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
        //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
}


Cypress.Commands.add('login', (email, password) => {
    cy.session([email, password], () => {
        cy.visit('http://localhost:5173/get-started')
        cy.get('[data-testid="signin-email-input-field"]').clear()
        cy.get('[data-testid="signin-password-input-field"]').clear()
        cy.get('[data-testid="signin-email-input-field"]').type(email)
        cy.get('[data-testid="signin-password-input-field"]').type(password)
        cy.get('[data-testid="signin-button"]').click()
        cy.get('[data-testid="topheader-user-full-name"]').should('exist').should('have.text', 'Hi, UI Automation')
    },{
        cacheAcrossSpecs: true
    })

})