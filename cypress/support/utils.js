import { faker } from '@faker-js/faker'

class Utils {
    generateFirstName() {
        var firstName = faker.person.firstName()

        return firstName
    }
    
    generateLastName() {
        var lastName = faker.person.lastName()

        return lastName
    }

    generatePostalCode(format = '####-###') {
        var postalCode = faker.location.zipCode(format)

        return postalCode
    }
}

export default Utils