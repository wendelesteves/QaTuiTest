import InventoryItemPage from "../pages/inventory_item_page"

const inventoryItemPage = new InventoryItemPage()

const loginData = require('../fixtures/login.json')
const productData = require('../fixtures/products.json')
// in this case, the recommended is to mask these variables, but to keep this simple we'll just get it from the fixture
const [password, standardUser] = [
    loginData.password,
    loginData.users.standardUser,
]
const product = productData.product1

describe('Test spec', () => {
    before(() => {
        inventoryItemPage
            .clearCache() // clear cache and session data
    })

    beforeEach(() => {
        cy.login(standardUser, password)
    })

    after(() => {
        inventoryItemPage
            .resetAppState()
            .logout()
    })

    it('Validate About page', () => {
        inventoryItemPage
            .validateAbout()
    })

    it('Validate Products have titles', () => {
        inventoryItemPage
            .validateProductsHaveTitle()
    })

    it('Validate Products have description', () => {
        inventoryItemPage
            .validateProductsHaveDescription()
    })

    it('Validate Products have prices', () => {
        inventoryItemPage
            .validateProductsHavePrices()
    })

    it('Validate Products have an "Add to cart" button', () => {
        inventoryItemPage
            .validateProductsHaveAddToCartButton()
    })

    it('Validate Products have an Image', () => {
        inventoryItemPage
            .validateProductsHaveAnImage()
    })

    it('Validate order by name (A - Z)', () => {
        inventoryItemPage
            .selectSortType('az')
            .validateSort('az')
    })

    it('Validate order by name (Z - A)', () => {
        inventoryItemPage
            .selectSortType('za')
            .validateSort('za')
    })

    it('Validate order by price (Low - High)', () => {
        inventoryItemPage
            .selectSortType('lohi')
            .validateSort('lohi')
    })

    it('Validate order by price (High - Low)', () => {
        inventoryItemPage
            .selectSortType('hilo')
            .validateSort('hilo')
    })

    it('Enter a product page clicking the title of the product', () => {
        inventoryItemPage
            .clickInventoryItemName(product.name)
            .validateIsOnInventoryItemPage()
            .validateProductTitle(product.name)
            .validateProductPrice(product.price)
    })

    it('Enter a product page clicking the image of the product', () => {
        inventoryItemPage
            .clickInventoryItemImg(product.name)
            .validateIsOnInventoryItemPage()
            .validateProductTitle(product.name)
            .validateProductPrice(product.price)
    })

    it('Validate the "All Items" button', () => {
        inventoryItemPage
            .clickInventoryItemImg(product.name)
            .validateIsOnInventoryItemPage()
            .clickBurgerMenu()
            .clickAllItems()
            .validateLoggedIn()
    })

    it('Validate the "Back to products" button', () => {
        inventoryItemPage
            .clickInventoryItemImg(product.name)
            .validateIsOnInventoryItemPage()
            .clickBackToProducts()
            .validateLoggedIn()
    })
})