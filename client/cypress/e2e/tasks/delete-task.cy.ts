

describe('Delete Tasks', () => {
    beforeEach(()=>{
      cy.login('ui.auto@tasks.com', 'Password123.@')
    })
    it('Should User Able to Delete Task', () => {
      cy.visit('http://localhost:5173')
      cy.get('[data-testid="task-card-delete-0"]').click()
      cy.get('[data-testid="delete-task-confirmation-message"]').should('exist').should('have.text', 'Are you sure you want to DELETE task?')
      cy.get('[data-testid="modal-title"]').should('exist').should('have.text', 'Delete Task')
      cy.get('[data-testid="delete-task-modal-save-btn"]').click()
    })
  })