describe('SettingsDropdown tests', () => {
  const username = "user1";

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
    cy.get('#floating-new-password').should("be.empty");
    cy.get('#floating-confirm-password').should("be.empty");
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
  const suffix = Math.random();
  const firstUsername = "user" + suffix;
  
  const changedUsername = "new" + suffix;

  it("doesn't allow a change to the same username", () => {

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

    cy.get('.dropdown > .nav-link').click()
    cy.get('.dropdown-menu > :nth-child(2) > .dropdown-item').should("contain.text", "Edit Profile").click();
    cy.get('h1').should("contain.text", "Settings");
    cy.get('[placeholder="Username"]').clear()
    cy.get('[placeholder="Username"]').type(firstUsername);
    cy.get('form.container > [type="submit"]').click();
    cy.get('p').should("contain.text", "Username reset failed");    
  })

  it("can change the user's username", () => {

    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/login");
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

    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/settings/edit-profile");
    cy.get('[placeholder="Username"]').clear();
    cy.get('[placeholder="Username"]').should("be.empty");
    cy.get('[placeholder="Username"]').type(changedUsername);
    cy.get('[aria-label="Edit Profile"] > [type="submit"]').click();
    cy.get('.dropdown > .nav-link').should("contain.text", changedUsername);
    
  })
});

describe("settings/password-reset tests", () => {
  const suffix = Math.random();
  const firstUsername = "user" + suffix;
  
  beforeEach(() => {
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
  })

  it("can change the user's password", () => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/settings/password-reset");
    cy.get('#floating-old-password').type('pass1');
    cy.get('#floating-new-password').type('sdfadfwefaw');
    cy.get('#floating-confirm-password').type('sdfadfwefaw');
    cy.get('.page > form > [type="submit"]').click();
    cy.get('[data-test="title"]').should("contain.text", "Login");
    
  })
});

describe("settings/delete-profile tests", () => {
  const suffix = Math.random();
  const firstUsername = "user" + suffix;
  
  beforeEach(() => {
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
  })

  it("can delete the user's account", () => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/settings/delete-profile");
    cy.get('form > :nth-child(1) > .form-control').type(firstUsername);
    cy.get(':nth-child(2) > .form-control').type('pass1');
    cy.get('.page > form > [type="submit"]').click();
    cy.get('[data-test="title"]').should("contain.text", "Login");
  })
});