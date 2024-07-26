import InventoryItemPage from "./inventory_item_page"

class CartPage extends InventoryItemPage{
    elementsCartPage = {
        btCheckout: () => cy.get('[data-test="checkout"]'),
        btContinueShopping: () => cy.get('[data-test="continue-shopping"]'),
        itCartInventoryItem: () => cy.get('[data-test="inventory-item"]'),
    }

    clickCheckout() {
        this.elementsCartPage.btCheckout()
            .click()

        return this
    }

    clickContinueShopping() {
        this.elementsCartPage.btContinueShopping()
            .click()

        return this
    }

    validateIsOnCartPage() {
        this.validateUrlEquals('https://www.saucedemo.com/cart.html')
            .validatePageTitle('Your Cart')

        return this
    }

    validateCheckoutButton() {
        this.elementsCartPage.btCheckout()
            .should('exist')
            .and('have.css', 'color')
            .and('eq', 'rgb(19, 35, 34)')

        return this
    }

    validateProductOnCart(name, price) {
        this.elementsInventoryPage.itInventoryItemName()
            .contains(name)
            .should('exist')
            .parentsUntil('div.cart_item')
            .parent()
            .find('[data-test="inventory-item-price"]')
            .should('contain', price)

        return this
    }

    validateProductNotOnCart(name) {
        this.elementsInventoryPage.itInventoryItemName()
            .contains(name)
            .should('not.exist')

        return this
    }

    validateEmptyCart() {
        this.elementsCartPage.itCartInventoryItem()
            .should('not.exist')
        return this
    }
}

export default CartPage