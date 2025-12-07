describe('Login Page', () => {
  it('should login successfully and redirect to home', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('#email').type('petar.aleksandrov104@gmail.com')
    cy.get('#password').type('123')

    cy.contains('Sign In').click()

   
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('should show error message if credentials are invalid', () => {
    cy.visit('http://localhost:3000/login')

    cy.get('#email').type('wrong@email.com')
    cy.get('#password').type('wrongpassword')

    cy.contains('button', 'Sign In').click()

    cy.contains('Invalid email or password').should('exist')
  })
})
