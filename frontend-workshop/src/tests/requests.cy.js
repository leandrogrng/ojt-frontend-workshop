beforeEach(() => {
  cy.visit("/requests");
});

describe('Requests Page', () => {
  it('Opens Requests Page', () => {
    cy.contains(`h2[class*="chakra-heading"]`, "Requests").should("exist");
    cy.get(`button[data-test-id="request-reset-btn"]`).should('exist');
    cy.get(`a[data-test-id="request-add-btn"]`).should('exist');
    cy.get(`button[data-test-id="request-update-btn"]`).should('not.exist');
  })

  it('Opens Request Form', () => {
    cy.get(`a[data-test-id="request-add-btn"]`).click();

    cy.contains(`h2[class*="chakra-heading"]`, "Add Request").should("exist");
    cy.get(`form[data-test-id = "request-form"]`).should('exist');

    cy.get(`button[data-test-id="request-form-cancel"]`).should('exist');
    cy.get(`button[data-test-id="request-form-submit"]`).should('exist');

    cy.get(`button[data-test-id="request-delete-btn"]`).should('not.exist');
    cy.get(`button[data-test-id="request-update-btn"]`).should('not.exist');
    
    cy.get('select[name="client"]').should('not.have.attr', 'readonly');
    cy.get('select[name="project"]').should('not.have.attr', 'readonly');
    cy.get('input[name="requestSubject"]').should('not.have.attr', 'readonly');
    cy.get('textarea[name="requestDescription"]').should('not.have.attr', 'readonly');
  });
})

