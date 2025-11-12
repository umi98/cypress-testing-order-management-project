describe('template spec', () => {

  beforeEach(() => {
    cy.visit('https://dev.partner.komerce.my.id')
  })

  it('sign in with valid format and credentials', () => {
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').should('be.visible');
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').its('0.contentDocument.body').then(cy.wrap).within(() => {
      cy.get('#username_email').type('explore_app@yopmail.com');
      cy.get('#password').type('12345678Aa.');
      cy.get('button[type="submit"]').click();
    });
    cy.wait(3000);
    cy.url().then((currentUrl) => {
      if (currentUrl.includes('/talent')) {
        cy.url().should('eq', 'https://dev.partner.komerce.my.id/talent');
      } else if (currentUrl === 'https://dev.partner.komerce.my.id/' || currentUrl === 'https://dev.partner.komerce.my.id') {
        cy.get('h1').should('contain.text', 'Dashboard');
      }
    })
  });

  it('sign in with wrong and credentials', () => {
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').should('be.visible');
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').its('0.contentDocument.body').then(cy.wrap).within(() => {
      cy.get('#username_email').type('explore_ap@yopmail.com');
      cy.get('#password').type('12345678Aa');
      cy.get('button[type="submit"]').click();
      cy.wait(3000);
      cy.get('.ant-modal-content').should('be.visible').contains('Maaf, email atau password kamu salah.');
    });
    
  });

  it('sign in with wrong email format', () => {
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').should('be.visible');
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').its('0.contentDocument.body').then(cy.wrap).within(() => {
      cy.get('#username_email').type('explore_app');
      cy.wait(500);
      cy.get('.ant-form-item-explain-error').should('contain.text', 'Email tidak valid');
    });
  })

  it('sign in with unregistered email', () => {
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').should('be.visible');
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').its('0.contentDocument.body').then(cy.wrap).within(() => {
      cy.get('#username_email').type('explore_app2@yopmail.com');
      cy.wait(500);
      cy.get('.ant-form-item-explain-error').should('contain.text', 'Email belum terdaftar');
    });
  })
  
  it('email is empty', () => {
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').should('be.visible');
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').its('0.contentDocument.body').then(cy.wrap).within(() => {
      cy.get('#password').type('12345678Aa.');
      cy.get('button[type="submit"]').click();
      cy.get('.ant-form-item-explain-error').should('contain.text', 'Email tidak boleh kosong');
    });
  });

  it('password is empty', () => {
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').should('be.visible');
    cy.get('iframe[src*="dev-partner-v2.komerce.my.id/login"]').its('0.contentDocument.body').then(cy.wrap).within(() => {
      cy.get('#username_email').type('explore_app@yopmail.com');
      cy.get('button[type="submit"]').click();
      cy.get('.ant-form-item-explain-error').should('contain.text', 'Password tidak boleh kosong');
    });
  });
});
