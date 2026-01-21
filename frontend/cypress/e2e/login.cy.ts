describe('Login Page', () => {
  it('should login successfully and redirect to home', () => {
    cy.clearLocalStorage()
    cy.visit('/login')

    cy.get('[data-cy="email-input"]').type('admin@enjoytransport.com')
    cy.get('[data-cy="password-input"]').type('password123')

    cy.get('[data-cy="login-button"]').click()

    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('should reject invalid credentials with 401 status', () => {
    cy.clearLocalStorage()
    cy.visit('/login')

    // Intercept the login API call
    cy.intercept('POST', '**/api/auth/login').as('loginRequest')

    cy.get('[data-cy="email-input"]').type('definitely@wrong.com')
    cy.get('[data-cy="password-input"]').type('definitelywrongpassword')

    // Check that the button exists and is enabled
    cy.get('[data-cy="login-button"]').should('be.visible').and('not.be.disabled')

    // Try submitting the form directly
    cy.get('form').submit()

    // Wait for the API call to complete and verify it returns 401
    cy.wait('@loginRequest', { timeout: 10000 }).then((interception) => {
      expect(interception.response?.statusCode).to.equal(401)
    })

    // After failed login, we should still be on the login page
    cy.url().should('include', '/login')
  })
})
