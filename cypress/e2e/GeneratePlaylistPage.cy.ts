describe('GeneratePlaylistPage tests', () => {
  
  beforeEach(() => {
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
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/generate-playlist");
  })
  
  it('Contains correct header and fields', () => {
    
    cy.get("[data-test='title']").should("contain.text", "Generate a Playlist");
    cy.get('#floatingPlaylistName').should("be.empty");
    cy.get('#floatingGenre').should("be.empty");
    cy.get('#floatingArtist').should("be.empty");
    cy.get('.page > form > [type="submit"]').contains("Generate Playlist");
  });

  it('should reject a request with out a genre and artist', () => {
    cy.get("[data-test='title']").should("contain.text", "Generate a Playlist");
    cy.get('#floatingPlaylistName').type("Super Awesome Playlist");
    cy.get('.page > form > [type="submit"]').click();
    cy.get('.alert').contains("Error:");
  })

  it('should reject a request without a Playlist Name', () => {
    cy.get("[data-test='title']").should("contain.text", "Generate a Playlist");
    cy.get('#floatingGenre').type("metal");
    cy.get('#floatingArtist').type("Prince");
    cy.get('.page > form > [type="submit"]').click();
    cy.get('.alert').contains("Error:");
  })

  it('prompts spotify connection when given valid inputs', () => {
    cy.get("[data-test='title']").should("contain.text", "Generate a Playlist");
    cy.get('#floatingPlaylistName').type("Super Awesome Playlist");
    cy.get('#floatingGenre').type("metal");
    cy.get('#floatingArtist').type("Prince");
    cy.get('.page > form > [type="submit"]').click();
    cy.get('.alert').contains("Error:");
    cy.get('div > .btn').contains("Connect to Spotify");
  })

  it('leads to spotify when followed through', () => {
    cy.get("[data-test='title']").should("contain.text", "Generate a Playlist");
    cy.get('#floatingPlaylistName').type("Super Awesome Playlist");
    cy.get('#floatingGenre').type("metal");
    cy.get('#floatingArtist').type("Prince");
    cy.get('.page > form > [type="submit"]').click();
    cy.get('.alert').contains("Error:");
    cy.get('div > .btn').click();
    
    cy.origin('https://accounts.spotify.com', () => {
      cy.get('h1').contains("Log in to Spotify");
    })
  })
});