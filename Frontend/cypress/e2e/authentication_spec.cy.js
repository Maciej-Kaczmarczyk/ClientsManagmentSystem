describe("Authentication", () => {
  it("Succesfully loads Login page", () => {
    cy.visit("http://localhost:5173/");
    cy.get("form").should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
  });
  it("Succesfully loads Signup page", () => {
    cy.visit("http://localhost:5173/signup");
    cy.get("form").should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('input[name="password_confirmation"]').should("exist");
  });
  it("User can login", () => {
    cy.visit("http://localhost:5173/");
    cy.get('input[name="email"]').type("admin");
    cy.get('input[name="password"]').type("admin");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/clients");
  });
  it('Adding and deleting new user', () => {
  cy.visit('http://localhost:5173/');
  cy.get('input[name="email"]').type("admin");
  cy.get('input[name="password"]').type("admin");
  cy.get('button[type="submit"]').wait(2000).click();
  cy.get('button').contains("Add Client").click();
  cy.get('input[placeholder="First Name"]').type('Jan');
  cy.get('input[placeholder="Last Name"]').type('Kowalski');
  cy.get('input[placeholder="Address"]').type('Szymany 46');
  cy.get('input[placeholder="City"]').type('Szczytno');
  cy.get('input[placeholder="Zip Code"]').type('12-100');
  cy.get('input[placeholder="Phone Number"]').type('555666999');
  cy.get('input[placeholder="Email"]').type('jan.kowalski@gmail.com');
  cy.get('button').contains('Add Client').wait(2000).click();
  cy.get('li').contains('Kowalski').should('exist');
  cy.get('li').contains('Kowalski').parent().parent().parent().find('svg').click();
  cy.get('li').contains('Delete').wait(2000).click();
  });
  it("Changing client's data", () => {
  cy.visit('http://localhost:5173/');
  cy.get('input[name="email"]').type("admin");
  cy.get('input[name="password"]').type("admin");
  cy.get('button[type="submit"]').wait(2000).click();
  cy.get('li').contains("Maciej").parent().parent().parent().find('svg').click();
  cy.get('li').contains('Edit').click();
  cy.get('input[placeholder="First Name"]').clear().type('Arkadiusz');
  cy.get('input[placeholder="Last Name"]').clear().type('Michalski');
  cy.get('input[placeholder="Address"]').clear().type('Sasek 111');
  cy.get('input[placeholder="City"]').clear().type('Test');
  cy.get('input[placeholder="Zip Code"]').clear().type('11-222');
  cy.get('input[placeholder="Phone Number"]').clear().type('123456789');
  cy.get('input[placeholder="Email"]').clear().type('armich@test.com');
  cy.get('button').contains("Edit Client").click();
  });
  it('Dashboard page', () => {
  cy.visit('http://localhost:5173/');
  cy.get('input[name="email"]').type("admin");
  cy.get('input[name="password"]').type("admin");
  cy.get('button[type="submit"]').wait(2000).click(); 
  cy.get('a').contains('Dashboard').click();
});
it('Orders Page', () => {
  cy.visit('http://localhost:5173/');
  cy.get('input[name="email"]').type("admin");
  cy.get('input[name="password"]').type("admin");
  cy.get('button[type="submit"]').wait(2000).click(); 
  cy.get('a').contains('Orders').click();  
});
it('Log out', () => {
  cy.visit('http://localhost:5173/');
  cy.get('input[name="email"]').type("admin");
  cy.get('input[name="password"]').type("admin");
  cy.get('button[type="submit"]').wait(2000).click(); 
  cy.get('p').contains('Logout').click();
});



})