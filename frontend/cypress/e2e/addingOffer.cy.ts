import { time } from "console"

describe('Admin Dashboard Access', () => {

  it('should login and navigate to Admin Dashboard', () => {
    cy.clearLocalStorage()
    // 1️ Login
    cy.visit('/login')
    cy.get('[data-cy="email-input"]').type('admin@enjoytransport.com')
    cy.get('[data-cy="password-input"]').type('password123')
    cy.get('[data-cy="login-button"]').click()
    cy.url().should('eq', 'http://localhost:3000/')

    // Wait for authentication to settle
    cy.wait(2000)

    // 2️ Open User Menu
    cy.get('[data-cy="user-menu-trigger"]').click()

    // 3️ Click Admin Dashboard link
    cy.get('[data-cy="admin-dashboard-link"]').click()

    // 4️ Check that URL is /admin
    cy.url().should('eq', 'http://localhost:3000/admin')
     cy.get('[data-cy="sidebar-offers-management-link"]').click()
    cy.url().should('eq', 'http://localhost:3000/admin/offers')
    
    // Debug: Check if we're still on the right page
    cy.url().should('include', '/admin/offers')
    cy.contains('Offers Management').should('be.visible')
    
    // Check if sample data is loaded - should see at least one offer in the table
    cy.get('table tbody tr').should('have.length.greaterThan', 0)
    
    // Check if we can see one of the sample offers
    cy.contains('Toyota Hilux 2020').should('be.visible')
  })
})

