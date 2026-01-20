describe('Admin Edit Offer', () => {

  it('should login, navigate to offers, and edit an existing offer', () => {
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
    cy.url().should('eq', 'http://localhost:3000/admin')

    // 4️⃣ Navigate to Offers Management
    cy.get('[data-cy="sidebar-offers-management-link"]').click()
    cy.url().should('eq', 'http://localhost:3000/admin/offers')

    // 5️⃣ Wait for offers to load
    cy.wait(1000)

    // 6️⃣ Find the first offer and click the actions menu
    cy.get('table tbody tr').first().within(() => {
      // Click the dropdown menu button (MoreHorizontal icon)
      cy.get('button[aria-haspopup="menu"]').click()
    })

    // 7️⃣ Click "Edit Offer" from the dropdown menu
    cy.get('body').contains('Edit Offer').click({ force: true })

    // 8️⃣ Verify we're on the edit page (URL should contain /admin/offers/{id}/edit)
    cy.url().should('include', '/admin/offers/')
    cy.url().should('include', '/edit')

    // 9️⃣ Edit the offer fields
    cy.get('[data-cy="title-input"]').clear().type('Updated Investment Offer')
    
    // Edit type dropdown
    cy.get('[data-cy="type-select"]').click()
    cy.get('body').contains('For Rent').click({ force: true })
    
    cy.get('[data-cy="category-input"]').clear().type('Real Estate')
    cy.get('[data-cy="price-input"]').clear().type('2500')
    cy.get('[data-cy="location-input"]').clear().type('New York')
    cy.get('[data-cy="description-textarea"]').clear().type('Updated short description for the offer')
    cy.get('[data-cy="full-description-textarea"]').clear().type('This is an updated full detailed description of the investment offer with more information.')
    // cy.get('[data-cy="main-image-input"]').clear().type('https://example.com/updated-main.jpg')
    cy.get('[data-cy="contact-phone-input"]').clear().type('+987654321')
    cy.get('[data-cy="contact-email-input"]').clear().type('updated@enjoyinvest.com')

    // 🔟 Add another additional image (if the form allows multiple)
    cy.get('body').then($body => {
      if ($body.find('button:contains("Add Image")').length > 0) {
        cy.contains('button', 'Add Image').click()
        cy.get('input[placeholder="https://example.com/image.jpg"]').last().type('https://example.com/another-image.jpg')
      }
    })

    // 1️⃣1️⃣ Intercept the update request
    cy.intercept('PUT', '/posters/*').as('updateOffer')

    // 1️⃣2️⃣ Submit the form
    cy.get('[data-cy="save-changes-button"]').click()

    // 1️⃣3️⃣ Wait for the update to complete
    cy.wait('@updateOffer', { timeout: 10000 })
    
    // 1️⃣4️⃣ Navigate back to offers list to verify changes
    cy.visit('/admin/offers')
    cy.wait(1000)
    cy.reload()

    // 1️⃣5️⃣ Verify the updated offer exists in the table
    cy.contains('Updated Investment Offer', { timeout: 10000 }).should('exist')
    cy.contains('Real Estate').should('exist')
    cy.contains('$2500').should('exist')
  })

  it('should cancel editing an offer and return to offers list', () => {
    // 1️⃣ Login
    cy.visit('/login')
    cy.get('[data-cy="email-input"]').type('petar.aleksandrov104@gmail.com')
    cy.get('[data-cy="password-input"]').type('123')
    cy.get('[data-cy="login-button"]').click()
    cy.url().should('eq', 'http://localhost:3000/')

    // 2️⃣ Navigate to Admin Offers
    cy.get('[data-cy="user-menu-trigger"]').click()
    cy.get('[data-cy="admin-dashboard-link"]').click()
    cy.get('[data-cy="sidebar-offers-management-link"]').click()
    cy.wait(1000)

    // 3️⃣ Click edit on first offer
    cy.get('table tbody tr').first().within(() => {
      cy.get('button[aria-haspopup="menu"]').click()
    })
    cy.get('body').contains('Edit Offer').click({ force: true })

    // 4️⃣ Verify we're on edit page
    cy.url().should('include', '/edit')

    // 5️⃣ Click Cancel button (if exists)
    cy.get('body').then($body => {
      if ($body.find('button:contains("Cancel")').length > 0) {
        cy.contains('button', 'Cancel').click()
        // Should return to offers page
        cy.url().should('eq', 'http://localhost:3000/admin/offers')
      }
    })
  })

  it('should view an offer before editing', () => {
    // 1️⃣ Login
    cy.visit('/login')
    cy.get('[data-cy="email-input"]').type('petar.aleksandrov104@gmail.com')
    cy.get('[data-cy="password-input"]').type('123')
    cy.get('[data-cy="login-button"]').click()
    cy.url().should('eq', 'http://localhost:3000/')

    // 2️⃣ Navigate to Admin Offers
    cy.get('[data-cy="user-menu-trigger"]').click()
    cy.get('[data-cy="admin-dashboard-link"]').click()
    cy.get('[data-cy="sidebar-offers-management-link"]').click()
    cy.wait(1000)

    // 3️⃣ Click View Offer from dropdown
    cy.get('table tbody tr').first().within(() => {
      cy.get('button[aria-haspopup="menu"]').click()
    })
    cy.get('body').contains('View Offer').click({ force: true })

    // 4️⃣ Verify we're on the offer detail page
    cy.url().should('include', '/offers/')
    cy.url().should('not.include', '/edit')

    // 5️⃣ Verify offer content is displayed
    cy.get('h1, h2').should('exist') // Title should be visible
    
    // 6️⃣ Navigate back and go to edit
    cy.go('back')
    cy.wait(500)
    
    cy.get('table tbody tr').first().within(() => {
      cy.get('button[aria-haspopup="menu"]').click()
    })
    cy.get('body').contains('Edit Offer').click({ force: true })
    
    // Verify we're now on edit page
    cy.url().should('include', '/edit')
  })
})