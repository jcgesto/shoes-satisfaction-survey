export const visitForm = () => cy.visit('/')
export const getNameInput = () => cy.get('#name')
export const getLastnameInput = () => cy.get('#lastname')
export const getEmailInput = () => cy.get('#email')
export const getScoreGoodInput = () => cy.get('#score-good')
export const getNotesInput = () => cy.get('#notes')
export const getSubmitButton = () => cy.get('#submit')

export const fillInForm = (
  name: string,
  lastname: string,
  email: string,
  notes?: string) => {
  getNameInput().type(name)
  getLastnameInput().type(lastname)
  getEmailInput().type(email)
  getScoreGoodInput().click()
  if (notes) {
    getNotesInput().type(notes)
  }
}
