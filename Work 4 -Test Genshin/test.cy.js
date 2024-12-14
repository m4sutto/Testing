/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080)
    cy.visit('https://genshin.gg/')
  })

  let rarity4count = 42
  let rarity5count = 53

  it('sort by stars', () => {
    cy.get('.filters-item').eq(0).click()
    cy.get('.rarity-4')
      .its('length')
      .then((actualCount) => {
        expect(actualCount).to.equal(rarity4count);
      })
    cy.get('.filters-item').eq(0).click()

    cy.get('.filters-item').eq(1).click()
    cy.get('.rarity-5')
      .its('length')
      .then((actualCount) => {
        expect(actualCount).to.equal(rarity5count);
      })
    cy.get('.filters-item').eq(1).click()
  })

  it('sort by element', () => {
    const elements = [
      { index: 2, expectedValue: 'Anemo' },
      { index: 3, expectedValue: 'Cryo' },
      { index: 4, expectedValue: 'Electro' },
      { index: 5, expectedValue: 'Dendro' },
      { index: 6, expectedValue: 'Geo' },
      { index: 7, expectedValue: 'Hydro' },
      { index: 8, expectedValue: 'Pyro' },
    ];
  
    elements.forEach(({ index, expectedValue }) => {
      cy.get('.filters-item').eq(index).click();
      cy.get('.character-type[alt]')
        .invoke('attr', 'alt')
        .then((altValue) => {
          expect(altValue).to.equal(expectedValue);
        });
    });
  });

  it('searching', () => {
    const characters_name = ['Chasca', 'Albedo', 'Alhaitham', 'Aloy', 'Arlecchino', 'Ayaka', 'Ayato', 'Baizhu', 'Childe', 'Chiori', 'Clorinde', 'Cyno', 'Dehya', 'Diluc', 'Emilie', 'Eula', 'Furina', 'Ganyu', 'Hu Tao', 'Itto', 'Jean', 'Kazuha', 'Keqing', 'Kinich', 'Klee', 'Kokomi', 'Lyney', 'Mona', 'Mualani', 'Nahida', 'Navia', 'Neuvillette', 'Nilou', 'Qiqi', 'Raiden', 'Shenhe', 'Sigewinne', 'Tighnari', 'Traveler (Anemo)', 'Traveler (Dendro)', 'Traveler (Electro)', 'Traveler (Geo)', 'Traveler (Hydro)', 'Venti', 'Wanderer', 'Wriothesley', 'Xianyun', 'Xiao', 'Xilonen', 'Yae Miko', 'Yelan', 'Yoimiya', 'Zhongli'];

    characters_name.forEach(character => {
        cy.get('.search-input').type(character);
        cy.get('.character-name').should('have.text', character);
        cy.get('.search-input').clear();
    });
});

})