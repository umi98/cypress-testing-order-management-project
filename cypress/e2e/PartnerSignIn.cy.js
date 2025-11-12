/* REFACTORED CODE */
import { SELECTORS } from "../support/constant";

const TALENT_URL = `${SELECTORS.DASHBOARD_URL}/talent`;

describe('Partner Login', () => {

  beforeEach(() => {
    cy.visit(SELECTORS.DASHBOARD_URL);
  })

  it('sign in with valid format and credentials', () => {
    // Ada kemungkinan case ini gagal jika respon UI dan server lambat
    cy.fixture('loginData').then((data) => {
      cy.accessIframe(SELECTORS.IFRAME_SELECTOR).within(() => {
        cy.get(SELECTORS.USERNAME_SELECTOR).type(Cypress.env("EMAIL"));
        cy.get(SELECTORS.PASSWORD_SELECTOR).type(`${Cypress.env("PASSWORD")}{enter}`);
        // cy.wait(5000);
        // cy.get(SELECTORS.LOGIN_SUBMIT_BUTTON_SELECTOR).click();
      });
    });
    cy.wait(25000); // Bisa ditambah atau dikurangi, menyesuaikan respon server
    cy.url({ timeout: 20000 }).then((currentUrl) => {
      if (currentUrl.includes('/talent')) {
        cy.url().should('eq', TALENT_URL);
      } else if (currentUrl === SELECTORS.DASHBOARD_URL || currentUrl === `${SELECTORS.DASHBOARD_URL}/`) {
        cy.get('h1').should('contain.text', 'Dashboard');
      } else {
        throw new Error(`Unexpected URL after login: ${currentUrl}`);
      }
    })
  });

  it('sign in with wrong and credentials', () => {
    cy.fixture('loginData').then((data) => {
      cy.accessIframe(SELECTORS.IFRAME_SELECTOR).within(() => {
        cy.get(SELECTORS.USERNAME_SELECTOR).type(data.invalidUser.email);
        cy.get(SELECTORS.PASSWORD_SELECTOR).type(data.invalidUser.password);
        cy.get(SELECTORS.LOGIN_SUBMIT_BUTTON_SELECTOR).click();
        cy.wait(5000);
        cy.get(SELECTORS.LOGIN_MODAL_CONTENT_SELECTOR).should('be.visible').contains('Gagal Login');
      });
    });
  });

  it('sign in with wrong email format', () => {
    cy.fixture('loginData').then((data) => {
      cy.accessIframe(SELECTORS.IFRAME_SELECTOR).within(() => {
        cy.get(SELECTORS.USERNAME_SELECTOR).type(data.invalidEmailFormat);
        cy.wait(1000);
        cy.get(SELECTORS.LOGIN_ERROR_EXPLAIN_SELECTOR).should('contain.text', 'Email tidak valid');
      });
    });
  });

  it('sign in with unregistered email', () => {
    cy.fixture('loginData').then((data) => {
      cy.accessIframe(SELECTORS.IFRAME_SELECTOR).within(() => {
        cy.get(SELECTORS.USERNAME_SELECTOR).type(data.unregisteredEmail);
        cy.wait(1000);
        cy.get(SELECTORS.LOGIN_ERROR_EXPLAIN_SELECTOR).should('contain.text', 'Email belum terdaftar');
      });
    });
  })
  
  it('email is empty', () => {
    cy.fixture('loginData').then((data) => {
      cy.accessIframe(SELECTORS.IFRAME_SELECTOR).within(() => {
        cy.get(SELECTORS.PASSWORD_SELECTOR).type(Cypress.env("PASSWORD"));
        cy.get(SELECTORS.LOGIN_SUBMIT_BUTTON_SELECTOR).click();
        cy.wait(1000);
        cy.get(SELECTORS.LOGIN_ERROR_EXPLAIN_SELECTOR).should('contain.text', 'Email tidak boleh kosong');
      });
    });
  });

  it('password is empty', () => {
    cy.fixture('loginData').then((data) => {
      cy.accessIframe(SELECTORS.IFRAME_SELECTOR).within(() => {
        cy.get(SELECTORS.USERNAME_SELECTOR).type(Cypress.env("EMAIL"));
        cy.get(SELECTORS.LOGIN_SUBMIT_BUTTON_SELECTOR).click();
        cy.wait(1000);
        cy.get(SELECTORS.LOGIN_ERROR_EXPLAIN_SELECTOR).should('contain.text', 'Password tidak boleh kosong');
      });
    });
  });
});
