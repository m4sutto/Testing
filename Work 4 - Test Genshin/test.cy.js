/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://genshin.gg/builds/')
  })

  it.skip('1', () => {
    let build_weapon

    cy.get('.build-weapon-name').eq(0)
    .invoke('text')
    .then((text) => {
      build_weapon = text
      // cy.log(build_weapon)
    })

    cy.get('.build-character').eq(0).click()
    
    cy.get('.character-build-weapon-name').eq(0)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.include(build_weapon)
    })
  })

  it.skip('2', () => {
    let build_artifact

    cy.get('.build-weapon-name').eq(1)
    .invoke('text')
    .then((text) => {
      build_artifact = text
      // cy.log(build_artifact)
    })

    cy.get('.build-character').eq(0).click()
    
    cy.get('.character-build-weapon-name').eq(5)
    .invoke('text')
    .then((text) => {
      expect(text.trim()).to.include(build_artifact)
    })
  })

  it('3', () => {
    const statsOnePage = []
    const statsTwoPage = []

    for (let i = 0; i < 2; i++) {
      cy.get('.build-stats-item').eq(i)
      .invoke('text')
      .then((text) => {
          statsOnePage[i] = text
      })
    }

    cy.get('.build-character').eq(0).click()

    for (let i = 0; i < 2; i++) {
      cy.get('.character-stats-item').eq(i)
      .invoke('text')
      .then((text) => {
          statsTwoPage[i] = text
      })
    }

    // cy.log(statsOnePage)
    // cy.log(statsTwoPage)

    expect(statsOnePage).to.deep.equal(statsTwoPage)
  })
})