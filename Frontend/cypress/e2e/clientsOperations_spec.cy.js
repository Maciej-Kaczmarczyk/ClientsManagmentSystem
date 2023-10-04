describe('Clients Operations', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    cy.get('input[name="email"]').type('admin');
    cy.get('input[name="password"]').type('admin');
    cy.get('button').click();
    cy.wait(2000)
    })

  it('Adding Client', () => {
    cy.get('button').contains("Add Client").click();
    cy.get('input[placeholder="First Name"]').type('Test');
    cy.get('input[placeholder="Last Name"]').type('Test');
    cy.get('input[placeholder="Address"]').type('Test 123');
    cy.get('input[placeholder="City"]').type('Test');
    cy.get('input[placeholder="Zip Code"]').type('11-222');
    cy.get('input[placeholder="Phone Number"]').type('123456789');
    cy.get('input[placeholder="Email"]').type('test.test@test.com');
    cy.get('button').contains("Add Client").click();
    cy.get('a').contains('test.test@test.test').should('exist')
  })
  
  it('Deleting added client', () => {
    cy.get('a').contains('test.test@test.test').parent().parent().parent().find('svg').click();
    cy.get('li').contains('Delete').click();
    cy.get('a').contains('test.test@test.test').should('not.exist');
  })
})