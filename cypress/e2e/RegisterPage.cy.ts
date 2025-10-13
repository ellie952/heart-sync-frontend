describe('RegisterPage tests', () => {
  it('Contains correct header', () => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/register");
    cy.get("[data-test='title']").should(
      "contain.text", "Register"
    );
  });
});