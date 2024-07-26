class BasePage {
    elementsBasePage = {
        lbAppLogo: () => cy.get('.app_logo'),
        lbPageTitle: () => cy.get('[data-test="title"]'),
        btCart: () => cy.get('#shopping_cart_container'),
        btBurgerMenu: () => cy.get('#react-burger-menu-btn'),
        btCloseBurgerMenu: () => cy.get('#react-burger-cross-btn'),
        btBmAllItems: () => cy.get('#inventory_sidebar_link'),
        btBmLogout: () => cy.get('#logout_sidebar_link'),
        btBmResetAppState: () => cy.get('#reset_sidebar_link'),
    }

    clickCart() {
        this.elementsBasePage.btCart()
            .click()

        return this
    }

    clickBurgerMenu() {
        this.elementsBasePage.btBurgerMenu()
            .click()

        return this
    }

    clickCloseBurgerMenu() {
        this.elementsBasePage.btCloseBurgerMenu()
            .click()

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
            .click()

        return this
    }

    validateUrlBeEq(url) {
        cy.url()
            .should('be.eq', url)

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

    logout() {
        this.clickBurgerMenu()
            .clickLogout()
        return this
    }

    resetAppState() {
        this.clickBurgerMenu()
            .clickResetAppState()
        return this
    }
}

export default BasePage