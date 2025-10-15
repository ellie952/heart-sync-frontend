describe('LoginPage tests', () => {
  
  beforeEach(() => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/login");
  })
  
  it('Contains correct header', () => {
    
    cy.get("[data-test='title']").should(
      "contain.text", "Login"
    );
    cy.get("[href='/login']").should(
      "contain.text", "Login"
    );
    cy.get("[href='/register']").should(
      "contain.text", "Register"
    );
  });

  it('contains correct fields', () => {
    cy.get("[placeholder='Username']").should(
      "contain.text", ""
    );
    cy.get("[placeholder='Password']").should(
      "contain.text", ""
    );
    cy.get("[type='submit']").should(
      "contain.text", ""
    );
  })

  it('should allow logging in with correct credentials', () => {
    cy.get("[placeholder='Username']").type(
      'user1'
    );
    cy.get("[placeholder='Password']").type(
      'pass1{enter}'
    );
    cy.get("[data-test='title']").should(
      "contain.text", "Dashboard"
    )
  })

  it('should reject a login with incorrect credentials', () => {
    cy.get("[placeholder='Username']").type(
      'user10'
    );
    cy.get("[placeholder='Password']").type(
      'pass10{enter}'
    );
    cy.get("p").should(
      "contain.text", "Login failed:"
    )
  })

  it('should not allow a logged in user to log in again', () => {
    cy.get("[placeholder='Username']").type(
      'user1'
    );
    cy.get("[placeholder='Password']").type(
      'pass1{enter}'
    );
    cy.get("[data-test='title']").should(
      "contain.text", "Dashboard"
    )
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/login");
    cy.get("p").should(
      "contain.text", "You are already logged in."
    )
  })

});