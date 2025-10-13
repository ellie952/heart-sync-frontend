describe('LandingPage tests', () => {
  it('passes', () => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL"));
    cy.contains("HeartSync").should("exist");
  })
})