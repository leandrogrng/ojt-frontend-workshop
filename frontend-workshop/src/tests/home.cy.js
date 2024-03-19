/* eslint-disable no-undef */

import mockApi from "../utils/mockApi";
import resources from "../utils/resources.json";

describe("Home Page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Opens Home Page", () => {
        cy.contains(`p[class*="chakra-text"]`, "Hello World!").should("exist");
    });

    it("Views Reset Data Button", () => {
        cy.get(`[data-test-id="btn-reset-data"]`).should("exist");
        cy.get(`[data-test-id="btn-reset-data"]`).click();
        cy.visit("/");

        const requestData = mockApi("GET", "/resources");
        const { data } = requestData;

        expect(data).to.be.an("array");
        expect(data).to.have.length.above(0);
        const expectedData = resources[0];
        expect(data).to.deep.include(expectedData);
    });
});
