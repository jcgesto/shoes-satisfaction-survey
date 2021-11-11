import { fillInForm, getSubmitButton, visitForm } from "../support/form.po"
import { getSuccessHeader } from "../support/success-header.po"

describe('Success', () => {
  it('Should display success message', () => {
    visitForm()
    const uniqueEmail = `fake_email+${Date.now()}${Math.random()}@gmail.com`
    fillInForm('Juan Carlos', 'Gesto', uniqueEmail, 'some useful feedback')
    getSubmitButton().click()
    getSuccessHeader().should('exist')
  })
})