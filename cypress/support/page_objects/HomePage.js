export class HomePage {
    openHomePage() {
        // visit QR Code generator page
        cy.visit('https://www.qrcode-monkey.com/')
        cy.contains('button', 'Accept All Cookies').click()
    }

    validateContentDefaultInputValue(val) {
        // url input field have a url value by <default>
        cy.get('input[name="qrcodeUrl"]').should('have.value', val)
    }
    validateEmptyInputTextFieldValidation() {
        // empty the content input field
        cy.get('input[name="qrcodeUrl"]').clear()
        cy.contains('button', 'Create QR Code').click()
        // pass - validation text exists
        cy.get('[name="urlForm"] div small').should('not.have.class', 'ng-hide')
    }
}
export const homePage = new HomePage()