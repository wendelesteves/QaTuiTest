import CheckoutStepTwoPage from "./checkout_step_two_page"

class CheckoutCompletePage extends CheckoutStepTwoPage{
    elementsCheckoutCompletePage = {
        lbThankYou: () => cy.get('[data-test="complete-header"]'),
        lbOrderDispatched: () => cy.get('[data-test="complete-text"]'),
        btBackHome: () => cy.get('[data-test="back-to-products"]'),
    }

    clickBackHome() {
        this.elementsCheckoutCompletePage.btBackHome()
            .click()

        return this
    }

    validateIsOnCheckoutCompletePage() {
        this.validateUrlEquals('https://www.saucedemo.com/checkout-complete.html')
            .validatePageTitle('Checkout: Complete!')
            .validateThankYouLabel()
            .validateOrderDispatchedLabel()

        return this
    }

    validateThankYouLabel() {
        this.elementsCheckoutCompletePage.lbThankYou()
            .should('be.visible')

        return this
    }

    validateOrderDispatchedLabel() {
        this.elementsCheckoutCompletePage.lbOrderDispatched()
            .should('be.visible')

        return this
    }
}

export default CheckoutCompletePage