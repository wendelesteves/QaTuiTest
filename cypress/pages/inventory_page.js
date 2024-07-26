import LoginPage from "./login_page"

class InventoryPage extends LoginPage{
    elementsInventoryPage = {
        itInventoryItem: () => cy.get('div[class="inventory_item"]'),
        itInventoryItemName: () => cy.get('[data-test="inventory-item-name"]'),
        itInventoryItemPrice: () => cy.get('[data-test="inventory-item-price"]'),
        cbSortProducts: () => cy.get('[data-test="product-sort-container"]'),
    }

    clickInventoryItemName(name){
        this.elementsInventoryPage.itInventoryItemName()
            .contains(name)
            .click()

        return this
    }

    clickInventoryItemImg(name){
        this.elementsInventoryPage.itInventoryItemName()
            .contains(name)
            .parentsUntil('div.inventory_item')
            .parent()
            .find('img[class="inventory_item_img"]')
            .click()
            
        return this
    }

    addProductToCart(name){
        this.elementsInventoryPage.itInventoryItemName()
            .contains(name)
            .parentsUntil('div.inventory_item')
            .parent()
            .find('button:contains("Add to cart")')
            .click()
            
        return this
    }

    removeProductFromCart(name){
        this.elementsInventoryPage.itInventoryItemName()
            .contains(name)
            .parentsUntil('div.cart_item')
            .parent()
            .find('button:contains("Remove")')
            .click()
            
        return this
    }

    selectSortType(sort) {
        this.elementsInventoryPage.cbSortProducts()
            .select(sort)

        return this
    }

    validateProductsHaveTitle() {
        this.elementsInventoryPage.itInventoryItem()
            .each(($el) => {
                cy.wrap($el)
                    .find('[data-test="inventory-item-name"]')
                    .invoke('text')
                    .should('not.be.empty')
            })

        return this
    }

    validateProductsHaveDescription() {
        this.elementsInventoryPage.itInventoryItem()
            .each(($el) => {
                cy.wrap($el)
                    .find('[data-test="inventory-item-desc"]')
                    .invoke('text')
                    .should('not.be.empty')
            })

        return this
    }

    validateProductsHavePrices() {
        this.elementsInventoryPage.itInventoryItem()
            .each(($el) => {
                cy.wrap($el)
                    .find('[data-test="inventory-item-price"]')
                    .invoke('text')
                    .should('not.be.empty')
                    .and('contain', '$')
            })

        return this
    }

    validateProductsHaveAddToCartButton() {
        this.elementsInventoryPage.itInventoryItem()
            .each(($el) => {
                cy.wrap($el)
                    .find('button[data-test*="add-to-cart"]')
                    .should('contain', 'Add to cart')
            })

        return this
    }

    validateProductsHaveAnImage() {
        this.elementsInventoryPage.itInventoryItem()
            .each(($el) => {
                cy.wrap($el)
                    .find('img[class="inventory_item_img"]')
                    .should('exist')
            })

        return this
    }

    validateAddToCartButtonByName(name) {
        this.elementsInventoryPage.itInventoryItemName()
            .contains(name)
            .parentsUntil('div.inventory_item')
            .parent()
            .find('button:contains("Add to cart")')
            .should('exist')
            .and('have.css', 'color')
            .and('eq', 'rgb(19, 35, 34)')
        
        return this
    }

    validateRemoveButtonByName(name) {
        this.elementsInventoryPage.itInventoryItemName()
            .contains(name)
            .parentsUntil('[data-test="inventory-item"]')
            .parent()
            .find('button:contains("Remove")')
            .should('exist')
            .and('have.css', 'color')
            .and('eq', 'rgb(226, 35, 26)')
        
        return this
    }

    validateSort(sort) {
        var productText = []
        var orderedArray = []

        switch(sort) {
            case 'az':
                productText = this.getProductTitles()
                orderedArray = productText.sort()

                break
            case 'za':
                productText = this.getProductTitles()
                orderedArray = productText.sort().reverse()

                break
            case 'lohi':
                productText = this.getProductPrices()
                orderedArray = productText.sort()

                break
            case 'hilo':
                productText = this.getProductPrices()
                orderedArray = productText.sort().reverse()

                break
        }

        cy.wrap(productText).should('equal', orderedArray)

        return this
    }

    getProductTitles() {
        var productTitles = []
        this.elementsInventoryPage.itInventoryItem()
            .each(($el) => {
                cy.wrap($el)
                    .find('[data-test="inventory-item-name"]')
                    .invoke('text')
                    .then((txt) => 
                        productTitles.push(txt)
                    )
            })

        return productTitles
    }

    getProductPrices() {
        var productPrices = []
        this.elementsInventoryPage.itInventoryItem()
            .each(($el) => {
                cy.wrap($el)
                    .find('[data-test="inventory-item-price"]')
                    .invoke('text')
                    .then((txt) => 
                        productPrices.push(txt)
                    )
            })

        return productPrices
    }
}

export default InventoryPage