import CartPage from "./cart_page"
import Utils from "../support/utils"

const utils = new Utils()

class CheckoutStepOnePage extends CartPage{
    elementsCheckoutStepOnePage = {
        edFirstname: () => cy.get('[data-test="firstName"]'),
        edLastname: () => cy.get('[data-test="lastName"]'),
        edPostalCode: () => cy.get('[data-test="postalCode"]'),
        btContinue: () => cy.get('[data-test="continue"]'),
        btCancel: () => cy.get('[data-test="cancel"]'),
    }

    clickContinueCheckout() {
        this.elementsCheckoutStepOnePage.btContinue()
            .scrollIntoView()
            .click()

        return this
    }

    clickCancelCheckout() {
        this.elementsCheckoutStepOnePage.btCancel()
            .scrollIntoView()
            .click()

        return this
    }

    enterFirstName(value = utils.generateFirstName()) {
        this.elementsCheckoutStepOnePage.edFirstname()
            .clear()
            .type(value)

        return this
    }

    enterLastName(value = utils.generateLastName()) {
        this.elementsCheckoutStepOnePage.edLastname()
            .clear()
            .type(value)

        return this
    }

    enterPostalCode(value = utils.generatePostalCode()) {
        this.elementsCheckoutStepOnePage.edPostalCode()
            .clear()
            .type(value)

        return this
    }

    validateIsOnCheckoutStepOnePage() {
        this.validateUrlEquals('https://www.saucedemo.com/checkout-step-one.html')
            .validatePageTitle('Checkout: Your Information')

        return this
    }
}

export default CheckoutStepOnePage