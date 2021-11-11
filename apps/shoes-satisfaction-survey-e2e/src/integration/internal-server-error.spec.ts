import { getErrorModal } from "../support/error-modal.po"
import { fillInForm, getSubmitButton, visitForm } from "../support/form.po"

describe('Internal server error', () => {
  it('Should display a popup with an error message', () => {
    visitForm()
    const errorTriggeringName = 'Luis'
    const uniqueEmail = `fake_email+${Date.now()}${Math.random()}@gmail.com`
    fillInForm(errorTriggeringName, 'Gesto', uniqueEmail, 'some useful feedback')
    getSubmitButton().click()
    getErrorModal().should('be.visible')
  })
})