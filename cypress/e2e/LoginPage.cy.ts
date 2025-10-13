describe('LoginPage tests', () => {
  it('Contains correct header', () => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/login");
    cy.get("[data-test='title']").should(
      "contain.text", "Login"
    );
  });
});