

describe('Toggle Status Tasks', () => {
    beforeEach(()=>{
        cy.login('ui.auto@tasks.com', 'Password123.@')
      })
      it('Should User Able to Update Task Status', () => {
        cy.visit('http://localhost:5173')
        cy.get('[data-testid="task-card-switch-0"]').click()
        cy.get('[data-testid="toggle-status-task-confirmation-message"]').should('exist').should('have.text', 'Are you sure you want to toggle the task status from Pending to Completed?')
        cy.get('[data-testid="modal-title"]').should('exist').should('have.text', 'Manage Task Status')
        cy.get('[data-testid="toggle-task-status-save"]').click()
      })
  })