export const SELECTORS = {
  IFRAME_SELECTOR: 'iframe[src*="dev-partner-v2.komerce.my.id/login"]',
  USERNAME_SELECTOR: '#username_email',
  PASSWORD_SELECTOR: '#password',
  LOGIN_SUBMIT_BUTTON_SELECTOR: 'button[type="submit"]',
  LOGIN_MODAL_CONTENT_SELECTOR: '.ant-modal-content',
  LOGIN_ERROR_EXPLAIN_SELECTOR: '.ant-form-item-explain-error',
  SIDE_MENU_BAR: 'ul.navigation-main',
  DASHBOARD_URL: Cypress.env("DASHBOARD_URL")
}

// export const ADD_PRODUCT_SELECTOR = {
//   variation: {
//     block: (index) => `input#variant-name:eq(${index})`,
//     nameInput: 'input#variant-name',
//     choiceInput: 'input#variant-name',
//     addVariationBtn: '[data-cy="add-variation-btn"]',
//     addChoiceBtn: 'button:contains("Tambah Pilihan")',
//   },
//   combination: {
//     tableRow: 'table tbody tr',
//     priceInput: 'td[aria-colindex="5"] input',
//     stockInput: 'td[aria-colindex="4"] input'
//   },
//   applyToAll: {
//     price: '#all-price-variant',
//     stock: '#all-stock-variant',
//     submitBtn: 'button:contains("Terapkan ke semua")'
//   },
//   toastSuccess: '.toast-success'
// }

export const ADD_PRODUCT_SELECTOR = [
  { label: 'Nama Produk', selector: 'input#name-product', type: 'input text', required: true },
  { label: 'SKU', selector: 'input#sku-product', type: 'input text', required: false },
  { label: 'Deskripsi Produk', selector: 'textarea#description-product', type: 'textarea', required: true },
  { label: 'Upload File', selector: 'input#doc', type: 'button', required: false },
  { label: 'Upload Foto', selector: 'input#image-product', type: 'button', required: true},
  { label: 'Harga', selector: 'input[placeholder="Contoh : 85000 (masukkan angka saja tanpa titik, koma atau karakter lain)"]', type: 'input number', required: true },
  { label: 'Stok', selector: 'input#stock-product', type: 'input number', required: true },
  { label: 'Berat Produk', selector: 'input[placeholder="(Contoh : 200)"]', type: 'input number', required: true },
  { label: 'Volume', selector: 'input[placeholder="Panjang"]', type: 'input number', required: true },
  { label: 'Volume', selector: 'input[placeholder="Lebar"]', type: 'input number', required: true },
  { label: 'Volume', selector: 'input[placeholder="Tinggi"]', type: 'input number', required: true }
]