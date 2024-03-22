import mockApi from "../utils/mockApi";
import resources from "../utils/resources.json";
import companies from "../utils/companies.json";
import projects from "../utils/projects.json";
import requests from "../utils/requests.json";

describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Opens Home Page", () => {
    cy.contains('h1', "HELLO WORLD!").should("exist");
    cy.get(`[data-test-id = 'btn-reset-home']`).should('exist');
  });

  it("Reset Resource Data", () => {
    cy.get(`[data-test-id = 'btn-reset-home']`).should('exist');
    cy.get(`[data-test-id = 'btn-reset-home']`).click();
    cy.visit("/");

    const requestData = mockApi("GET", "/resources");
    const { data } = requestData;

    expect(data).to.be.an("array");
    expect(data).to.have.length.above(0);
    const expectedData = resources[0];
    expect(data).to.deep.include(expectedData);
  });

  it("Reset Company Data", () => {
    cy.get(`[data-test-id = 'btn-reset-home']`).should('exist');
    cy.get(`[data-test-id = 'btn-reset-home']`).click();
    cy.visit("/");

    const requestData = mockApi("GET", "/companies");
    const { data } = requestData;

    expect(data).to.be.an("array");
    expect(data).to.have.length.above(0);
    const expectedData = companies[0];
    expect(data).to.deep.include(expectedData);
  });

  it("Reset Project Data", () => {
    cy.get(`[data-test-id = 'btn-reset-home']`).should('exist');
    cy.get(`[data-test-id = 'btn-reset-home']`).click();
    cy.visit("/");

    const requestData = mockApi("GET", "/projects");
    const { data } = requestData;

    expect(data).to.be.an("array");
    expect(data).to.have.length.above(0);
    const expectedData = projects[0];
    expect(data).to.deep.include(expectedData);
  });

  it("Reset Project Data", () => {
    cy.get(`[data-test-id = 'btn-reset-home']`).should('exist');
    cy.get(`[data-test-id = 'btn-reset-home']`).click();
    cy.visit("/");

    const requestData = mockApi("GET", "/requests");
    const { data } = requestData;

    expect(data).to.be.an("array");
    expect(data).to.have.lengthOf(0);

    if (data.length > 0) {
      const expectedData = requests[0];
      expect(data).to.deep.include(expectedData);
    }

  });
});
