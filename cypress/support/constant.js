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

export const ADD_PRODUCT_SELECTOR = {
  variation: {
    block: (index) => `input#variant-name:eq(${index})`,
    nameInput: 'input#variant-name',
    choiceInput: 'input#variant-name',
    addVariationBtn: '[data-cy="add-variation-btn"]',
    addChoiceBtn: 'button:contains("Tambah Pilihan")',
  },
  combination: {
    tableRow: 'table tbody tr',
    priceInput: 'td[aria-colindex="5"] input',
    stockInput: 'td[aria-colindex="4"] input'
  },
  applyToAll: {
    price: '#all-price-variant',
    stock: '#all-stock-variant',
    submitBtn: 'button:contains("Terapkan ke semua")'
  },
  toastSuccess: '.toast-success'
}