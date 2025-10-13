describe('LandingPage tests', () => {
  it('Contains correct header and description', () => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL"));
    cy.get("[data-test='title']").should(
      "contain.text", "HeartSync"
    );
    cy.get("[data-test='description']").should(
      "contain.text", "A playlist-building platform with a physical-activity focus."
    )
  })
})