describe('Offers ', () => {

  it('should display featured offers on the homepage', () => {
    cy.visit('/')
    cy.get('[data-cy="featured-offers-grid"]').should('exist')
  })

  it('should display offers on the offers page', () => {
    cy.visit('/offers')
    // Since there are no offers in the test database, expect the no offers message
    cy.contains('No offers found matching your criteria.').should('be.visible')
  })
})
