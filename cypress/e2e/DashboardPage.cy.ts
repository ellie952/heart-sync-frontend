describe("DashboardPage tests", () => {
  it("Contains correct header", () => {
    const fakeUserId = "USER#test-user-123";

    cy.visit(`${Cypress.env("FRONTEND_BASE_URL")}/dashboard/${encodeURIComponent(fakeUserId)}`);

    cy.get("[data-test='title']").should("contain.text", "Dashboard");
  });
});