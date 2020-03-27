describe("Testing our form inputs", function() {
    beforeEach(function() {
      cy.visit("http://localhost:3000/");
    })
    it("Adds text to inputs and submits form", function() {
      cy.get('input[name="name"]')
        .type("Heath")
        .should("have.value", 'Heath');
      cy.get('input[name="email"]')  
        .type("email@email.com")
        .should("have.value", "email@email.com");
        cy.get('#exampleSelect')
        .select("Other")
        .should("have.value", "Other")
        cy.get("input[name=password]")
          .type("password")
          .should("have.value", "password");
        cy.get('[type="checkbox"]').check();
        cy.get("button").click();
        
  })
})