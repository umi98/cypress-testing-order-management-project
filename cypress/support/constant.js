export const SELECTORS = {
    IFRAME_SELECTOR: 'iframe[src*="dev-partner-v2.komerce.my.id/login"]',
    USERNAME_SELECTOR: '#username_email',
    PASSWORD_SELECTOR: '#password',
    LOGIN_SUBMIT_BUTTON_SELECTOR: 'button[type="submit"]',
    LOGIN_MODAL_CONTENT_SELECTOR: '.ant-modal-content',
    LOGIN_ERROR_EXPLAIN_SELECTOR: '.ant-form-item-explain-error',
    DASHBOARD_URL: Cypress.env("DASHBOARD_URL")
}