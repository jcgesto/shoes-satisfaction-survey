import { fillInForm, getSubmitButton, visitForm } from "../support/form.po"
import { getSuccessHeader } from "../support/success-header.po"

describe('repeated email', () => {
  it('Should display success message', () => {
    visitForm()
    const email = `fake_email+${Date.now()}${Math.random()}@gmail.com`
    fillInForm('Juan Carlos', 'Gesto', email, 'some useful feedback')
    getSubmitButton().click()
    getSuccessHeader().should('exist')

    visitForm()
    fillInForm('Juan Carlos', 'Gesto', email, 'some useful feedback')
    getSubmitButton().click()
    getSuccessHeader().should('exist')
  })
})