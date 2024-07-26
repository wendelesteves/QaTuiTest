class BasePage {
    elementsBasePage = {
        lbAppLogo: () => cy.get('.app_logo'),
        lbPageTitle: () => cy.get('[data-test="title"]'),
        btCart: () => cy.get('#shopping_cart_container'),
        btBurgerMenu: () => cy.get('#react-burger-menu-btn'),
        btCloseBurgerMenu: () => cy.get('#react-burger-cross-btn'),
        btBmAllItems: () => cy.get('#inventory_sidebar_link'),
        btBmAbout: () => cy.get('#about_sidebar_link'),
        btBmLogout: () => cy.get('#logout_sidebar_link'),
        btBmResetAppState: () => cy.get('#reset_sidebar_link'),
        lbCartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    }

    clickCart() {
        this.elementsBasePage.btCart()
            .click()

        return this
    }

    clickBurgerMenu() {
        this.elementsBasePage.btBurgerMenu()
            .click({force: true})

        return this
    }

    clickCloseBurgerMenu() {
        this.elementsBasePage.btCloseBurgerMenu()
            .click({force: true})

        return this
    }

    clickAllItems() {
        this.elementsBasePage.btBmAllItems()
            .click()

        return this
    }

    clickLogout() {
        this.elementsBasePage.btBmLogout()
            .click()

        return this
    }

    clickResetAppState() {
        this.elementsBasePage.btBmResetAppState()
            .click({force: true})

        return this
    }

    visitUrl(url) {
        cy.visit(url)

        return this
    }

    validateUrlEquals(url) {
        cy.url()
            .should('equals', url)

        return this
    }

    validateUrlContain(url) {
        cy.url()
            .should('contain', url)

        return this
    }

    validateLogoIsVisible() {
        this.elementsBasePage.lbAppLogo()
            .should('be.visible')

        return this
    }

    validatePageTitle(title) {
        this.elementsBasePage.lbPageTitle()
            .should('contain', title)

        return this
    }

    validateAbout() {
        this.clickBurgerMenu()
        this.elementsBasePage.btBmAbout()
            .should('be.visible')
            .and("have.attr", "href", "https://saucelabs.com/")
        this.clickCloseBurgerMenu()

        return this
    }

    validateCartBadge(number) {
        this.elementsBasePage.lbCartBadge()
            .scrollIntoView()
            .should('exist')
            .and('contain', number)
            .and('have.css', 'color')
            .and('eq', 'rgb(255, 255, 255)')

        return this
    }

    validateNoCartBadge() {
        this.elementsBasePage.lbCartBadge()
            .should('not.exist')

        return this
    }

    logout() {
        this.clickBurgerMenu()
            .clickLogout()
        return this
    }

    resetAppState() {
        this.clickBurgerMenu()
            .clickResetAppState()
            .clickCloseBurgerMenu()

        return this
    }

    clearAllLocalStorage() {
        cy.clearAllLocalStorage()

        return this
    }

    clearAllSessionStorage() {
        cy.clearAllSessionStorage()
        
        return this
    }

    clearCookies() {
        cy.clearCookies()
        
        return this
    }

    clearCache() {
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.clearCookies()

        return this
    }
}

export default BasePage