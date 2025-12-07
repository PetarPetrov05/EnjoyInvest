describe('Offers ', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display featured offers on the homepage', () => {
    cy.get('#offers').should('have.length.at.least', 1)
  })

  it('should navigate to offer details when clicking "Offer Details"', () => {
   
    cy.get('#offers').first().within(() => {
      cy.contains('View Details').click()
    })

    cy.url().should('include', '/offers/')

    cy.get('span').should('exist').contains("Back to Offers");
  })
})
