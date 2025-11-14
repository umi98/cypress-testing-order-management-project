import { SELECTORS } from "../../support/constant";

const PRODUCT_LIST_URL = `${SELECTORS.DASHBOARD_URL}/produk?tab=semua`;
const ADD_PRODUCT_URL = `${SELECTORS.DASHBOARD_URL}/add-produk`;
const fieldsToCheck = [
  { label: 'Nama Produk', selector: 'input#name-product', type: 'input text', required: true },
  { label: 'SKU', selector: 'input#sku-product', type: 'input text', required: false },
  { label: 'Deskripsi Produk', selector: 'textarea#description-product', type: 'textarea', required: true },
  { label: 'Upload File', selector: 'label[role="button"]', type: 'button', required: false },
  { label: 'Harga', selector: 'input[placeholder="Contoh : 85000 (masukkan angka saja tanpa titik, koma atau karakter lain)"]', type: 'input number', required: true },
  { label: 'Stok', selector: 'input#stock-product', type: 'input number', required: true },
  { label: 'Berat Produk', selector: 'input[placeholder="(Contoh : 200)"]', type: 'input number', required: true },
  { label: 'Volume', selector: 'input[placeholder="Panjang"]', type: 'input number', required: true },
  { label: 'Volume', selector: 'input[placeholder="Lebar"]', type: 'input number', required: true },
  { label: 'Volume', selector: 'input[placeholder="Tinggi"]', type: 'input number', required: true },
  { label: 'Upload Foto', selector: 'label[for="image-product"]', type: 'button', required: true}
];

describe('Add Product Functionality', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login();
    cy.visit(ADD_PRODUCT_URL);
  });

  it.only('should display necessary fields and buttons', () => {
    fieldsToCheck.forEach(field => {
      cy.log(`checking visibility of: ${field.label}`);
      const el = cy.get(field.selector)
        .should('exist')
        .and('be.visible');
      
      if (field.type.includes('input')) {
        el.should('have.prop', 'tagName').then(tagName => {
          expect(tagName).to.match(/INPUT/);
        });
      }
      if (field.type === 'textarea') {
        el.should('have.prop', 'tagName').should('eq', 'TEXTAREA');
      }
      if (field.type === 'button') {
        el.should('have.prop', 'tagName').then(tagName => {
          expect(tagName).to.match(/LABEL|BUTTON/);
        });
      }
    });
  });

  it('should be able to add new product (minus variations) as draft', () => {});

  it('should be able to add new product (minus variations) as active product', () => {});

  it('should be able to add new product with variations as draft', () => {});

  it('should be able to add new product with variations as active product', () => {});

  it('should show validation error when required fields are empty', () => {});
})