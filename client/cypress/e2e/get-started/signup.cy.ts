

describe('Register User', () => {
    it('Should User Able to SignUp', () => {
      const registerUserPayload = {
        name: 'UI Auto User',
        email: `uiautouser${Date.now()}@tasks.com`,
        password: 'Password123.@'
      }
      cy.visit('http://localhost:5173')
      cy.visit('http://localhost:5173/get-started')
      cy.get('[data-testid="register-user-form"]').click()
      
      cy.get('[data-testid="signup-name-input-field"]').clear().type(registerUserPayload.name)
      cy.get('[data-testid="signup-email-input-field"]').clear().type(registerUserPayload.email)
      cy.get('[data-testid="signup-password-input-field"]').clear().type(registerUserPayload.password)
  

      cy.get('[data-testid="signup-button"]').click()
      cy.get('[data-testid="topheader-user-full-name"]').should('exist').should('have.text', 'Hi, UI Auto User')
  
    })
  })