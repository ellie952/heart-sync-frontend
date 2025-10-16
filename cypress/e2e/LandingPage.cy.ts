describe('LandingPage tests', () => {

  beforeEach(() => {
    //cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/login");
  })

  it('Contains correct header and description when not logged in', () => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL"));
    cy.get("[data-test='title']").should(
      "contain.text", "HeartSync"
    );
    cy.get("[data-test='description']").should(
      "contain.text", "A playlist-building platform with a physical-activity focus."
    )
    cy.get("[href='/login']").should(
      "contain.text", "Login"
    );
    cy.get("[href='/register']").should(
      "contain.text", "Register"
    );
  })

  it('Contains correct header and description when logged in', () => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/login");
    cy.get("[placeholder='Username']").type(
      'user1'
    );
    cy.get("[placeholder='Password']").type(
      'pass1{enter}'
    );
    cy.get("[data-test='title']").should(
      "contain.text", "Dashboard"
    )
    cy.visit(Cypress.env("FRONTEND_BASE_URL"));
    cy.get("[data-test='title']").should(
      "contain.text", "HeartSync"
    );
    cy.get("[data-test='description']").should(
      "contain.text", "A playlist-building platform with a physical-activity focus."
    )
    cy.get('.dropdown > .nav-link').should("contain.text", "@user1");
  })


})