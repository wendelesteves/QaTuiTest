import BasePage from "./base_page"

class LoginPage extends BasePage{
    elementsHomePage = {
        edUsername: () => cy.get('#user-name'),
        edPassword: () => cy.get('#password'),
        btLogin: () => cy.get('#login-button'),
        tstToastMessage: () => cy.get('.error-message-container'),
        lbLoginLogo: () => cy.get('.login_logo'),
    }

    clickLogin() {
        this.elementsHomePage.btLogin()
            .click()

        return this
    }

    enterUsername(value) {
        this.elementsHomePage.edUsername()
            .clear()
            .type(value)

        return this
    }

    enterPassword(value) {
        this.elementsHomePage.edPassword()
            .clear()
            .type(value, {log: false}) // will not log it as sensitive information

        return this
    }

    logIn(username, password) {
        this.enterUsername(username)
            .enterPassword(password)
            .clickLogin()

        return this
    }

    validateToastMessage(message) {
        this.elementsHomePage.tstToastMessage()
            .should('contain', message)

        return this
    }

    validateLoggedIn() {
        this.validateUrlBeEq('https://www.saucedemo.com/inventory.html')
            .validateLogoIsVisible()
            .validatePageTitle('Products')

        return this
    }

    validateLoginLogoIsVisible() {
        this.elementsHomePage.lbLoginLogo()
            .should('be.visible')

        return this
    }

    validateLoggedout() {
        this.validateUrlBeEq('https://www.saucedemo.com/')
            .validateLoginLogoIsVisible()

        return this
    }
}

export default LoginPage