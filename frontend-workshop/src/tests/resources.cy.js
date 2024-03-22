
beforeEach(() => {
  cy.visit("/resources");
});

describe("Resources Page", () => {
  it("Opens Resources Page", () => {
    cy.contains(`h2[class*="chakra-heading"]`, "Resources").should("exist");
    cy.get(`[data-test-id="reset-resource-btn"]`).should("exist");
    cy.get(`[data-test-id="add-resource-btn"]`).should("exist");
  });

  it("Opens Resources Form", () => {
    cy.get(`a[data-test-id="add-resource-btn"]`).should("exist");
    cy.get(`a[data-test-id="add-resource-btn"]`).click();
    cy.get(`form[data-test-id="resource-form"]`).should('exist');
    cy.get(`[data-test-id="resource-form-header"]`).contains('Add Resource').should('exist');
    cy.get(`button[data-test-id="resource-form-cancel"]`).should("exist");
    cy.get(`button[data-test-id="resource-form-submit"]`).should("exist");
  });
});

describe('Resources Form', () => {
  beforeEach(() => {
    cy.get(`a[data-test-id="add-resource-btn"]`).should("exist");
    cy.get(`a[data-test-id="add-resource-btn"]`).click();
    cy.get(`form[data-test-id="resource-form"]`).should("exist");
    cy.get(`button[data-test-id="resource-form-cancel"]`).should("exist");
    cy.get(`button[data-test-id="resource-form-submit"]`).should("exist");
    cy.get(`button[data-test-id="resource-delete-btn"]`).should("not.exist");
  });

  context("Cancel Add Resource", () => {
    it("Cancel Add Resource", () => {
      cy.get('input[name="firstName"]').type("Jihyo");
      cy.wait(100);
      cy.get(`button[data-test-id="resource-form-cancel"]`).click();
      cy.url().should("include", "/resources");
    });
  });

  context('Failed Add Resource', () => {
    beforeEach(() => {
      cy.get('input[name="firstName"]').type("J");
      cy.get('input[name="lastName"]').type("Y#o");
      cy.get('input[name="type"]').type("Vocals");

      cy.get('input[name="firstName"]').should('not.have.attr', 'readonly');
      cy.get('input[name="middleName"]').should('not.have.attr', 'readonly');
      cy.get('input[name="lastName"]').should('not.have.attr', 'readonly');
      cy.get('input[name="type"]').should('not.have.attr', 'readonly');
    });

    it("Fail Type Validation", () => {
      cy.get(`button[data-test-id="resource-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Please enter a valid resource type (PM, QA, or DEV)"
      ).should("exist");
    });
    
    it("Invalid length", () => {
      cy.get(`button[data-test-id="resource-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid name length"
      ).should("exist");
    });

    it("Invalid characters", () => {
      cy.get(`button[data-test-id="resource-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid characters"
      ).should("exist");
    });
  })
  
  context('Successful Add Resource', () => {
    beforeEach(() => {
      cy.get('input[name="firstName"]').type("Jeongyeon");
      cy.get('input[name="lastName"]').type("Yoo");
      cy.get('input[name="type"]').type("QA");
    })

    it('Successful Validations', () => {
      cy.get(`[data-test-id="resource-form-submit"]`).click();

      cy.contains(
        `h2[class="swal2-title"]`,
        "Resource Added"
      ).should("exist");

      //cy.visit('/resources')
      cy.url().should("match", /\/resources$/);
    })
  })
})

describe("Updating Resource Page", () => {
  beforeEach(() => {
    cy.visit(`/resources`);
    cy.get('.row:eq(0)').click();
    cy.get(`[data-test-id="resource-form-header"]`).contains('Update Resource').should('exist');
    cy.get(`button[data-test-id="resource-delete-btn"]`).should("exist");
  })

  it('Open Form with Exisiting Data', () => {
    cy.get('input[name="firstName"]').should('have.attr', 'readonly');
    cy.get('input[name="middleName"]').should('have.attr', 'readonly');
    cy.get('input[name="lastName"]').should('have.attr', 'readonly');
    cy.get('input[name="type"]').should('have.attr', 'readonly');

    cy.get(`button[data-test-id="resource-update-btn"]`).should("exist");
    cy.get(`button[data-test-id="resource-form-submit"]`).should("not.exist");
    cy.get(`button[data-test-id="resource-form-cancel"]`).should("not.exist");
  })

  it('Update Information', () => {    
    cy.get(`button[data-test-id="resource-update-btn"]`).click();
    cy.get(`button[data-test-id="resource-form-submit"]`).should("exist");
    cy.get(`button[data-test-id="resource-form-cancel"]`).should("exist");

    cy.get('input[name="firstName"]').should('not.have.attr', 'readonly');
    cy.get('input[name="middleName"]').should('not.have.attr', 'readonly');
    cy.get('input[name="lastName"]').should('not.have.attr', 'readonly');
    cy.get('input[name="type"]').should('not.have.attr', 'readonly');
    
    cy.get('input[name="firstName"]').clear();
    cy.get('input[name="middleName"]').clear();
    cy.get('input[name="lastName"]').clear();
    
    cy.get('input[name="firstName"]').type("Jaira");
    cy.get('input[name="lastName"]').type("Leen");
    
    cy.get(`button[data-test-id="resource-form-submit"]`).click();

    cy.contains(
      `h2[class="swal2-title"]`,
      "Resource Updated"
    ).should("exist");

    cy.visit('/resources')
    cy.url().should("match", /\/resources$/);
  })
});

describe('Delete Resource', () => {
  beforeEach(() => {
    cy.get('.row:eq(9)').click();
    cy.get(`[data-test-id="resource-form-header"]`).contains('Update Resource').should('exist');
    cy.get(`[data-test-id="resource-form-header"]`).contains('Add Resource').should('not.exist');
    cy.get(`button[data-test-id="resource-delete-btn"]`).should("exist");
  
    cy.get(`button[data-test-id="resource-update-btn"]`).should("exist");
    cy.get(`button[data-test-id="resource-form-submit"]`).should("not.exist");
    cy.get(`button[data-test-id="resource-form-cancel"]`).should("not.exist");
  });
  
  it('Cancel delete a resource', () => {
    cy.get(`button[data-test-id="resource-delete-btn"]`).click();

    cy.contains(
      `h2[class="swal2-title"]`,
      "Are you sure?"
    ).should("exist");

    cy.get(`button[class="swal2-cancel swal2-styled swal2-default-outline"]`).contains('Cancel').should('exist');
    cy.get(`button[class="swal2-cancel swal2-styled swal2-default-outline"]`).contains('Cancel').click();

    cy.url().should("include", "/resources");
  });
  it('Delete a resource', () => {
    cy.get(`button[data-test-id="resource-delete-btn"]`).click();

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

    cy.visit('/resources');
    cy.url().should("match", /\/resources$/);
  });
})