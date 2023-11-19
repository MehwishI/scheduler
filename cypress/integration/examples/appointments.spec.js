describe("Appointment",()=>{
  it("Should book an interview",()=>{
   
    cy.request("GET", "/api/debug/reset")

   
    cy.visit("/");
    cy.contains("Monday");

    // cy.get('[alt=Add]')
    //   .first()
    //   .should('be.visible')
    //   .should('be.enabled')
    //   .click();
  

      cy.get("[alt=Add]")
      .first()
      .click({ force: true });

    // cy.get('[alt="Add"]').first().then((button) => {
    //   cy.log('Button object:', button);
    //   cy.log('Is button visible:', button.is(':visible'));
    //   cy.log('Is button hidden:', button.is(':hidden'));
    // });
    // cy.get("[alt=Add]")
    // .first()
    // .trigger("mouseover")
  
    // .click({ force: true });

    //---must  be uncommmented after fixing it----
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });
  
    it("should edit an interview", () => {
      cy.get("[alt=Edit]")
        .first()
        .click({ force: true });
    
      cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
      cy.get("[alt='Tori Malcolm']").click();
    
      cy.contains("Save").click();
    
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Tori Malcolm");
    });

    it("should cancel an interview", () => {
      cy.get("[alt=Delete]").first()
        .click({ force: true });
    
      cy.contains("Confirm").first().click({force:true});
    
      cy.contains("Deleting").should("exist");
      cy.contains("Deleting").should("not.exist");
    
      cy.contains(".appointment__card--show", "Archie Cohen")
        .should("not.exist");
    });
 
})