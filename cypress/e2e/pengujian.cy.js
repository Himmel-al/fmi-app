
describe("Pengujian SIPP - Sistem Informasi Pemesanan Perabotan", () => {
  const customerStorage = {
    isLoggedIn: "true",
    role: "customer",
    token: "cypress-customer-token",
  };

  const adminStorage = {
    isLoggedIn: "true",
    role: "admin",
    token: "cypress-admin-token",
  };

  const sampleProduct = {
    id_product: 101,
    product_name: "Sofa Minimalis Cypress",
    price: 2500000,
    image: "",
    category: {
      id_categories: 1,
      category_name: "Sofa",
    },
  };

  const visitCustomer = (path, extra = {}) => {
    cy.visit(path, {
      onBeforeLoad(win) {
        Object.entries({ ...customerStorage, ...extra }).forEach(
          ([key, value]) => win.localStorage.setItem(key, value)
        );
      },
    });
  };

  const visitAdmin = (path, extra = {}) => {
    cy.visit(path, {
      onBeforeLoad(win) {
        Object.entries({ ...adminStorage, ...extra }).forEach(
          ([key, value]) => win.localStorage.setItem(key, value)
        );
      },
    });
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // TC-01: Registrasi Akun
  it("TC-01A - Halaman utama SIPP dapat dibuka", () => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:5173/");
    cy.get("body").should("be.visible");
  });

  it("TC-01B - Halaman registrasi menampilkan form", () => {
    cy.visit("/register");
    cy.contains("Buat Akun Baru").should("be.visible");
    cy.get('input[name="name"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
  });

  it("TC-01C - Registrasi dengan data valid", () => {
    cy.intercept("POST", "**/api/auth/register", {
      statusCode: 201,
      body: { message: "Registrasi berhasil" },
    }).as("register");

    cy.visit("/register");
    cy.get('input[name="name"]').type("Pelanggan Cypress");
    cy.get('input[name="email"]').type("cypress.pelanggan@example.com");
    cy.get('input[name="phone"]').type("081234567890");
    cy.get('input[name="address"]').type("Jl. Pengujian No. 1");
    cy.get('input[name="password"]').type("Password123!");
    cy.get('button[type="submit"]').click();

    cy.wait("@register");
    cy.url().should("include", "/login");
  });

  // TC-02: Login
  it("TC-02A - Login admin berhasil", () => {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 200,
      body: {
        token: "test-admin-token",
        user: {
          id: 1,
          name: "Admin Cypress",
          email: "admin@example.com",
          role: "admin",
        },
      },
    }).as("login");

    cy.visit("/login");
    cy.get('input[type="email"]').type("admin@example.com");
    cy.get('input[type="password"]').type("Password123!");
    cy.get('button[type="submit"]').click();

    cy.wait("@login");
    cy.url().should("include", "/dashboard");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("role")).to.equal("admin");
      expect(win.localStorage.getItem("token")).to.equal("test-admin-token");
    });
  });

  it("TC-02B - Login gagal dengan kredensial salah", () => {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 401,
      body: { message: "Email atau kata sandi salah." },
    }).as("loginGagal");

    cy.visit("/login");
    cy.get('input[type="email"]').type("salah@example.com");
    cy.get('input[type="password"]').type("password-salah");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginGagal");
    cy.url().should("include", "/login");
  });

  it("TC-02C - Login tidak dikirim ketika input wajib kosong", () => {
    cy.intercept("POST", "**/api/auth/login").as("login");

    cy.visit("/login");
    cy.get('button[type="submit"]').click();

    cy.get('input[type="email"]').then(($input) => {
      expect($input[0].checkValidity()).to.equal(false);
    });

    cy.get("@login.all").should("have.length", 0);
  });

  // TC-03: Logout
  it("TC-03 - Logout menghapus token dan mengarahkan ke login", () => {
    cy.on("window:confirm", (message) => {
      expect(message.toLowerCase()).to.include("yakin ingin keluar");
      return true;
    });

    visitCustomer("/customer");

    // Menggunakan atribut tombol yang ada di CustomerLayout.
    cy.get('button[title="Keluar dari SIPP"]')
      .should("be.visible")
      .click();

    cy.url().should("include", "/login");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });
  });

  // TC-04: Kelola Profil
  it("TC-04 - Profil konsumen ditampilkan", () => {
    cy.intercept("GET", "**/api/auth/user", {
      statusCode: 200,
      body: {
        id: 7,
        name: "Pelanggan Cypress",
        email: "pelanggan@example.com",
        phone: "081234567890",
        address: "Jl. Contoh No. 10",
      },
    }).as("profil");

    visitCustomer("/customer/profil");

    cy.wait("@profil");
    cy.contains(/profil/i).should("be.visible");
    cy.contains("Pelanggan Cypress").should("be.visible");
  });

  // TC-05: Riwayat Pesanan
  it("TC-05A - Riwayat pesanan menampilkan transaksi", () => {
    const orders = [
      {
        id: "12345",
        tanggal: "25/10/2026",
        customer: "Pelanggan Cypress",
        items: [{ nama: "Sofa Minimalis Cypress", qty: 1 }],
        total: 2500000,
        metodeBayar: "transfer",
        status: "Diproses",
      },
    ];

    visitCustomer("/customer/pesanan", {
      orders: JSON.stringify(orders),
    });

    cy.contains("Riwayat").should("be.visible");
    cy.contains("#TRX-12345").should("be.visible");
    cy.contains("Sofa Minimalis Cypress").should("be.visible");
  });

  it("TC-05B - Riwayat pesanan kosong ditampilkan", () => {
    visitCustomer("/customer/pesanan", {
      orders: JSON.stringify([]),
    });

    cy.contains("Belum Ada Transaksi").should("be.visible");
  });

  // TC-06: Mencari Produk
  it("TC-06 - Konsumen mencari produk berdasarkan nama", () => {
    cy.intercept("GET", "**/api/products", {
      statusCode: 200,
      body: [sampleProduct],
    }).as("products");

    visitCustomer("/customer/produk");

    cy.wait("@products");

    cy.get('input[placeholder="Cari perabotan mewah..."]')
      .should("be.visible")
      .type("Sofa Minimalis");

    cy.contains("Sofa Minimalis Cypress").should("be.visible");

    cy.get('input[placeholder="Cari perabotan mewah..."]')
      .clear()
      .type("ProdukTidakAda");

    cy.contains(/tidak ditemukan/i).should("be.visible");
  });

  // TC-07: Memesan Perabotan
  it("TC-07 - Konsumen menambahkan produk ke keranjang", () => {
    cy.intercept("GET", "**/api/products", {
      statusCode: 200,
      body: [sampleProduct],
    }).as("products");

    cy.on("window:alert", (message) => {
      expect(message).to.include("Sofa Minimalis Cypress");
    });

    visitCustomer("/customer/produk");

    cy.wait("@products");
    cy.get('button[aria-label="Tambah ke keranjang"]')
      .should("be.visible")
      .click();

    cy.window().then((win) => {
      const cart = JSON.parse(win.localStorage.getItem("cart"));
      expect(cart).to.have.length(1);
      expect(cart[0].product_name).to.equal("Sofa Minimalis Cypress");
      expect(cart[0].qty).to.equal(1);
    });
  });

  // TC-08: Kelola Keranjang
  it("TC-08A - Keranjang kosong menampilkan pesan yang sesuai", () => {
    visitCustomer("/customer/keranjang", {
      cart: JSON.stringify([]),
    });

    cy.contains("Keranjang Anda Kosong").should("be.visible");
    cy.get('.text-center > .btn').should("be.visible");
  });

  it("TC-08B - Kuantitas produk di keranjang dapat ditambah", () => {
    const cart = [{ ...sampleProduct, qty: 1 }];

    visitCustomer("/customer/keranjang", {
      cart: JSON.stringify(cart),
    });

    cy.contains("Sofa Minimalis Cypress")
      .closest("tr")
      .find("button")
      .eq(1)
      .click();

    cy.window().then((win) => {
      const updatedCart = JSON.parse(win.localStorage.getItem("cart"));
      expect(updatedCart[0].qty).to.equal(2);
    });
  });

  // TC-08C: Checkout tanpa alamat
  it("TC-08C - Checkout menolak pesanan tanpa alamat", () => {
    const cart = [{ ...sampleProduct, qty: 1 }];

    cy.on("window:alert", (message) => {
      expect(message).to.include("Silakan tentukan alamat pengiriman");
    });

    visitCustomer("/customer/checkout", {
      cart: JSON.stringify(cart),
    });

    cy.contains("Formulir").should("be.visible");

    cy.get('textarea[placeholder^="Tuliskan alamat lengkap"]')
      .clear();

    cy.contains("button", "Amankan & Selesaikan Pesanan").click();

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("orders") || "[]"))
        .to.have.length(0);

      expect(JSON.parse(win.localStorage.getItem("cart")))
        .to.have.length(1);
    });
  });

  // TC-08D: Checkout berhasil
  it("TC-08D - Checkout menyimpan pesanan dan mengosongkan keranjang", () => {
    const cart = [{ ...sampleProduct, qty: 2 }];

    cy.on("window:alert", (message) => {
      expect(message).to.include("Pesanan Berhasil Diamankan");
    });

    visitCustomer("/customer/checkout", {
      cart: JSON.stringify(cart),
      orders: JSON.stringify([]),
    });

    cy.get('textarea[placeholder^="Tuliskan alamat lengkap"]')
      .clear()
      .type("Jl. Pengujian No. 10, Pekanbaru");

    cy.contains("button", "Amankan & Selesaikan Pesanan").click();

    cy.url().should("include", "/customer/pesanan");

    cy.window().then((win) => {
      const orders = JSON.parse(win.localStorage.getItem("orders"));
      expect(orders).to.have.length(1);
      expect(orders[0].alamat).to.equal(
        "Jl. Pengujian No. 10, Pekanbaru"
      );
      expect(orders[0].total).to.equal(5000000);
      expect(win.localStorage.getItem("cart")).to.be.null;
    });
  });

  // TC-09: Lihat Laporan Penjualan / Keuangan
  it("TC-09 - Owner dapat melihat laporan keuangan", () => {
    cy.intercept("GET", "**/api/owner/finance", {
      statusCode: 200,
      body: {
        total_pendapatan: 10000000,
        order_details: [
          {
            id_product: 101,
            quantity: 2,
            price: 5000000,
            subtotal: 10000000,
            product: {
              product_name: "Sofa Minimalis Cypress",
            },
          },
        ],
      },
    }).as("finance");

    cy.visit("/ownerLaporanKeuangan");
    cy.wait("@finance");

    cy.contains("Analisis Laba Rugi").should("be.visible");
    cy.contains("Sofa Minimalis Cypress").should("be.visible");
  });

  // TC-10: Kelola Data Produk
  it("TC-10 - Admin dapat membuka katalog produk", () => {
    cy.intercept("GET", "**/api/products", {
      statusCode: 200,
      body: [sampleProduct],
    }).as("adminProducts");

    visitAdmin("/katalogproduk");

    cy.wait("@adminProducts");
    cy.contains("Katalog Produk").should("be.visible");
    cy.contains("Sofa Minimalis Cypress").should("be.visible");
  });

  // TC-11: Konfirmasi Pembayaran
  // Pengujian ini memeriksa detail invoice transfer yang tersedia di frontend.
  it("TC-11 - Konsumen membuka dan menutup detail invoice", () => {
    const orders = [
      {
        id: "98765",
        tanggal: "25/10/2026",
        customer: "Pelanggan Cypress",
        items: [{ nama: "Sofa Minimalis Cypress", qty: 1 }],
        total: 2500000,
        metodeBayar: "transfer",
        status: "Diproses",
      },
    ];

    visitCustomer("/customer/pesanan", {
      orders: JSON.stringify(orders),
    });

    cy.contains("button", "Detail Invoice").click();
    cy.contains("Invoice Pembayaran #TRX-98765").should("be.visible");
    cy.contains("123-00-998877-6").should("be.visible");

    cy.contains("Tutup Dokumen").click();
    cy.contains("Invoice Pembayaran #TRX-98765").should("not.exist");
  });

  // TC-12: Memproses Pesanan
  it("TC-12 - Admin mengubah status pesanan menjadi selesai", () => {
    const orders = [
      {
        id: "54321",
        tanggal: "25/10/2026",
        customer: "Pelanggan Cypress",
        items: [{ nama: "Sofa Minimalis Cypress", qty: 1 }],
        total: 2500000,
        metodeBayar: "transfer",
        status: "Diproses",
      },
    ];

    cy.on("window:alert", (message) => {
      expect(message).to.include("berhasil diubah menjadi: Selesai");
    });

    visitAdmin("/pesananmasuk", {
      orders: JSON.stringify(orders),
    });

    cy.contains("#TRX-54321").should("be.visible");
    cy.contains("tr", "#TRX-54321")
      .contains("button", "Selesai")
      .click();

    cy.window().then((win) => {
      const updatedOrders = JSON.parse(win.localStorage.getItem("orders"));
      expect(updatedOrders[0].status).to.equal("Selesai");
    });

    cy.contains("tr", "#TRX-54321")
      .contains("Selesai")
      .should("be.visible");
  });
});
