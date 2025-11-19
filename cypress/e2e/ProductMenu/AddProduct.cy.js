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
  cy.get(pageElement[4].selector)
    .selectFile(`cypress/fixtures/${product.image}`, { action: 'select', force: true });
  if (product.harga && product.stok) {
    cy.get(pageElement[5].selector).type(product.harga);
    cy.get(pageElement[6].selector).type(product.stok);
  }
  cy.get(pageElement[7].selector).type(product.berat);
  cy.get(pageElement[8].selector).type(product.volume.panjang);
  cy.get(pageElement[9].selector).type(product.volume.lebar);
  cy.get(pageElement[10].selector).type(product.volume.tinggi);
}

function addVariations(variationName, choices = []) {
  cy.get('button').contains('Hapus Varian').should('be.visible');
  cy.get('.row.w-100.mb-2.ml-50').its('length').then((length) => {
    const newIndex = length - 1;
    const maxChoice = 8;
    cy.log(`index: ${newIndex}`);
    cy.log(`length: ${length}`);
    cy.get('.row.w-100.mb-2.ml-50').eq(newIndex)
      .find('input[placeholder="Contoh: Warna, Ukuran, Bahan"]')
      .type(variationName);
    choices.forEach((choice, choiceIndex) => {
      if (choiceIndex === 0) {
        cy.get('.row.w-100.mb-2.ml-50').eq(newIndex)
          .find('input[placeholder="Contoh: Merah, XL, Cotton"]').eq(0).type(choice);
      } else {
        cy.get('.row.w-100.mb-2.ml-50').eq(newIndex)
          .find('button').contains('Tambah Pilihan').should('be.visible').click();
        cy.get('.row.w-100.mb-2.ml-50').eq(newIndex)
          .find('input[placeholder="Contoh: Merah, XL, Cotton"]').eq(choiceIndex).type(choice);
      }

      if (choiceIndex >= maxChoice) {
        cy.get('button').contains('Tambah Pilihan').should('not.exist');
      }
    });
  });
}

function addAnotherVariationType(variationName, choices = []) {
  cy.get('button').contains('Tambahkan tipe varian').should('be.visible').click();
  addVariations(variationName, choices);
}

function applyVariation(product) {
  const { kombinasi } = product;
  cy.get('button').contains('Terapkan Variasi').should('be.visible').click();
  cy.get('h4').contains('Tabel Varian').should('exist');
  cy.get('.table.b-table tbody tr').each((row, rowIndex) => {
    const tampilanData = kombinasi.kodeVariasi[rowIndex];
    const stokData = kombinasi.stok[rowIndex];
    const hargaData = kombinasi.harga[rowIndex];

    cy.wrap(row)
      .find('input[type="file"]')
      .selectFile(`cypress/fixtures/${kombinasi.gambarVariasi[rowIndex]}`, { action: 'select', force: true });

    cy.wrap(row).find('td').eq(3).then(($kodeCell) => {
      cy.wrap(row).find('td').eq(4).then(($stokCell) => {
        cy.wrap(row).find('td').eq(5).then(($hargaCell) => {
          tampilanData.forEach((ukuranGroup, ukuranIndex) => {
            ukuranGroup.forEach((kode, tingkatIndex) => {
              const inputIndex = (ukuranIndex * 3) + tingkatIndex;
              cy.wrap($kodeCell).find('input').eq(inputIndex).clear().type(kode);
            });
            stokData[ukuranIndex].forEach((stok, tingkatIndex) => {
              const inputIndex = (ukuranIndex * 3) + tingkatIndex;
              cy.wrap($stokCell).find('input').eq(inputIndex).clear().type(stok.toString());
            });
            hargaData[ukuranIndex].forEach((harga, tingkatIndex) => {
              const inputIndex = (ukuranIndex * 3) + tingkatIndex;
              cy.wrap($hargaCell).find('input').eq(inputIndex).clear().type(harga.toString());
            });
          });
        });
      });
    });
  });
}


describe('Add Product Functionality', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login();
    cy.visit(ADD_PRODUCT_URL);
    cy.fixture('productData').as('products');
  });

  it('should display necessary fields and buttons', () => {
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
    const product = this.products[1]; //can't use arrow function if you use this line
    fillProductForm(product);
    cy.get('button').contains('Simpan Draft').should('not.be.disabled').click();
    cy.contains(/success/i, {timeout: 10000}).should('be.visible');
    cy.get('ul.nav-tabs').should('be.visible').within(() => {
      cy.get('li.nav-item').eq(1).should('contain','Draft');
      cy.get('li.nav-item').eq(1).click().then(() => {
        cy.url().should('include', 'tab=draft');
      });
    });
    cy.get('div.font-medium').contains(product.namaProduk).should('exist');
  });

  // pastikan nama produk belum ada di daftar produk baik di draft maupun sktif
  it('should be able to add new product (minus variations) as active product', function () {
    const product = this.products[1];
    fillProductForm(product);
    cy.get('button[type="submit"]').should('not.be.disabled').click();
    cy.contains(/success/i, {timeout: 10000}).should('be.visible');
    cy.url().should('includes', 'tab=semua');
    cy.get('div.font-medium').contains(product.namaProduk).should('exist');
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
  
  it.only('should be able to add new product with variations as draft', function () {
    const product = this.products[2];
    
    cy.get('button').contains('Tambah Varian').should('be.visible');
    cy.get('.row.w-100.mx-1.mt-2.mb-2').should('not.exist');
    
    cy.get('button').contains('Tambah Varian').should('be.visible').click();
    cy.get('button').contains('Tambah Varian').should('not.exist');

    const maxVariation = 3;

    for(let i = 0; i < Math.min(product.variasi.length, maxVariation); i++) {
      const { nama, pilihan } = product.variasi[i];
      if (i === 0) {
        addVariations(nama, pilihan);
      } else {
        addAnotherVariationType(nama, pilihan);
      }
    }
    
    if (product.variasi.length >= maxVariation) {
      cy.get('button').contains('Tambahkan tipe varian').should('not.exist');
    }

    applyVariation(product);

    fillProductForm(product);

    cy.get('button').contains('Simpan Draft').should('not.be.disabled').click();
    cy.contains(/success/i, {timeout: 10000}).should('be.visible');
    cy.get('ul.nav-tabs').should('be.visible').within(() => {
      cy.get('li.nav-item').eq(1).should('contain','Draft');
      cy.get('li.nav-item').eq(1).click().then(() => {
        cy.url().should('include', 'tab=draft');
      });
    });
    cy.get('div.font-medium').contains(product.namaProduk).should('exist');
  });

  it('should be able to add new product with variations as active product', () => {});

  it('should show validation error when required fields are empty', () => {});
})