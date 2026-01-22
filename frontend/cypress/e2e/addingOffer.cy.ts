import { time } from "console"

describe('Admin Dashboard Access', () => {

  it('should login and navigate to Admin Dashboard', () => {
    // Clear all storage and cookies to ensure clean state
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.window().then((win) => {
      win.sessionStorage.clear()
      win.localStorage.removeItem('enjoy-transport-token')
      win.localStorage.removeItem('enjoy-transport-user')
    })
    
    // Visit home page first to ensure we're not on login page
    cy.visit('/')
    cy.wait(1000)
    
    // 1️ Login
    cy.visit('/login')
    
    // Check if we're redirected to home (already logged in) or stay on login page
    cy.url().then((url) => {
      if (url.includes('/login')) {
        // We're on login page, so fill the form
        cy.get('[data-cy="email-input"]').type('admin@enjoytransport.com')
        cy.get('[data-cy="password-input"]').type('password123')
        cy.get('[data-cy="login-button"]').click()
        cy.url().should('eq', 'http://localhost:3000/')
      } else {
        // We're already logged in and redirected to home
        cy.url().should('eq', 'http://localhost:3000/')
      }
    })

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
    
    // Check that the offers table is present (may be empty in test environment)
    cy.get('table').should('exist')
    
    // Check that we can navigate to offers management successfully
    cy.url().should('include', '/admin/offers')
  })
})

