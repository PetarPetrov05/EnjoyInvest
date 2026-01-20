describe('Offers ', () => {

  beforeEach(() => {
    cy.visit('/offers')
  })

  it('should display featured offers on the homepage', () => {
    cy.get('[data-cy="offers-grid"]').should('have.length.at.least', 1)
  })

  it('should navigate to offer details when clicking "Offer Details"', () => {
   
    cy.get('[data-cy="offers-grid"]').first().within(() => {
      cy.get('[data-cy="view-details-button"]').click()
    })

    cy.url().should('include', '/offers/')

    cy.get('span').should('exist').contains("Back to Offers");
  })
})
