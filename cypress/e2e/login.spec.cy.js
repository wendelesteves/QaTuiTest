import LoginPage from "../pages/login_page"

const loginPage = new LoginPage()

const loginData = require('../fixtures/login.json')
// in this case, the recommended is to mask these variables, but to keep this simple we'll just get it from the fixture
const [password, standardUser, lockedOutUser] = [
    loginData.password,
    loginData.users.standardUser,
    loginData.users.lockedOutUser,
]

describe('Login test spec', () => {
    beforeEach(() => {
        // clear cache and session data
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.clearCookies()
        cy.visit('') // visiting the base URL defined on the cypress.config.js file
    })

    it('Login successfully', () => {
        loginPage
            .logIn(standardUser, password)
            .validateLoggedIn()
    })

    it('Login attempt with blank username and password', () => {
        loginPage
            .clickLogin()
            .validateToastMessage('Username is required')
            .validateLoggedout()
    })

    it('Login attempt with a valid username and blank password', () => {
        loginPage
            .enterUsername(standardUser)
            .clickLogin()
            .validateToastMessage('Password is required')
            .validateLoggedout()
    })

    it('Login attempt with blank username and a valid password', () => {
        loginPage
            .enterPassword(password)
            .clickLogin()
            .validateToastMessage('Username is required')
            .validateLoggedout()
    })

    it('Login attempt with a valid username and a wrong password', () => {
        loginPage
            .logIn(standardUser, 'wrongPassword')
            .validateToastMessage('Username and password do not match any user in this service')
            .validateLoggedout()
    })

    it('Login attempt with a locked-out username', () => {
        loginPage
            .logIn(lockedOutUser, password)
            .validateToastMessage('Sorry, this user has been locked out.')
            .validateLoggedout()
    })

    it('Logout', () => {
        loginPage
            .logIn(standardUser, password)
            .validateLoggedIn()
            .logout()
            .validateLoggedout()
    })

    it('White space handling when added to the username', () => {
        loginPage
            .logIn(standardUser + ' ', password)
            .validateToastMessage('Username and password do not match any user in this service')
            .validateLoggedout()
    })

    it('White space handling when added to the password', () => {
        loginPage
            .logIn(standardUser, password + ' ')
            .validateToastMessage('Username and password do not match any user in this service')
            .validateLoggedout()
    })
})