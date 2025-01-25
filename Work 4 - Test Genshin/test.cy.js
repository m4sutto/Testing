/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://genshin.gg/')
  })

  it('checking the rarity sorting', () => {
    let rarity4count = 42
    let rarity5count = 55

    cy.get('.filters-item').eq(0).click()
    cy.get('.rarity-4')
      .its('length')
      .then((actualCount) => {
        expect(actualCount).to.equal(rarity4count)
      })
    cy.get('.filters-item').eq(0).click()

    cy.get('.filters-item').eq(1).click()
    cy.get('.rarity-5')
      .its('length')
      .then((actualCount) => {
        expect(actualCount).to.equal(rarity5count)
      })
    cy.get('.filters-item').eq(1).click()
  })

  it('checking the sorting by element', () => {
    const elements = [
      { index: 2, expectedValue: 'Anemo' },
      { index: 3, expectedValue: 'Cryo' },
      { index: 4, expectedValue: 'Electro' },
      { index: 5, expectedValue: 'Dendro' },
      { index: 6, expectedValue: 'Geo' },
      { index: 7, expectedValue: 'Hydro' },
      { index: 8, expectedValue: 'Pyro' },
    ]
  
    elements.forEach(({ index, expectedValue }) => {
      cy.get('.filters-item').eq(index).click();
      cy.get('.character-type[alt]')
        .invoke('attr', 'alt')
        .then((altValue) => {
          expect(altValue).to.equal(expectedValue)
        })
    })
  })

  it('checking the alphabetical search', () => {
    const searchAndCheck = (searchTerm, expectedCount) => {
        cy.get('.search-input').type(searchTerm)
        cy.get('.character-name')
          .filter(':visible')
          .should('have.length', expectedCount)
        cy.get('.search-input').clear()
    };

    searchAndCheck('a', 58)
    searchAndCheck('b', 7)
    searchAndCheck('c', 18)
    searchAndCheck('d', 14)
    searchAndCheck('e', 42)
    searchAndCheck('f', 5)
    searchAndCheck('g', 12)
    searchAndCheck('h', 26)
    searchAndCheck('i', 52)
    searchAndCheck('j', 2)
    searchAndCheck('k', 14)
    searchAndCheck('l', 32)
    searchAndCheck('m', 14)
    searchAndCheck('n', 45)
    searchAndCheck('o', 40)
    searchAndCheck('q', 3)
    searchAndCheck('r', 27)
    searchAndCheck('s', 13)
    searchAndCheck('t', 20)
    searchAndCheck('u', 24)
    searchAndCheck('v', 11)
    searchAndCheck('w', 3)
    searchAndCheck('x', 6)
    searchAndCheck('y', 22)
    searchAndCheck('z', 6)
  });

  it('checking whether the page of an individual character is opened correctly', () => {
    let build_name

    cy.get('.nav-link').eq(1).click()
    cy.get('.build-name').eq(0)
      .invoke('text')
      .then((text) => {
        build_name = text
      })
    cy.get('.character-portrait').eq(0).click()
    cy.get('.character-name')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.include(build_name)
      })
  })

  it('verifying the correctness of an open character element', () => {
    let character_type

    cy.get('.nav-link').eq(1).click()
    cy.get('.character-type').eq(0)
      .invoke('attr', 'alt')
      .then((alt) => {
        character_type = alt
      })
    cy.get('.character-portrait').eq(0).click()
    cy.get('.character-element')
      .invoke('attr', 'alt')
      .then((alt) => {
        expect(alt.trim()).to.equal(character_type)
      })
  })
})
