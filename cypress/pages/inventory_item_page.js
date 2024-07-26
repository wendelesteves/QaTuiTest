import InventoryPage from "./inventory_page"

class InventoryItemPage extends InventoryPage{
    elementsInventoryItemPage = {
        btBackToProducts: () => cy.get('button[data-test="back-to-products"]'),
    }

    clickBackToProducts(){
        this.elementsInventoryItemPage.btBackToProducts()
            .click()

        return this
    }

    validateIsOnInventoryItemPage() {
        this.validateUrlContain('https://www.saucedemo.com/inventory-item.html?id=')

        return this
    }

    validateProductTitle(title) {
        this.elementsInventoryPage.itInventoryItemName()
            .should('contain', title)

        return this
    }

    validateProductPrice(price) {
        this.elementsInventoryPage.itInventoryItemPrice()
            .should('contain', price)

        return this
    }
}

export default InventoryItemPage