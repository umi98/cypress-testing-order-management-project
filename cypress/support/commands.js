import { SELECTORS, ADD_PRODUCT_SELECTOR } from "../support/constant";

const TALENT_URL = `${SELECTORS.DASHBOARD_URL}/talent`;

Cypress.Commands.add('accessIframe', (iframeSelector) => {
  cy.get(iframeSelector).should('be.visible');
  cy.get(iframeSelector).its('0.contentDocument.body').then(cy.wrap);
});

Cypress.Commands.add('login', () => {
  cy.session('userSession', () => {
    cy.visit(SELECTORS.DASHBOARD_URL);
    cy.wait(10000);
    cy.fixture('loginData').then((data) => {
      cy.accessIframe(SELECTORS.IFRAME_SELECTOR).within(() => {
        cy.get(SELECTORS.USERNAME_SELECTOR).type(Cypress.env("EMAIL"));
        cy.get(SELECTORS.PASSWORD_SELECTOR).type(`${Cypress.env("PASSWORD")}{enter}`);
      });
    });
    cy.wait(20000); // Bisa ditambah atau dikurangi, menyesuaikan respon server
    cy.url({ timeout: 20000 }).then((currentUrl) => {
      if (currentUrl.includes('/talent')) {
        cy.url().should('eq', TALENT_URL);
      } else if (currentUrl === SELECTORS.DASHBOARD_URL || currentUrl === `${SELECTORS.DASHBOARD_URL}/`) {
        cy.get('h1').should('contain.text', 'Dashboard');
      } else {
      	throw new Error(`Unexpected URL after login: ${currentUrl}`);
      }
    })
  })
})

Cypress.Commands.add('addVariation', (index, variation) => {
	// re-query dom after rerender
	let counter = 0;
	cy.contains('button', 'Hapus Varian')
		.should('be.visible');
	cy.get(ADD_PRODUCT_SELECTOR.variation.choiceInput).eq(index++).type(variation.nama);
	variation.pilihan.forEach((choice) => {
		counter++;
		cy.get(ADD_PRODUCT_SELECTOR.variation.choiceInput).eq(index++).type(choice);
		if (counter <= variation.pilihan.length) {
			cy.contains('button', 'Tambah Pilihan').click();
		}
	})
	if (index < variation.length) cy.contains('button', 'Tambahkan Tipe Varian').should('exist').click();
})

Cypress.Commands.add('fillCombinationRows', (prices, stocks) => {
	cy.get(ADD_PRODUCT_SELECTOR.combination.tableRow).each(($row, index) => {
    cy.wrap($row).find(ADD_PRODUCT_SELECTOR.combination.priceInput).clear().type(prices[index]);
    cy.wrap($row).find(ADD_PRODUCT_SELECTOR.combination.stockInput).clear().type(stock[index]);
  })
})