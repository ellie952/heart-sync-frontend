describe('SettingsDropdown tests', () => {
  const username = "user1";
  //const password = "pass1";

  beforeEach(() => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/login");
    cy.get("[placeholder='Username']").type(username);
    cy.get("[placeholder='Password']").type("pass1{enter}");
    cy.get('.dropdown > .nav-link').click();
  })

  it('Contains correct values', () => {
    cy.get('.dropdown-menu > :nth-child(1) > .dropdown-item').should("contain.text", "My Profile");
    cy.get('.dropdown-menu > :nth-child(2) > .dropdown-item').should("contain.text", "Edit Profile");
    cy.get('.dropdown-menu > :nth-child(3) > .dropdown-item').should("contain.text", "Reset Password");
    cy.get('.dropdown-menu > :nth-child(4) > .dropdown-item').should("contain.text", "Delete Profile");
    cy.get('a.dropdown-item > .dropdown-item').should("contain.text", "Logout")
  });

  it("Can direct to the user's profile", () => {
    cy.get('.dropdown-menu > :nth-child(1) > .dropdown-item').should("contain.text", "My Profile").click();
    cy.get('h1').should("contain.text", username);
  });

  it("Can direct to the edit profile page", () => {
    cy.get('.dropdown-menu > :nth-child(2) > .dropdown-item').should("contain.text", "Edit Profile").click();
    cy.get('h1').should("contain.text", "Settings");
    cy.get('#root > :nth-child(2) > div > :nth-child(1)').should("contain.text", "Add a Profile Picture");
    cy.get('[placeholder="Username"]').should("have.value", username);
  });

  it("Can direct to the reset password page", () => {
    cy.get('.dropdown-menu > :nth-child(3) > .dropdown-item').should("contain.text", "Reset Password").click();
    cy.get('[placeholder="Old password"]').should("be.empty");
    cy.get('[placeholder="New password"]').should("be.empty");
    cy.get('[placeholder="Confirm new password"]').should("be.empty");
  })

  it("Can direct to the profile deletion page", () => {
      cy.get('.dropdown-menu > :nth-child(4) > .dropdown-item').should("contain.text", "Delete Profile").click();
      cy.get('h1').should("contain.text", "Settings");
      cy.get('[placeholder="Confirm username"]').should("be.empty");
      cy.get('[placeholder="Confirm password"]').should("be.empty");
  })

  it('can be used to logout', () => {
    //cy.get('.dropdown > .nav-link').click();
    cy.get('a.dropdown-item > .dropdown-item').should("contain.text", "Logout").click();
    cy.get('[data-test="title"]').should("contain.text", "HeartSync");

  })
});

describe("settings/edit-profile tests", () => {
  const username = "user1";
  const changedUsername = "user1101";

  beforeEach(() => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/login");
    cy.get("[placeholder='Username']").type(username);
    cy.get("[placeholder='Password']").type("pass1{enter}");
    cy.get('.dropdown > .nav-link').click();
    cy.get('.dropdown-menu > :nth-child(2) > .dropdown-item').should("contain.text", "Edit Profile").click();
  })

  it("can change the user's username", () => {
    cy.get('[placeholder="Username"]').clear().type(changedUsername);
    cy.get('[aria-label="Edit Profile"] > [type="submit"]').click();
    cy.get('.dropdown > .nav-link').should("contain.text", changedUsername);
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/settings/edit-profile");

    cy.get('[placeholder="Username"]').clear().type("user1");
    cy.get('[aria-label="Edit Profile"] > [type="submit"]').click();
  })
});