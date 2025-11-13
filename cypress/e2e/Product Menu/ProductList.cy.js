import { SELECTORS } from "../../support/constant";

const TAB_SELECTOR = 'ul.nav-tabs';

describe('Verifikasi Tampilan Daftar Produk', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login();
    cy.visit(`${SELECTORS.DASHBOARD_URL}/produk?tab=semua`);
  });

  it('Verify that Data Produk have two tabs and they\'re functional', () => {
    cy.get(TAB_SELECTOR).should('be.visible').within(() => {
      cy.get('li.nav-item').should('have.length', 2);
      cy.get('li.nav-item').eq(0).should('contain','Semua');
      cy.get('li.nav-item').eq(0).click().then(() => {
        cy.url().should('include', 'tab=semua');
      });
      cy.get('li.nav-item').eq(1).should('contain','Draft');
      cy.get('li.nav-item').eq(1).click().then(() => {
        cy.url().should('include', 'tab=draft');
      });
    });
  });

  it.only('Verify search box is functionable in Semua tab', () => {
    const keyword = 'roti pukis';
    cy.get('input[placeholder="Example"]', {timeout:10000}).eq(0).should('be.visible').type(keyword);
    cy.wait(5000);
    cy.contains('tr', new RegExp(keyword, 'i')).should('exist');
  })
})