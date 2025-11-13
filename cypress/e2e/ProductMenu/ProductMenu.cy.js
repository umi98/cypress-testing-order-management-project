// menu order punya dua submenu: Produk dan Daftar produk

// klik dari submenu: bisa tambah produk, klik simpan ke produk aktif. verifikasi melalui respon json dan toast (kalau bisa)
// klik dari submenu: bisa tambah produk, klik simpan draft. verifikasi melalui respon json dan toast (kalau bisa)
// klik dari icon tambah di daftar menu: bisa tambah produk, klik simpan ke produk aktif. verifikasi melalui respon json dan toast (kalau bisa)
// klik dari icon tambah di daftar menu: bisa tambah produk, klik simpan draft. verifikasi melalui respon json dan toast (kalau bisa)
// tambahan buat tambah order:
// verifikasi dengan cek di daftar produk, entri paling baru ada di urutan paling bawah

// daftar order memiliki dua tab: Semua dan Draft
// verifikasi element di halaman: search box, filter button, tabel (header: nama produk, variasi, harga, stock, terjual, aksi: edit, bundlijg, hapus)
// cek fungsionalitas filter: cek tombol terapkan dan reset
import { SELECTORS } from "../../support/constant";

describe('Menu Verification: Product', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.login();
    cy.visit(`${SELECTORS.DASHBOARD_URL}/produk?tab=semua`);
  })

  it('Produk is exist in Side Menu Bar and have two submenus', () => {
    cy.get(SELECTORS.SIDE_MENU_BAR).should('exist')
		cy.contains('span.menu-title', 'Produk').should('be.visible').click({ force: true });
		cy.get('li.nav-item.has-sub')
			.contains('span.menu-title', 'Produk')
			.parent()
			.parent()
			.find('ul.menu-content')
			.should('be.visible')
			.within(() => {
				cy.get('li.nav-item').should('have.length', 2);
				cy.get('span.menu-title').then($items => {
					const labels = [...$items].map(el => el.innerText.trim());
					expect(labels).to.deep.equal(['Tambah Produk', 'Data Produk']);
				})
			})
	});
});
