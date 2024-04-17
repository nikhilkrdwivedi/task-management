

describe('Edit Tasks', () => {
    beforeEach(()=>{
      cy.login('ui.auto@tasks.com', 'Password123.@')
    })
    it('Should User Able to Update Task', () => {
      cy.visit('http://localhost:5173')
      cy.get('[data-testid="task-card-edit-0"]').click()
      cy.get('[data-testid="task-title-input-field"]').clear().type('My Test Title Again!')
      cy.get('[data-testid="task-description-textarea-field"]').clear().type('My Test Description Again!')
      cy.get('[data-testid="add-task-save-button"]').click()
      cy.get('[data-testid="task-card-title-0"]').should('exist').should('have.text', 'My Test Title Again!')
      cy.get('[data-testid="task-card-description-0"]').should('exist').should('have.text', 'My Test Description Again!')
    })
  })