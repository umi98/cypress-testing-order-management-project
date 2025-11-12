import { SELECTORS } from "../support/constant";

const TALENT_URL = `${SELECTORS.DASHBOARD_URL}/talent`;

Cypress.Commands.add('accessIframe', (iframeSelector) => {
    cy.get(iframeSelector).should('be.visible');
    cy.get(iframeSelector).its('0.contentDocument.body').then(cy.wrap);
});

Cypress.Commands.add('login', () => {
    cy.session('userSession', () => {
        cy.visit(SELECTORS.DASHBOARD_URL);
        cy.fixture('loginData').then((data) => {
            cy.accessIframe(SELECTORS.IFRAME_SELECTOR).within(() => {
                cy.get(SELECTORS.USERNAME_SELECTOR).type(Cypress.env("EMAIL"));
                cy.get(SELECTORS.PASSWORD_SELECTOR).type(`${Cypress.env("PASSWORD")}{enter}`);
            });
        });
        cy.wait(20000); // Bisa ditambah atau dikurangi, menyesuaikan respon server
        cy.url().then((currentUrl) => {
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