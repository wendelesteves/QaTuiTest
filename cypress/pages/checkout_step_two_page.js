import CheckoutStepOnePage from "./checkout_step_one_page"

class CheckoutStepTwoPage extends CheckoutStepOnePage{
    elementsCheckoutStepTwoPage = {
        btFinish: () => cy.get('[data-test="finish"]'),
        lbPaymentInfoValue: () => cy.get('[data-test="payment-info-value"]'),
        lbShippingInfoValue: () => cy.get('[data-test="shipping-info-value"]'),
        lbSubTotalValue: () => cy.get('[data-test="subtotal-label"]'),
        lbTaxValue: () => cy.get('[data-test="tax-label"]'),
        lbTotalValue: () => cy.get('[data-test="total-label"]'),
    }

    clickFinish() {
        this.elementsCheckoutStepTwoPage.btFinish()
            .scrollIntoView()
            .click()

        return this
    }

    validateIsOnCheckoutStepTwoPage() {
        this.validateUrlEquals('https://www.saucedemo.com/checkout-step-two.html')
            .validatePageTitle('Checkout: Overview')

        return this
    }

    validatePaymentInfoValue() {
        this.elementsCheckoutStepTwoPage.lbPaymentInfoValue()
            .scrollIntoView()
            .should('be.visible')

        return this
    }

    validateShippingInfoValue() {
        this.elementsCheckoutStepTwoPage.lbShippingInfoValue()
            .scrollIntoView()
            .should('be.visible')

        return this
    }

    validateSubTotalValue(value) {
        this.elementsCheckoutStepTwoPage.lbSubTotalValue()
            .scrollIntoView()
            .should('be.visible')
            .and('contain', value)

        return this
    }

    validateTaxValue(subTotalValue) {
        var tax = ((subTotalValue / 100) * 8).toFixed(2)
        this.elementsCheckoutStepTwoPage.lbTaxValue()
            .scrollIntoView()
            .should('be.visible')
            .and('contain', tax)

        return this
    }

    validateTotalValue(subTotalValue) {
        var tax = ((subTotalValue / 100) * 8).toFixed(2)
        var total = (Number(tax) + Number(subTotalValue)).toFixed(2)

        this.elementsCheckoutStepTwoPage.lbTotalValue()
            .scrollIntoView()
            .should('be.visible')
            .and('contain', total)

        return this
    }

    getSubTotal(priceValues = []) {
        var newArray = priceValues.map(function (x) { 
            return Number(x, 10); 
          })
        var subTotal = newArray.reduce((a, b) => a + b, 0)

        return subTotal
    }
}

export default CheckoutStepTwoPage