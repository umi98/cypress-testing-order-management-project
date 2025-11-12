import { SELECTORS } from "../support/constant";

const devices = [
  { name: 'macbook-15', type: 'builtin', expectedVisible: true },
	{ name: 'ipad-2', type: 'builtin', expectedVisible: false },
	{ name: [1024, 768], type: 'custom', label: 'tablet-custom', expectedVisible: false },
	{ name: [1200, 1080], type: 'custom', label: 'laptop-custom', expectedVisible: true },
];

describe('Responsive Sidebar Test (Mixed Viewports)', () => {
	// Membuka halaman pickup karena halaman dashboard memiliki terlalu banyak elemen yang dimuat
	devices.forEach(({ name, type, label, expectedVisible }) => {
		const displayName = type === 'builtin' ? name : label;

		it(`should ${expectedVisible ? 'show' : 'hide'} sidebar on ${displayName}`, () => {
			if (type === 'builtin') {
				cy.viewport(name);
			} else {
				cy.viewport(name[0], name[1]);
			}
			cy.login();
			cy.visit(`${SELECTORS.DASHBOARD_URL}/ajukan-pickup`);
			if (expectedVisible) {
				cy.get('.main-menu').should('be.visible');
			} else {
				cy.get('.sidenav-overlay').should('not.be.visible');
				cy.get('a.nav-link').first().click();
				cy.get('.menu-open').should('be.visible');
			}
		});
	});
})

