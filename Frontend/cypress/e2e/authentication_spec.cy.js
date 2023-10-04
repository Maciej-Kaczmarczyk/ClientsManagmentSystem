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
});
