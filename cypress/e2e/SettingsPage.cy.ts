describe('SettingsPage tests', () => {
  it('Contains correct header', () => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/settings");
    cy.get("[data-test='title']").should(
      "contain.text", "Settings"
    );
  });
});