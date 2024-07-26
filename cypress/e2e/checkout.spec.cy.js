import CheckoutCompletePage from "../pages/checkout_complete_page"

const checkoutCompletePage = new CheckoutCompletePage()

const loginData = require('../fixtures/login.json')
const productData = require('../fixtures/products.json')
// in this case, the recommended is to mask these variables, but to keep this simple we'll just get it from the fixture
const [password, standardUser] = [
    loginData.password,
    loginData.users.standardUser,
]
const [product1, product2] = [
    productData.product1,
    productData.product2,
]

describe('Test spec', () => {
    before(() => {
        checkoutCompletePage
            .clearCache() // clear cache and session data
    })

    beforeEach(() => {
        cy.login(standardUser, password)
    })

    afterEach(() => {
        checkoutCompletePage
            .resetAppState()
    })

    after(() => {
        checkoutCompletePage
            .logout()
    })

    it('Add a product to the shopping cart', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .validateRemoveButtonByName(product1.name)
            .validateCartBadge('1')
            .clickCart()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
            .validateRemoveButtonByName(product1.name)
            .validateCheckoutButton()
    })

    it('Validate the "Continue Shopping" button', () => {
        checkoutCompletePage
            .clickCart()
            .validateIsOnCartPage()
            .clickContinueShopping()
            .validateLoggedIn()
    })

    it('Add more than one product to the shopping cart', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .validateRemoveButtonByName(product1.name)
            .addProductToCart(product2.name)
            .validateRemoveButtonByName(product2.name)
            .validateCartBadge('2')
            .clickCart()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
            .validateRemoveButtonByName(product1.name)
            .validateProductOnCart(product2.name, product2.price)
            .validateRemoveButtonByName(product2.name)
            .validateCheckoutButton()
    })

    it('Add a product to the shopping cart by the product page', () => {
        checkoutCompletePage
            .clickInventoryItemName(product1.name)
            .validateIsOnInventoryItemPage()
            .validateProductTitle(product1.name)
            .validateProductPrice(product1.price)
            .addProductToCart(product1.name)
            .validateRemoveButtonByName(product1.name)
            .validateCartBadge('1')
            .clickCart()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
            .validateRemoveButtonByName(product1.name)
    })

    it('Remove a product from the shopping cart by the cart page', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .validateRemoveButtonByName(product1.name)
            .validateCartBadge('1')
            .clickCart()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
            .removeProductFromCart(product1.name)
            .validateEmptyCart()
            .validateNoCartBadge()
            .clickContinueShopping()
            .validateProductsHaveAddToCartButton()
    })

    it('Remove a product from the shopping cart by the inventory page', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .validateRemoveButtonByName(product1.name)
            .validateCartBadge('1')
            .clickCart()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
            .clickContinueShopping()
            .validateLoggedIn()
            .removeProductFromCart(product1.name)
            .validateNoCartBadge()
            .clickCart()
            .validateEmptyCart()
    })

    it('Remove a product from the shopping cart by the product page', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .validateRemoveButtonByName(product1.name)
            .validateCartBadge('1')
            .clickCart()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
            .clickContinueShopping()
            .clickInventoryItemName(product1.name)
            .validateIsOnInventoryItemPage()
            .validateProductTitle(product1.name)
            .removeProductFromCart(product1.name)
            .validateAddToCartButtonByName(product1.name)
            .validateNoCartBadge()
            .clickCart()
            .validateEmptyCart()
    })

    it('Checkout a product', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .validateCartBadge('1')
            .clickCart()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
            .clickCheckout()
            .validateIsOnCheckoutStepOnePage()
            .enterFirstName()
            .enterLastName()
            .enterPostalCode()
            .clickContinueCheckout()
            .validateIsOnCheckoutStepTwoPage()
            .validateProductOnCart(product1.name, product1.price)
            .validatePaymentInfoValue()
            .validateShippingInfoValue()
            .validateSubTotalValue(product1.price)
            .validateTaxValue(product1.price)
            .validateTotalValue(product1.price)
            .clickFinish()
            .validateIsOnCheckoutCompletePage()
            .clickBackHome()
            .validateLoggedIn()
            .validateNoCartBadge()
    })

    it('Try to checkout without filling your information', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .clickCart()
            .validateProductOnCart(product1.name, product1.price)
            .clickCheckout()            
            .clickContinueCheckout()
            .validateToastMessage('First Name is required')
            .enterFirstName()
            .clickContinueCheckout()
            .validateToastMessage('Last Name is required')
            .enterLastName()
            .clickContinueCheckout()
            .validateToastMessage('Postal Code is required')
    })

    it('Cancel checkout on the step one', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .clickCart()
            .validateProductOnCart(product1.name, product1.price)
            .clickCheckout()
            .validateIsOnCheckoutStepOnePage()
            .clickCancelCheckout()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
    })

    it('Cancel checkout on the step two', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .clickCart()
            .validateProductOnCart(product1.name, product1.price)
            .clickCheckout()
            .validateIsOnCheckoutStepOnePage()            
            .enterFirstName()
            .enterLastName()
            .enterPostalCode()
            .clickContinueCheckout()
            .validateIsOnCheckoutStepTwoPage()
            .clickCancelCheckout()
            .validateLoggedIn()
            .validateCartBadge('1')
            .clickCart()
            .validateProductOnCart(product1.name, product1.price)
    })

    it('Checkout a product', () => {
        let subTotal = checkoutCompletePage.getSubTotal([product1.price, product2.price])

        checkoutCompletePage
            .addProductToCart(product1.name)
            .addProductToCart(product2.name)
            .validateCartBadge('2')
            .clickCart()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
            .validateProductOnCart(product2.name, product2.price)
            .clickCheckout()
            .validateIsOnCheckoutStepOnePage()
            .enterFirstName()
            .enterLastName()
            .enterPostalCode()
            .clickContinueCheckout()
            .validateIsOnCheckoutStepTwoPage()
            .validateProductOnCart(product1.name, product1.price)
            .validateProductOnCart(product2.name, product2.price)
            .validatePaymentInfoValue()
            .validateShippingInfoValue()
            .validateSubTotalValue(subTotal)
            .validateTaxValue(subTotal)
            .validateTotalValue(subTotal)
            .clickFinish()
            .validateIsOnCheckoutCompletePage()
            .clickBackHome()
            .validateLoggedIn()
            .validateNoCartBadge()
    })

    it('Add two products on the Cart, remove one than do the checkout', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .addProductToCart(product2.name)
            .validateCartBadge('2')
            .clickCart()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
            .validateProductOnCart(product2.name, product2.price)
            .removeProductFromCart(product1.name)
            .clickCheckout()
            .validateIsOnCheckoutStepOnePage()
            .enterFirstName()
            .enterLastName()
            .enterPostalCode()
            .clickContinueCheckout()
            .validateIsOnCheckoutStepTwoPage()
            .validateProductOnCart(product2.name, product2.price)
            .validateProductNotOnCart(product1.name)
            .validatePaymentInfoValue()
            .validateShippingInfoValue()
            .validateSubTotalValue(product2.price)
            .validateTaxValue(product2.price)
            .validateTotalValue(product2.price)
            .clickFinish()
            .validateIsOnCheckoutCompletePage()
            .clickBackHome()
            .validateLoggedIn()
            .validateNoCartBadge()
    })

    it('Add two products on the Cart, remove one than continue shopping', () => {
        checkoutCompletePage
            .addProductToCart(product1.name)
            .addProductToCart(product2.name)
            .validateCartBadge('2')
            .clickCart()
            .validateIsOnCartPage()
            .validateProductOnCart(product1.name, product1.price)
            .validateProductOnCart(product2.name, product2.price)
            .removeProductFromCart(product1.name)
            .validateProductOnCart(product2.name, product2.price)
            .validateProductNotOnCart(product1.name)
            .clickContinueShopping()
            .validateLoggedIn()
            .validateCartBadge('1')
    })
})