import { getSubmitButton, visitForm } from "../support/form.po"

describe('Invalid form', () => {
  it('Should show 4 error messages if form submitted empty', () => {
    visitForm()
    getSubmitButton().click()
    cy.get('.form-field__error').should('have.length', 4)
  })
})