describe('Request Form', () => {
  beforeEach(() => {
    cy.contains(`h2[class*="chakra-heading"]`, "Requests").should("exist");
    cy.get(`button[data-test-id="request-reset-btn"]`).should('exist');
    cy.get(`a[data-test-id="request-add-btn"]`).should('exist');

    cy.get(`a[data-test-id="request-add-btn"]`).click();
    cy.contains(`h2[class*="chakra-heading"]`, "Add Request").should("exist");
    cy.get(`button[data-test-id="request-form-cancel"]`).should('exist');
    cy.get(`button[data-test-id="request-form-submit"]`).should('exist');
    
    cy.get(`button[data-test-id="request-update-btn"]`).should('not.exist');
  });

  context('Cancel Add Request', () => {
    it('Cancel Add Project', () => {
      cy.get('select[name="client"]').select('BioHarvest Farms');
      cy.get('input[name="requestSubject"]').type('Debug Page');
      
      cy.get(`button[data-test-id="request-form-cancel"]`).click();
      cy.url().should("include", "/requests");
    });

  });
  context('Failed Add Request', () => {
    beforeEach(() => {
      cy.get('select[name="client"]').select("TechByte Innovations");
      cy.get('select[name="project"]').select("Books Integration");
      cy.get('input[name="requestSubject"]').type("         ");
      cy.get('textarea[name="requestDescription"]').type("     ");
    });

    it('Invalid subject', () => {
      cy.get(`button[data-test-id="request-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid subject"
      ).should("exist");
    });

    it('Invalid description', () => {
      cy.get(`button[data-test-id="request-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid description"
      ).should("exist");
    });
  });
  
  context('Successful Add Request', () => {
    beforeEach(() => {
      cy.get('select[name="client"]').select("BioHarvest Farms");
      cy.get('select[name="project"]').select("Books Integration");
      cy.get('input[name="requestSubject"]').type("Debug Adding Form");
      cy.get('textarea[name="requestDescription"]').type("Test description");  
    });
    
    it('Successful Validations', () => {
      cy.get(`button[data-test-id="request-form-submit"]`).click();
      cy.contains(
        `h2[class="swal2-title"]`,
        "Request Added"
      ).should("exist");

      cy.visit('/requests')
      cy.url().should("match", /\/requests$/);     
    });
  })
})

describe('Update Request Form', () => {
  beforeEach(() => {
    cy.get(`a[data-test-id="request-add-btn"]`).should('exist');
    cy.get(`a[data-test-id="request-add-btn"]`).click();

    cy.get('select[name="client"]').select("BioHarvest Farms");
    cy.get('select[name="project"]').select("Books Integration");
    cy.get('input[name="requestSubject"]').type("Debug Adding Form");
    cy.get('textarea[name="requestDescription"]').type("Test description");  
    cy.get(`button[data-test-id="request-form-submit"]`).click();
    cy.contains(
      `h2[class="swal2-title"]`,
      "Request Added"
    ).should("exist");
    
    cy.visit('/requests');
    cy.url().should("match", /\/requests$/);  
  });
  
  beforeEach(() => {
    cy.contains("#requestName a", "Debug Adding Form").click();
    cy.get(`[data-test-id="request-form-header"]`).contains('Update Request').should('exist');
    cy.get(`button[data-test-id="request-delete-btn"]`).should('exist');
  });

  it('Open Form with Existing Data', () => {
    cy.get('select[name="client"]').should('have.attr', 'readonly');
    cy.get('select[name="project"]').should('have.attr', 'readonly');
    cy.get('input[name="requestSubject"]').should('have.attr', 'readonly');
    cy.get('textarea[name="requestDescription"]').should('have.attr', 'readonly');

    cy.get(`button[data-test-id="request-update-btn"]`).should('exist');
  })

  it('Update Information', () => {
    cy.get(`button[data-test-id="request-update-btn"]`).click();
    cy.get(`button[data-test-id="request-update-btn"]`).should('not.exist');

    cy.get(`button[data-test-id="request-form-cancel"]`).should('exist');
    cy.get(`button[data-test-id="request-form-submit"]`).should('exist');

    cy.get('select[name="client"]').should('not.have.attr', 'readonly');
    cy.get('select[name="project"]').should('not.have.attr', 'readonly');
    cy.get('input[name="requestSubject"]').should('not.have.attr', 'readonly');
    cy.get('textarea[name="requestDescription"]').should('not.have.attr', 'readonly');

    cy.get('input[name="requestSubject"]').clear();
    cy.get('textarea[name="requestDescription"]').clear();
    cy.get('input[name="requestSubject"]').type("Test Subject Version 1");
    cy.get('textarea[name="requestDescription"]').type("Test description of the subject");  

    cy.get(`button[data-test-id="request-form-submit"]`).click();

    cy.contains(
      `h2[class="swal2-title"]`,
      "Request Updated"
    ).should("exist");

    cy.visit('/requests');
    cy.url().should("match", /\/requests$/);
  }); 
});

describe('Delete Request', () => {
  beforeEach(() => {

    cy.get(`a[data-test-id="request-add-btn"]`).should('exist');
    cy.get(`a[data-test-id="request-add-btn"]`).click();

    cy.get('select[name="client"]').select("BioHarvest Farms");
    cy.get('select[name="project"]').select("Books Integration");
    cy.get('input[name="requestSubject"]').type("Debug Adding Form");
    cy.get('textarea[name="requestDescription"]').type("Test description");  
    cy.get(`button[data-test-id="request-form-submit"]`).click();
    cy.contains(
      `h2[class="swal2-title"]`,
      "Request Added"
    ).should("exist");
    
    cy.visit('/requests');
    cy.url().should("match", /\/requests$/);  
  });

  beforeEach(() => {
    cy.contains("#requestName a", "Debug Adding Form").click();

    cy.get('select[name="client"]').should('have.attr', 'readonly');
    cy.get('select[name="project"]').should('have.attr', 'readonly');
    cy.get('input[name="requestSubject"]').should('have.attr', 'readonly');
    cy.get('textarea[name="requestDescription"]').should('have.attr', 'readonly');

    cy.get(`button[data-test-id="request-update-btn"]`).should('exist');
    cy.get(`button[data-test-id="request-delete-btn"]`).should('exist');
    cy.get(`button[data-test-id="request-delete-btn"]`).click();
    
  });

  it('Cancel delete a request', () => {
    cy.contains(
      `h2[class="swal2-title"]`,
      "Are you sure?"
    ).should("exist");

    cy.get(`button[class="swal2-cancel swal2-styled swal2-default-outline"]`).contains('Cancel').should('exist');
    cy.get(`button[class="swal2-cancel swal2-styled swal2-default-outline"]`).contains('Cancel').click();

    cy.url().should("include", "/requests");
  })

  it('Delete a resource', () => {
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

    cy.visit('/requests');
    cy.url().should("match", /\/requests$/);
  });


  
  
})