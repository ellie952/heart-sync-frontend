describe("DashboardPage tests", () => {
  it("Contains correct header", () => {
    const fakeUserId = "USER#test-user-123";

    cy.visit(`${Cypress.env("FRONTEND_BASE_URL")}/dashboard/${encodeURIComponent(fakeUserId)}`);

    cy.get("[data-test='title']").should("contain.text", "Dashboard");
  });

  const suffix = Math.random();
  const firstUsername = "user" + suffix;
  
  it("shows the user's post(s)", () => {

    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/register");
    cy.get("[placeholder='Username']").type(firstUsername);
    cy.get("[placeholder='Email']").type(firstUsername + "@revature.net");
    cy.get("[placeholder='Password']").type('pass1');
    cy.get("[placeholder='Confirm password']").type('pass1{enter}');

    cy.get("[data-test='title']").should(
      "contain.text", "Login"
    );

    cy.get("[placeholder='Username']").type(firstUsername);
    cy.get("[placeholder='Password']").type(
      'pass1{enter}'
    );
    cy.get("[data-test='title']").should(
      "contain.text", "Dashboard"
    )
    cy.get(':nth-child(3) > .nav-link').click();
    cy.get(':nth-child(1) > #activityInput').type("This is my activity!");
    cy.get('#spotifyLinkInput').type("https://testlink.com");
    cy.get(':nth-child(3) > #activityInput').type("This is a test caption!");
    cy.get('.post-form > [type="submit"]').click();
    cy.get('.card-body').contains(firstUsername);
    cy.get('.card-body').contains("This is my activity!");
       
  })

});