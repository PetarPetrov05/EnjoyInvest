describe("Login/Register Page", () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit("http://localhost:3000/login") // Adjust port if needed
  })

  it("shows login form by default", () => {
    cy.contains("button", "Sign In").should("have.class", "bg-background")
    cy.contains("button", "Register").should("not.have.class", "bg-background")
    cy.get("form").should("contain.text", "Email")
    cy.get("form").should("contain.text", "Password")
  })

  it("switches to register form when clicking Register tab", () => {
    cy.get('[data-cy="register-tab"]').click()

    cy.contains("button", "Register").should("have.class", "bg-background")
    cy.contains("button", "Sign In").should("not.have.class", "bg-background")
    cy.get("form").should("contain.text", "Confirm Password")
  })

  it("successfully registers a new user", () => {
  cy.intercept("POST", "/api/auth/register", {
    statusCode: 201,
    body: {
      message: "User registered successfully",
      user: {
        id: 1,
        email: "newuser@test.com"
      }
    }
  }).as("registerRequest")

  cy.get('[data-cy="register-tab"]').click()

  cy.get('[data-cy="username-input"]').type("newuser@test.com")
  cy.get('[data-cy="name-input"]').type("newuser@test.com")
  cy.get('[data-cy="register-email-input"]').type("newuser@test.com")
  cy.get('[data-cy="register-password-input"]').type("123456")
  cy.get('[data-cy="confirm-password-input"]').type("123456")

  cy.get('[data-cy="register-button"]').click()

  cy.wait("@registerRequest").its("request.body").should((body) => {
    expect(body.email).to.equal("newuser@test.com")
    expect(body.password).to.equal("123456")
  })

  // After successful register, user should be logged in or redirected
  cy.url().should("eq", "http://localhost:3000/") // Adjust if redirect is different
})

})
