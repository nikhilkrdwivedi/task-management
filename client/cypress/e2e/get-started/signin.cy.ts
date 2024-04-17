

describe('Get Started Page', () => {
  it('Should User Able to SignIn', () => {
    cy.visit('http://localhost:5173')
    cy.visit('http://localhost:5173/get-started')
    cy.get('[data-testid="signin-email-input-field"]').clear()
    cy.get('[data-testid="signin-password-input-field"]').clear()

    cy.get('[data-testid="signin-email-input-field"]').type('ui.auto@tasks.com')
    cy.get('[data-testid="signin-password-input-field"]').type('Password123.@')
    cy.get('[data-testid="signin-button"]').click()
    cy.get('[data-testid="topheader-user-full-name"]').should('exist').should('have.text', 'Hi, UI Automation')

  })
})