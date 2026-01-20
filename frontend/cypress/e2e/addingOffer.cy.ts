import { time } from "console"

describe('Admin Dashboard Access', () => {

  it('should login and navigate to Admin Dashboard', () => {
    // 1️⃣ Login
    cy.visit('/login')
    cy.get('[data-cy="email-input"]').type('petar.aleksandrov104@gmail.com')
    cy.get('[data-cy="password-input"]').type('123')
    cy.get('[data-cy="login-button"]').click()
    cy.url().should('eq', 'http://localhost:3000/')

    // 2️⃣ Open User Menu
    cy.get('[data-cy="user-menu-trigger"]').click()

    // 3️⃣ Click Admin Dashboard link
    cy.get('[data-cy="admin-dashboard-link"]').click()

    // 4️⃣ Check that URL is /admin
    cy.url().should('eq', 'http://localhost:3000/admin')
     cy.get('[data-cy="sidebar-offers-management-link"]').click()
    cy.url().should('eq', 'http://localhost:3000/admin/offers')
     cy.get('[data-cy="add-new-offer-button"]').click()
    cy.url().should('eq', 'http://localhost:3000/admin/offers/new')

    cy.get('[data-cy="title-input"]').type('Test Investment Offer')
    cy.get('[data-cy="type-select"]').click()
    cy.contains('For Sale').click({ force: true }) 
    cy.get('[data-cy="category-input"]').type('Stocks')
    cy.get('[data-cy="price-input"]').type('1000')
    cy.get('[data-cy="location-input"]').type('Online')
    cy.get('[data-cy="description-textarea"]').type('Short description for test offer')
    cy.get('[data-cy="full-description-textarea"]').type('This is a full detailed description of the test offer.')
    // cy.get('[data-cy="main-image-input"]').selectFile('cypress/fixtures/test-image.jpg', { force: true })
    cy.get('[data-cy="contact-phone-input"]').type('+123456789')
    cy.get('[data-cy="contact-email-input"]').type('test@enjoyinvest.com')

    // 6️⃣ Add one additional image
    // cy.get('[data-cy="add-image-button"]').click()
    // cy.get('[data-cy="additional-image-input"]').first().selectFile('cypress/fixtures/test-image.jpg', { force: true })

    // 7️⃣ Submit form
    // Intercept the fetch request
cy.intercept('GET', '/posters').as('getOffers')

// Submit the form
cy.get('[data-cy="create-offer-button"]').click()
// Wait for the redirect to /admin/offers
cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/admin/offers')
// Wait for the page to load
cy.wait(2000)
// Assert the new offer exists
cy.contains('Test Investment Offer', { timeout: 10000 }).should('exist')
  })
})

