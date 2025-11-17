import { SELECTORS } from "../../support/constant";

const PRODUCT_LIST_URL = `${SELECTORS.DASHBOARD_URL}/produk?tab=semua`;
const ADD_PRODUCT_URL = `${SELECTORS.DASHBOARD_URL}/add-produk`;
const fieldsToCheck = [
  { label: 'Nama Produk', selector: 'input#name-product', type: 'input text', required: true },
  { label: 'SKU', selector: 'input#sku-product', type: 'input text', required: false },
  { label: 'Deskripsi Produk', selector: 'textarea#description-product', type: 'textarea', required: true },
  { label: 'Upload File', selector: 'input#doc', type: 'button', required: false },
  { label: 'Harga', selector: 'input[placeholder="Contoh : 85000 (masukkan angka saja tanpa titik, koma atau karakter lain)"]', type: 'input number', required: true },
  { label: 'Stok', selector: 'input#stock-product', type: 'input number', required: true },
  { label: 'Berat Produk', selector: 'input[placeholder="(Contoh : 200)"]', type: 'input number', required: true },
  { label: 'Volume', selector: 'input[placeholder="Panjang"]', type: 'input number', required: true },
  { label: 'Volume', selector: 'input[placeholder="Lebar"]', type: 'input number', required: true },
  { label: 'Volume', selector: 'input[placeholder="Tinggi"]', type: 'input number', required: true },
  { label: 'Upload Foto', selector: 'input#image-product', type: 'button', required: true}
];

function fillProductForm(product) {
  cy.get(fieldsToCheck[0].selector).clear().type(product.namaProduk, { delay: 1000 });
  cy.get(fieldsToCheck[1].selector).type(product.sku, { delay: 1000 });
  cy.get(fieldsToCheck[2].selector).type(product.deskripsi);
  cy.get(fieldsToCheck[3].selector)
    .selectFile(`cypress/fixtures/${product.file}`, { action: 'select', force: true });
  cy.get(fieldsToCheck[4].selector).type(product.harga);
  cy.get(fieldsToCheck[5].selector).type(product.stok);
  cy.get(fieldsToCheck[6].selector).type(product.berat);
  cy.get(fieldsToCheck[7].selector).type(product.volume.panjang);
  cy.get(fieldsToCheck[8].selector).type(product.volume.lebar);
  cy.get(fieldsToCheck[9].selector).type(product.volume.tinggi);
  cy.get(fieldsToCheck[10].selector)
    .selectFile(`cypress/fixtures/${product.image}`, { action: 'select', force: true });
}

describe('Add Product Functionality', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login();
    cy.visit(ADD_PRODUCT_URL);
    cy.fixture('productData').as('products');
  });

  it('should display necessary fields and buttons', () => {
    fieldsToCheck.forEach(field => {
      cy.log(`checking visibility of: ${field.label}`);
      const el = cy.get(field.selector)
        .should('exist');
      
      if (field.type.includes('input')) {
        el.should('have.prop', 'tagName').then(tagName => {
          expect(tagName).to.match(/INPUT/);
        });
      }
      if (field.type === 'textarea') {
        el.should('have.prop', 'tagName').should('eq', 'TEXTAREA');
      }
      if (field.type === 'button') {
        el.should('have.prop', 'hidden');
      }
    });
  });

  // pastikan nama produk belum ada di daftar produk baik di draft maupun aktif
  it('should be able to add new product (minus variations) as draft', function () {
    const product = this.products[0]; //can't use arrow function if you use this line
    fillProductForm(product);
    cy.get('button').contains('Simpan Draft').should('not.be.disabled').click();
    cy.contains(/berhasil|success|sukses/i, {timeout: 5000}).should('be.visible');
  });

  // pastikan nama produk belum ada di daftar produk baik di draft maupun sktif
  it('should be able to add new product (minus variations) as active product', function () {
    const product = this.products[1];
    fillProductForm(product);
    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.contains(/berhasil|success|sukses/i, {timeout: 5000}).should('be.visible');
  });

  // terkadang small.text-primary butuh waktu lama untuk muncul sehingga ada kemungkinan test ini gagal
  it.only('should disable button when Judul Produk is duplicate with existing product', function () {
    const product = this.products[0];
    fillProductForm(product);
    cy.get('small.text-primary').eq(0).should('contain.text', '*Nama produk sudah dipakai');
    cy.get('small.text-primary').eq(1).should('contain.text', '*SKU sudah digunakan');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('button').contains('Simpan Draft').should('be.disabled');
  })
  
  it('should be able to add new product with variations as draft', () => {});

  it('should be able to add new product with variations as active product', () => {});

  it('should show validation error when required fields are empty', () => {});
})