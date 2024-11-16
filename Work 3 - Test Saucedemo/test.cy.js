/// <reference types="cypress" />

describe('test', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')

    let username = 'standard_user'
    let password = 'secret_sauce'

    cy.get('[data-test="username"]').type(`${username}`)
    cy.get('[data-test="password"]').type(`${password}`)
    cy.get('[data-test="login-button"]').click()
  })

  it('sort (low to high)', () => {
    cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

    let price_previous = 0

    cy.get('[data-test="inventory-item-price"]')
      .each(($el) => {
        let price_text = $el.text();
        let price_value = parseFloat(price_text.replace('$', ''));
        expect(price_value).to.be.gte(price_previous);
        price_previous = price_value;
      })
  })

  it('sort (high to low)', () => {
    cy.get('[data-test="product-sort-container"]').select('Price (high to low)')

    let price_previous = Infinity

    cy.get('[data-test="inventory-item-price"]')
      .each(($el) => {
        let price_text = $el.text();
        let price_value = parseFloat(price_text.replace('$', ''));
        expect(price_value).to.be.lte(price_previous);
        price_previous = price_value;
      })
  })

  it('add to cart', () => {
    let firstname = 'standard'
    let lastname = 'user'
    let postal_code = '753485'

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
    
    cy.get('[data-test="firstName"]').type(`${firstname}`)
    cy.get('[data-test="lastName"]').type(`${lastname}`)
    cy.get('[data-test="postalCode"]').type(`${postal_code}`)
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="finish"]').click()
  })
})