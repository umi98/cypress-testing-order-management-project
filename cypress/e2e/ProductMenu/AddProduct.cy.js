import { SELECTORS, ADD_PRODUCT_SELECTOR } from "../../support/constant";
import { cartesian, flattenMatrix3D } from "../../support/utils";

const PRODUCT_LIST_URL = `${SELECTORS.DASHBOARD_URL}/produk?tab=semua`;
const ADD_PRODUCT_URL = `${SELECTORS.DASHBOARD_URL}/add-produk`;
const pageElement = ADD_PRODUCT_SELECTOR;

function fillProductForm(product) {
  cy.get(pageElement[0].selector).clear().type(product.namaProduk, { delay: 1000 });
  cy.get(pageElement[1].selector).type(product.sku, { delay: 1000 });
  cy.get(pageElement[2].selector).type(product.deskripsi);
  if (product.file) {
    cy.get(pageElement[3].selector)
      .selectFile(`cypress/fixtures/${product.file}`, { action: 'select', force: true });
  }
  cy.get(pageElement[4].selector).type(product.harga);
  cy.get(pageElement[5].selector).type(product.stok);
  cy.get(pageElement[6].selector).type(product.berat);
  cy.get(pageElement[7].selector).type(product.volume.panjang);
  cy.get(pageElement[8].selector).type(product.volume.lebar);
  cy.get(pageElement[9].selector).type(product.volume.tinggi);
  cy.get(pageElement[10].selector)
    .selectFile(`cypress/fixtures/${product.image}`, { action: 'select', force: true });
}

// function fillProductWithVariation(product) {
//   cy.get(fieldsToCheck[0].selector).clear().type(product.namaProduk, { delay: 1000 });
//   cy.get(fieldsToCheck[1].selector).type(product.sku, { delay: 1000 });
//   cy.get(fieldsToCheck[2].selector).type(product.deskripsi);
//   if (product.file) {
//     cy.get(fieldsToCheck[3].selector)
//       .selectFile(`cypress/fixtures/${product.file}`, { action: 'select', force: true });
//   }
//   cy.get('button').contains("Tambah Varian").click();
//   cy.wait(3000);
//   let counter = 0;
//   do {
//     for (let i = 0; i < product.variasi.length; i++){
//       cy.get('input#variant-name').eq(counter).type(product.variasi[i][0]);
//       cy.get('input#variant-name').eq(++counter).type(product.variasi[i][1][0]);
//       if (product.variasi[i][1].length > 1) {
//         for (let j = 1; j <= product.variasi[i][1]; j++){
//           counter++;
//           cy.get('input#variant-name').eq(counter).type(product.variasi[i][1][j]);
//           if (j != product.variasi[i][1].length) 
//             cy.get('button').contains("Tambah Pilihan").click();
//         }
//       }
//     }
//   } while (!cy.get('button').contains("Terapkan Variasi").click());
//   cy.get(fieldsToCheck[6].selector).type(product.berat);
//   cy.get(fieldsToCheck[7].selector).type(product.volume.panjang);
//   cy.get(fieldsToCheck[8].selector).type(product.volume.lebar);
//   cy.get(fieldsToCheck[9].selector).type(product.volume.tinggi);
//   cy.get(fieldsToCheck[10].selector)
//     .selectFile(`cypress/fixtures/${product.image}`, { action: 'select', force: true });
// }

function addVariations(product) {
  product.variasi.forEach((variation, index) => {
    cy.addVariation(index, variation);
  })
  // cy.contains('button', 'Terapkan Variasi').click();
  // const prices = flattenMatrix3D(product.kombinasi.harga);
  // const stock = flattenMatrix3D(product.kombinasi.stok);
}


describe('Add Product Functionality', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login();
    cy.visit(ADD_PRODUCT_URL);
    cy.fixture('productData').as('products');
  });

  it.only('should display necessary fields and buttons', () => {
    pageElement.forEach(field => {
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
  it('should disable button when Judul Produk is duplicate with existing product', function () {
    const product = this.products[0];
    fillProductForm(product);
    cy.get('small.text-primary').eq(0).should('contain.text', '*Nama produk sudah dipakai');
    cy.get('small.text-primary').eq(1).should('contain.text', '*SKU sudah digunakan');
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('button').contains('Simpan Draft').should('be.disabled');
  })
  
  it('should be able to add new product with variations as draft', function () {
    const product = this.products[2];
    cy.log(product);
  });

  it('should be able to add new product with variations as active product', () => {});

  it('should show validation error when required fields are empty', () => {});
})