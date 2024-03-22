beforeEach(() => {
  cy.visit("/companies");
});

describe("Companies Page", () => {
  it("Opens Companies Page", () => {
    cy.contains(`h2[class*="chakra-heading"]`, "Companies").should("exist");
    cy.get(`[data-test-id="reset-company-btn"]`).should("exist");
    cy.get(`[data-test-id="add-company-btn"]`).should("exist");
  });

  it('Opens Companies Form', () => {
    cy.get(`[data-test-id="add-company-btn"]`).should("exist");
    cy.get(`[data-test-id="add-company-btn"]`).click();
    cy.get(`form[data-test-id="company-form"]`).should('exist');
    cy.get(`[data-test-id="company-form-header"]`).contains('Add Company').should('exist');
    cy.get(`button[data-test-id="company-form-cancel"]`).should("exist");
    cy.get(`button[data-test-id="company-form-submit"]`).should("exist");
  });
});

describe('Companies Form', () => {
  beforeEach(() => {
    cy.get(`a[data-test-id="add-company-btn"]`).should("exist");
    cy.get(`a[data-test-id="add-company-btn"]`).click();
    cy.get(`form[data-test-id="company-form"]`).should("exist");
    cy.get(`button[data-test-id="company-form-cancel"]`).should("exist");
    cy.get(`button[data-test-id="company-form-submit"]`).should("exist");
    cy.get(`button[data-test-id="company-delete-btn"]`).should("not.exist");
  });

  context("Cancel Add Resource", () => {
    it("Cancel Add Resource", () => {
      cy.get('input[name="name"]').type("Jihyo");
      cy.wait(100);
      cy.get(`button[data-test-id="company-form-cancel"]`).click();
      cy.url().should("include", "/companies");
    });
  })

  context('Failed Add Company', () => {
    beforeEach(() => {
      cy.get('input[name="name"]').type(" ");
      cy.get('input[name="contactPerson"]').type("shr3k");
      cy.get('input[name="email"]').type("shreegmail@com");
      cy.get('input[name="address"]').type(" ");
      cy.get('input[name="contactNumber"]').type("1233");

      cy.get('input[name="name"]').should('not.have.attr', 'readonly');
      cy.get('input[name="contactPerson"]').should('not.have.attr', 'readonly');
      cy.get('input[name="email"]').should('not.have.attr', 'readonly');
      cy.get('input[name="address"]').should('not.have.attr', 'readonly');
      cy.get('input[name="contactNumber"]').should('not.have.attr', 'readonly');
    })


    it("Invalid length of company name", () => {
      cy.get(`button[data-test-id="company-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid length of name"
      ).should("exist");
    });

    it("Invalid contact person", () => {
      cy.get(`button[data-test-id="company-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid contact name"
      ).should("exist");
    });

    it("Invalid email address", () => {
      cy.get(`button[data-test-id="company-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid email address"
      ).should("exist");
    });

    it("Invalid address", () => {
      cy.get(`button[data-test-id="company-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid address"
      ).should("exist");
    });

    it("Invalid contact number", () => {
      cy.get(`button[data-test-id="company-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid contact"
      ).should("exist");
    }); 

    it("Blank Input", () => {
      cy.get('input[name="name"]').clear();
      cy.get(`button[data-test-id="company-form-submit"]`).click();

    }); 
  });

  context('Successful Add Company', () => {
    beforeEach(() => {
      cy.get('input[name="name"]').type("Apple Inc.");
      cy.get('input[name="contactPerson"]').type("Steve Jobs");
      cy.get('input[name="email"]').type("steve.jobs@apple.com");
      cy.get('input[name="address"]').type("Cupertino, California");
      cy.get('input[name="contactNumber"]').type("09662390267");
    })

    it('Successful Validations', () => {
      cy.get(`[data-test-id="company-form-submit"]`).click();

      cy.contains(
        `h2[class="swal2-title"]`,
        "Company Added"
      ).should("exist");

      cy.visit('/companies')
      cy.url().should("match", /\/companies$/);
    })
  })
})

describe('Updating Companies Page', () => {
  beforeEach(() => {
    //cy.visit(`/companies`);
    cy.get('.row:eq(0)').click();
    cy.get(`[data-test-id="company-form-header"]`).contains('Update Company').should('exist');
    cy.get(`button[data-test-id="company-delete-btn"]`).should("exist");
    cy.get(`button[data-test-id="company-update-btn"]`).should("exist");
  })

  it('Open Form with Exisiting Data', () => {
    cy.get('input[name="name"]').should('have.attr', 'readonly');
    cy.get('input[name="contactPerson"]').should('have.attr', 'readonly');
    cy.get('input[name="email"]').should('have.attr', 'readonly');
    cy.get('input[name="address"]').should('have.attr', 'readonly');
    cy.get('input[name="contactNumber"]').should('have.attr', 'readonly');

    
  })

  it('Update Information', () => {
    cy.get(`button[data-test-id="company-update-btn"]`).click();

    cy.get(`button[data-test-id="company-form-submit"]`).should("exist");
    cy.get(`button[data-test-id="company-form-cancel"]`).should("exist");

    cy.get('input[name="name"]').should('not.have.attr', 'readonly');
    cy.get('input[name="contactPerson"]').should('not.have.attr', 'readonly');
    cy.get('input[name="email"]').should('not.have.attr', 'readonly');
    cy.get('input[name="address"]').should('not.have.attr', 'readonly');
    cy.get('input[name="contactNumber"]').should('not.have.attr', 'readonly');

    cy.get('input[name="name"]').clear();
    cy.get('input[name="name"]').type('Microsoft Inc.');
    
    cy.get('input[name="contactPerson"]').clear();
    cy.get('input[name="contactPerson"]').type('Bill Gates');

    cy.get('input[name="contactNumber"]').clear();
    cy.get('input[name="contactNumber"]').type('09662390267');

    cy.get(`button[data-test-id="company-form-submit"]`).click();

    cy.contains(
      `h2[class="swal2-title"]`,
      "Company Updated"
    ).should("exist");

    cy.visit('/companies')
    cy.url().should("match", /\/companies$/);
  })
})

describe('Delete Request', () => {
  beforeEach(() => {
    cy.get('.row:eq(0)').click();
    cy.get(`[data-test-id="company-form-header"]`).contains('Update Company').should('exist');
    cy.get(`[data-test-id="company-form-header"]`).contains('Add Company').should('not.exist');
    cy.get(`button[data-test-id="company-delete-btn"]`).should("exist");
  
    cy.get(`button[data-test-id="company-update-btn"]`).should("exist");
    cy.get(`button[data-test-id="company-form-submit"]`).should("not.exist");
    cy.get(`button[data-test-id="company-form-cancel"]`).should("not.exist");
  });

  it('Cancel delete a company', () => {
    cy.get(`button[data-test-id="company-delete-btn"]`).click();

    cy.contains(
      `h2[class="swal2-title"]`,
      "Are you sure?"
    ).should("exist");

    cy.get(`button[class="swal2-cancel swal2-styled swal2-default-outline"]`).contains('Cancel').should('exist');
    cy.get(`button[class="swal2-cancel swal2-styled swal2-default-outline"]`).contains('Cancel').click();

    cy.url().should("include", "/companies");
  })

  it('Delete a company', () => {
    cy.get(`button[data-test-id="company-delete-btn"]`).click();

    cy.contains(
      `h2[class="swal2-title"]`,
      "Are you sure?"
    ).should("exist");
  
    cy.get(`button[class="swal2-confirm swal2-styled swal2-default-outline"]`).contains('Yes, delete it!').should('exist');
    cy.get(`button[class="swal2-confirm swal2-styled swal2-default-outline"]`).contains('Yes, delete it!').click();


    cy.contains(
      `h2[class="swal2-title"]`,
      "Deleted!"
    ).should("exist");

    cy.visit('/companies');
    cy.url().should("match", /\/companies$/);
  })
})