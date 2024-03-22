beforeEach(() => {
  cy.visit("/projects");
});

describe('Projects Page', () => {
  it('Opens Projects Page', () => {
    cy.contains(`h2[class*="chakra-heading"]`, "Projects").should("exist");
    cy.get(`button[data-test-id="project-reset-btn"]`).should('exist');
    cy.get(`a[data-test-id="project-add-btn"]`).should('exist');
  })

  it('Opens Projects Form', () => {
    cy.get(`a[data-test-id="project-add-btn"]`).should('exist');
    cy.get(`a[data-test-id="project-add-btn"]`).click();  
    cy.get(`form[data-test-id="project-form"]`).should("exist");
    cy.contains(`h2[class*="chakra-heading"]`, "Add Project").should("exist");
    cy.get(`button[data-test-id="project-form-cancel"]`).contains('Cancel').should('exist');
    cy.get(`button[data-test-id="project-form-submit"]`).contains('Add Project').should('exist');
  })
})

describe('Projects Form', () => {
  beforeEach(() => {
    cy.get(`a[data-test-id="project-add-btn"]`).should('exist');
    cy.get(`a[data-test-id="project-add-btn"]`).click();  
    cy.get(`form[data-test-id="project-form"]`).should("exist");
    cy.contains(`h2[class*="chakra-heading"]`, "Add Project").should("exist");
    cy.get(`button[data-test-id="project-form-cancel"]`).contains('Cancel').should('exist');
    cy.get(`button[data-test-id="project-form-submit"]`).contains('Add Project').should('exist');
    cy.get(`button[data-test-id="project-delete-btn"]`).should('not.exist');
    cy.get(`button[data-test-id = "project-update-btn"]`).should('not.exist');

  });

  context('Cancel Add Project', () => {
    it('Cancel Add Project', () => {
      cy.get(`input[name= "name"]`).type('Accur8 Enterprise');
      cy.get(`button[data-test-id="project-form-cancel"]`).click();
      cy.url().should("include", "/projects");
    })

  });

  context('Failed Add Project', () => {
    beforeEach(() => {
      cy.get('input[name="name"]').type("      ");
      cy.get('input[name="description"]').type("        ");
      cy.get('input[name="alias"]').type("project One");     
    })

    it('Invalid Project Name (User entered a white spaces)', () => {
      cy.get(`button[data-test-id="project-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid project name"
      ).should("exist");
    });

    it('Invalid Project Description (User entered white spaces)', () => {
      cy.get(`button[data-test-id="project-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Description required"
      ).should("exist");
    });

    it('Invalid Alias (User entered alias with space)', () => {
      cy.get(`button[data-test-id="project-form-submit"]`).click();
      cy.contains(
        `div[class*="chakra-form__error-message"]`,
        "Invalid alias. Should not contain any spaces."
      ).should("exist");
      });
    })

  context('Successful Add Company', () => {
    beforeEach(() => {
      cy.get('input[name="name"]').type("loanProgram");
      cy.get('input[name="description"]').type("This simplifies the process of managing loans, whether for personal or business purposes. ");
      cy.get('input[name="alias"]').type("loanProgram");     
    })

    it('Successful Validations', () => {
      cy.get(`[data-test-id="project-form-submit"]`).click();

      cy.contains(
        `h2[class="swal2-title"]`,
        "Project Added"
      ).should("exist");

      cy.visit('/projects')
      //cy.url().should("match", /\/projects$/);
    })
  })
})

describe('Update Projects Form', () => {
  beforeEach(() => {
    cy.contains("#projectName a", "People System Upgrade").click();
    cy.get(`[data-test-id="project-form-header"]`).contains('Update Project').should('exist');
    cy.get(`button[data-test-id="project-delete-btn"]`).should('exist');
  })

  it('Open Form with Existing Data', () => {
    cy.get('input[name="name"]').should('have.attr', 'readonly');
    cy.get('input[name="description"]').should('have.attr', 'readonly');
    cy.get('input[name="alias"]').should('have.attr', 'readonly'); 

    cy.get(`button[data-test-id="project-update-btn"]`).should("exist");
    cy.get(`button[data-test-id="project-form-cancel"]`).should("not.exist");
    cy.get(`button[data-test-id="project-form-submit"]`).should("not.exist");
  })


  it('Update Information', () => {
    cy.get(`button[data-test-id="project-update-btn"]`).click();
    cy.get(`button[data-test-id="project-update-btn"]`).should("not.exist");
    cy.get(`button[data-test-id="project-form-cancel"]`).should("exist");
    cy.get(`button[data-test-id="project-form-submit"]`).should("exist");

    cy.get('input[name="name"]').should('not.have.attr', 'readonly');
    cy.get('input[name="description"]').should('not.have.attr', 'readonly');
    cy.get('input[name="alias"]').should('not.have.attr', 'readonly');

    cy.get('input[name="name"]').clear();
    cy.get('input[name="alias"]').clear();

    cy.get('input[name="name"]').type("Scatter App");
    cy.get('input[name="alias"]').type("scatterApplication");  

    cy.get(`button[data-test-id="project-form-submit"]`).click();

    cy.contains(
      `h2[class="swal2-title"]`,
      "Project Updated"
    ).should("exist");

    cy.visit('/projects');
    cy.url().should("match", /\/projects$/);
  })
})

describe('Delete Project', () => {
  beforeEach(() => {

    cy.contains("#projectName a", "People System Upgrade").click();

    cy.get(`[data-test-id="project-form-header"]`).contains('Update Project').should('exist');
    cy.get(`[data-test-id="project-form-header"]`).contains('Add Project').should('not.exist');
    cy.get(`button[data-test-id="project-delete-btn"]`).should("exist");
  });
  
  it('Cancel delete a project', () => {
    cy.get(`button[data-test-id="project-delete-btn"]`).click();

    cy.contains(
      `h2[class="swal2-title"]`,
      "Are you sure?"
    ).should("exist");

    cy.get(`button[class="swal2-cancel swal2-styled swal2-default-outline"]`).contains('Cancel').should('exist');
    cy.get(`button[class="swal2-cancel swal2-styled swal2-default-outline"]`).contains('Cancel').click();

    cy.url().should("include", "/projects");

  })


  it('Delete a project', () => {
    cy.get(`button[data-test-id="project-delete-btn"]`).click();

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

    cy.visit('/projects');
    cy.url().should("match", /\/projects$/);

  })
  
  


})