

describe('Add Tasks', () => {
    beforeEach(()=>{
      cy.login('ui.auto@tasks.com', 'Password123.@')
    })
    it('Should User Able to Create Task', () => {
      cy.visit('http://localhost:5173')
      cy.get('[data-testid="create-task-button"]').click()
      
      cy.get('[data-testid="task-title-input-field"]').clear().type('My Test Title')
      cy.get('[data-testid="task-description-textarea-field"]').clear().type('My Test Description')
      cy.get('[data-testid="add-task-save-button"]').click()
    })
  })