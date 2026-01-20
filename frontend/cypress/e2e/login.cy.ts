describe('Login Page', () => {
  it('should login successfully and redirect to home', () => {
    cy.visit('/login')

    cy.get('[data-cy="email-input"]').type('petar.aleksandrov104@gmail.com')
    cy.get('[data-cy="password-input"]').type('123')

    cy.get('[data-cy="login-button"]').click()

   
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('should show error message if credentials are invalid', () => {
    cy.visit('/login')

    cy.get('[data-cy="email-input"]').type('definitely@wrong.com')
    cy.get('[data-cy="password-input"]').type('definitelywrongpassword')

    cy.get('[data-cy="login-button"]').click()

    // After failed login, we should still be on the login page
    cy.url().should('include', '/login')
    
    // And the error message should appear
    cy.get('[data-cy="error-message"]', { timeout: 5000 }).should('be.visible')
  })
})
