/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Backend API', () => {
  it('verify request returns JSON', () => {
    cy.request('http://localhost:3000/users')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
  })

  it('verify the request returns the correct status code', () => {
    cy.request('http://localhost:3000/users')
      .its('status')
      .should('be.equal', 200)
  })

  it('verify the request returns 50 items', () => {
    cy.request('http://localhost:3000/users')
      .its('body')
      .should('have.length', 0)
  })
})
