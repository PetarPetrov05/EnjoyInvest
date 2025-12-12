import { time } from "console"

describe('Admin Dashboard Access', () => {

  it('should login and navigate to Admin Dashboard', () => {
    // 1️⃣ Login
    cy.visit('http://localhost:3000/login')
    cy.get('#email').type('petar.aleksandrov104@gmail.com')
    cy.get('#password').type('123')
    cy.contains('Sign In').click()
    cy.url().should('eq', 'http://localhost:3000/')

    // 2️⃣ Open User Menu
    cy.get('button[aria-haspopup="menu"]').click() // Dropdown trigger button

    // 3️⃣ Click Admin Dashboard link
    cy.contains('span', 'Admin Dashboard').click()

    // 4️⃣ Check that URL is /admin
    cy.url().should('eq', 'http://localhost:3000/admin')
     cy.contains('a', 'Offers Management').click()
    cy.url().should('eq', 'http://localhost:3000/admin/offers')
     cy.contains('a', 'Add New Offer').click()
    cy.url().should('eq', 'http://localhost:3000/admin/offers/new')

    cy.get('#title').type('Test Investment Offer')
    cy.get('#type').click()
    cy.get('#type').click()  // triggers the Select dropdown

// Click the option — usually rendered in a portal
cy.get('body')           // search globally
  .contains('For Sale')  // text of the option
  .click({ force: true }) 
    cy.get('#category').type('Stocks')
    cy.get('#price').type('1000')
    cy.get('#location').type('Online')
    cy.get('#description').type('Short description for test offer')
    cy.get('#fullDescription').type('This is a full detailed description of the test offer.')
    cy.get('#mainImage').type('https://example.com/main.jpg')
    cy.get('#contactPhone').type('+123456789')
    cy.get('#contactEmail').type('test@enjoyinvest.com')

    // 6️⃣ Add one additional image
    cy.contains('button', 'Add Image').click()
    cy.get('input[placeholder="https://example.com/image.jpg"]').first().type('https://example.com/additional.jpg')

    // 7️⃣ Submit form
    // Intercept the fetch request
cy.intercept('GET', '/posters').as('getOffers')

// Submit the form
cy.contains('button', 'Create Offer').click()
// Wait for the fetch request to complete
cy.wait(1000)
cy.reload()
// Assert the new offer exists
cy.contains('Test Investment Offer', { timeout: 10000 }).should('exist')
  })
})

