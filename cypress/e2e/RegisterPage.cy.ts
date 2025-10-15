describe('RegisterPage tests', () => {
  const suffix = Math.random();
  // in order to generate unique username and emails that don't
  // conflict with the existing database

  beforeEach(() => {
    cy.visit(Cypress.env("FRONTEND_BASE_URL") + "/register");
    
  })

  it('Contains correct headers', () => {
    cy.get("[data-test='title']").should(
      "contain.text", "Register"
    );
    cy.get("[href='/login']").should(
      "contain.text", "Login"
    );
    cy.get("[href='/register']").should(
      "contain.text", "Register"
    );
  });

  it('contains correct fields', () => {
    

    cy.get("[placeholder='Username']").should("be.empty");
    cy.get("[placeholder='Email']").should("be.empty");
    cy.get("[placeholder='Password']").should("be.empty");
    cy.get("[placeholder='Confirm password']").should("be.empty");
    cy.get("[type='submit']").should("be.empty");
  })

  it('should reject a registration with missing credentials', () => {
    cy.get("[placeholder='Username']").type('user9559');
    cy.get("[placeholder='Email']").type('user9559@revature.net');
    cy.get("[placeholder='Confirm password']").type('pass1{enter}');

    cy.get("p").should(
      "contain.text", "Registration failed:"
    )
  })

  it('should allow logging in with correct credentials', () => {
    cy.get("[placeholder='Username']").type(`user${suffix}`);
    cy.get("[placeholder='Email']").type(`user${suffix}@revature.net`);
    cy.get("[placeholder='Password']").type('pass1');
    cy.get("[placeholder='Confirm password']").type('pass1{enter}');

    cy.get("[data-test='title']").should(
      "contain.text", "Login"
    );
  })

  it('should reject a registration with already used credentials', () => {
    cy.get("[placeholder='Username']").type(`user${suffix}`);
    cy.get("[placeholder='Email']").type(`user${suffix}@revature.net`);
    cy.get("[placeholder='Password']").type('pass1');
    cy.get("[placeholder='Confirm password']").type('pass1{enter}');

    cy.get("p").should(
      "contain.text", "Registration failed:"
    )
  })


});