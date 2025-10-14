describe('GeneratePlaylistPage tests', () => {
  it('Contains correct header', () => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/generate-playlist");
    cy.get("[data-test='title']").should(
      "contain.text", "Generate a Playlist"
    );
  });
});