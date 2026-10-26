
describe("Pengujian Sistem SIPP - F01 sampai F14", () => {
  const customer = {
    isLoggedIn: "true",
    role: "customer",
    token: "cypress-customer-token",
  };

  const admin = {
    isLoggedIn: "true",
    role: "admin",
    token: "cypress-admin-token",
  };

  const product = {
    id_product: 101,
    product_name: "Sofa Minimalis Cypress",
    category_id: 1,
    category: {
      id_categories: 1,
      category_name: "Sofa",
    },
    price: 2500000,
    stock: 10,
    sold: 2,
    rating: 5,
    description: "Produk untuk pengujian Cypress",
    image: "default.png",
  };

  const seedVisit = (path, values = {}) =>
    cy.visit(path, {
      onBeforeLoad(win) {
        Object.entries(values).forEach(([key, value]) => {
          win.localStorage.setItem(key, value);
        });
      },
    });

  const visitCustomer = (path, extra = {}) =>
    seedVisit(path, { ...customer, ...extra });

  const visitAdmin = (path, extra = {}) =>
    seedVisit(path, { ...admin, ...extra });

  const mockProducts = (body = [product], alias = "products") => {
    cy.intercept("GET", "**/api/products*", {
      statusCode: 200,
      body,
    }).as(alias);
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  // ================================================================
  // F01 - MELIHAT KATALOG PRODUK
  // ================================================================

  it("TC-01 - Halaman utama SIPP dapat dibuka", () => {
    cy.visit("/");

    cy.url().should("eq", "http://localhost:5173/");
    cy.get("body").should("be.visible");
  });

  it("TC-02 - Konsumen melihat katalog produk", () => {
    mockProducts();

    visitCustomer("/customer/produk");

    cy.wait("@products");
    cy.contains("Katalog").should("be.visible");
    cy.contains("Sofa Minimalis Cypress").should("be.visible");
    cy.contains("Rp 2.500.000").should("be.visible");
  });

  it("TC-03 - Katalog menampilkan kondisi saat API produk gagal", () => {
    cy.intercept("GET", "**/api/products*", {
      statusCode: 500,
      body: {
        message: "Terjadi kesalahan server",
      },
    }).as("productsError");

    visitCustomer("/customer/produk");

    cy.wait("@productsError");
    cy.contains(/tidak ditemukan/i).should("be.visible");
  });

  // ================================================================
  // REGISTRASI AKUN
  // ================================================================

  it("TC-04 - Form registrasi menampilkan field wajib", () => {
    cy.visit("/register");

    cy.contains("Buat Akun Baru").should("be.visible");

    ["name", "email", "phone", "address", "password"].forEach(
      (name) => {
        cy.get(`input[name="${name}"]`).should("be.visible");
      }
    );
  });

  it("TC-05 - Registrasi berhasil mengarahkan pengguna ke login", () => {
    cy.intercept("POST", "**/api/auth/register", {
      statusCode: 201,
      body: {
        message: "Registrasi berhasil",
      },
    }).as("register");

    cy.visit("/register");

    cy.get('input[name="name"]').type("Pelanggan Cypress");
    cy.get('input[name="email"]').type("cypress.pelanggan@example.com");
    cy.get('input[name="phone"]').type("081234567890");
    cy.get('input[name="address"]').type("Jl. Pengujian No. 1");
    cy.get('input[name="password"]').type("Password123!");

    cy.get('button[type="submit"]').click();

    cy.wait("@register")
      .its("response.statusCode")
      .should("eq", 201);

    cy.url().should("include", "/login");
  });

  it("TC-06 - Registrasi menampilkan pesan jika API menolak data", () => {
    cy.intercept("POST", "**/api/auth/register", {
      statusCode: 422,
      body: {
        message: "Email sudah digunakan.",
      },
    }).as("registerDuplicate");

    cy.visit("/register");

    cy.get('input[name="name"]').type("Pelanggan Duplikat");
    cy.get('input[name="email"]').type("cypress.pelanggan@example.com");
    cy.get('input[name="phone"]').type("081234567890");
    cy.get('input[name="address"]').type("Jl. Uji No. 2");
    cy.get('input[name="password"]').type("Password123!");

    cy.get('button[type="submit"]').click();

    cy.wait("@registerDuplicate");

    cy.contains("Email sudah digunakan.").should("be.visible");
    cy.url().should("include", "/register");
  });

  // ================================================================
  // F07 - LOGIN ADMIN
  // ================================================================

  it("TC-07 - Login admin dengan kredensial valid berhasil", () => {
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

    cy.wait("@login")
      .its("response.statusCode")
      .should("eq", 200);

    cy.url().should("include", "/dashboard");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("role")).to.equal("admin");
      expect(win.localStorage.getItem("token")).to.equal(
        "test-admin-token"
      );
    });
  });

  it("TC-08 - Login gagal dengan kredensial yang salah", () => {
    cy.intercept("POST", "**/api/auth/login", {
      statusCode: 401,
      body: {
        message: "Email atau kata sandi salah.",
      },
    }).as("loginFailed");

    cy.visit("/login");

    cy.get('input[type="email"]').type("salah@example.com");
    cy.get('input[type="password"]').type("password-salah");
    cy.get('button[type="submit"]').click();

    cy.wait("@loginFailed");

    cy.url().should("include", "/login");
  });

  it("TC-09 - Login tidak mengirim request jika field wajib kosong", () => {
    cy.intercept("POST", "**/api/auth/login").as("loginEmpty");

    cy.visit("/login");

    cy.get('button[type="submit"]').click();

    cy.get('input[type="email"]').then(($input) => {
      expect($input[0].checkValidity()).to.equal(false);
    });

    cy.get("@loginEmpty.all").should("have.length", 0);
  });

  // ================================================================
  // LOGOUT
  // ================================================================

  it("TC-10 - Logout menghapus token dan mengarahkan ke login", () => {
    cy.on("window:confirm", () => true);

    visitCustomer("/customer");

    cy.get('button[title="Keluar dari SIPP"]')
      .should("be.visible")
      .click();

    cy.url().should("include", "/login");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.be.null;
    });
  });

  it("TC-11 - Membatalkan logout mempertahankan sesi", () => {
    cy.on("window:confirm", () => false);

    visitCustomer("/customer");

    cy.get('button[title="Keluar dari SIPP"]').click();

    cy.url().should("include", "/customer");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token")).to.equal(customer.token);
    });
  });

  // ================================================================
  // F02 - MELIHAT DETAIL PRODUK
  // ================================================================

  it("TC-12 - Detail produk menampilkan informasi produk", () => {
    visitCustomer("/customer/produk/1");

    cy.contains("h1", "Sofa Minimalis Premium L-Shape")
      .should("be.visible");

    cy.contains("Deskripsi Properti").should("be.visible");
    cy.contains("Rp 2.500.000").should("be.visible");
    cy.contains("Masukkan Keranjang").should("be.visible");
    cy.contains("Akuisisi Sekarang").should("be.visible");
  });

  it("TC-13 - ID produk yang tidak ada menampilkan pesan", () => {
    visitCustomer("/customer/produk/99999");

    cy.contains("Koleksi Eksklusif Tidak Ditemukan")
      .should("be.visible");

    cy.contains("button", "Kembali ke Galeri Produk").click();

    cy.url().should("include", "/customer/produk");
  });

  it("TC-14 - Kuantitas detail produk dapat diubah sebelum dimasukkan ke keranjang", () => {
    cy.on("window:alert", (message) => {
      expect(message).to.include("2 unit");
    });

    visitCustomer("/customer/produk/1");

    cy.contains("Alokasi Jumlah :")
      .parent()
      .find("button")
      .last()
      .click();

    cy.contains("Alokasi Jumlah :")
      .parent()
      .should("contain", "2");

    cy.contains("button", "Masukkan Keranjang").click();

    cy.window().then((win) => {
      const cart = JSON.parse(win.localStorage.getItem("cart"));

      expect(cart).to.have.length(1);
      expect(cart[0].qty).to.equal(2);
      expect(cart[0].product_name).to.equal(
        "Sofa Minimalis Premium L-Shape"
      );
    });
  });

  // ================================================================
  // F03 - PENCARIAN DAN FILTER KATALOG
  // ================================================================

  it("TC-15 - Pencarian produk menampilkan hasil yang sesuai", () => {
    mockProducts();

    visitCustomer("/customer/produk");

    cy.wait("@products");

    cy.get('input[placeholder="Cari perabotan mewah..."]')
      .type("Sofa Minimalis");

    cy.contains("Sofa Minimalis Cypress").should("be.visible");

    cy.get('input[placeholder="Cari perabotan mewah..."]')
      .clear()
      .type("ProdukTidakAda");

    cy.contains(/tidak ditemukan/i).should("be.visible");
  });

  it("TC-16 - Filter kategori menyaring produk", () => {
    const products = [
      {
        ...product,
        id_product: 201,
        product_name: "Sofa Cypress",
        category: { category_name: "Sofa" },
      },
      {
        ...product,
        id_product: 202,
        product_name: "Meja Cypress",
        category: { category_name: "Meja Kerja" },
      },
      {
        ...product,
        id_product: 203,
        product_name: "Kursi Cypress",
        category: { category_name: "Kursi" },
      },
    ];

    mockProducts(products, "categoryProducts");

    visitCustomer("/customer/produk");

    cy.wait("@categoryProducts");
    cy.get("select").select("Sofa");

    cy.contains("Sofa Cypress").should("be.visible");
    cy.contains("Meja Cypress").should("not.exist");
    cy.contains("Kursi Cypress").should("not.exist");
  });

  it("TC-17 - Pagination katalog dapat berpindah halaman", () => {
    const products = [1, 2, 3, 4].map((number) => ({
      ...product,
      id_product: 300 + number,
      product_name: `Produk Cypress ${number}`,
    }));

    mockProducts(products, "pagedProducts");

    visitCustomer("/customer/produk");

    cy.wait("@pagedProducts");

    cy.contains("Produk Cypress 1").should("be.visible");
    cy.contains("Produk Cypress 4").should("not.exist");

    cy.contains("button", "2").click();

    cy.contains("Produk Cypress 4").should("be.visible");
  });

  // ================================================================
  // F04 - MENAMBAHKAN PRODUK KE KERANJANG
  // ================================================================

  it("TC-18 - Konsumen menambahkan produk dari katalog ke keranjang", () => {
    mockProducts();

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

  it("TC-19 - Keranjang kosong menampilkan pesan", () => {
    visitCustomer("/customer/keranjang", {
      cart: JSON.stringify([]),
    });

    cy.contains("Keranjang Anda Kosong").should("be.visible");
    cy.contains("Mulai Menjelajahi Katalog").should("be.visible");
  });

  it("TC-20 - Kuantitas item keranjang dapat bertambah dan berkurang", () => {
    visitCustomer("/customer/keranjang", {
      cart: JSON.stringify([{ ...product, qty: 1 }]),
    });

    cy.contains("Sofa Minimalis Cypress")
      .closest("tr")
      .find("button")
      .eq(1)
      .click();

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("cart"))[0].qty)
        .to.equal(2);
    });

    cy.contains("Sofa Minimalis Cypress")
      .closest("tr")
      .find("button")
      .first()
      .click();

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("cart"))[0].qty)
        .to.equal(1);
    });
  });

  it("TC-21 - Kuantitas keranjang tidak turun di bawah satu", () => {
    visitCustomer("/customer/keranjang", {
      cart: JSON.stringify([{ ...product, qty: 1 }]),
    });

    cy.contains("Sofa Minimalis Cypress")
      .closest("tr")
      .find("button")
      .first()
      .click();

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("cart"))[0].qty)
        .to.equal(1);
    });
  });

  it("TC-22 - Produk dapat dihapus dari keranjang", () => {
    visitCustomer("/customer/keranjang", {
      cart: JSON.stringify([{ ...product, qty: 1 }]),
    });

    cy.contains("Sofa Minimalis Cypress")
      .closest("tr")
      .find("button")
      .last()
      .click();

    cy.contains("Keranjang Anda Kosong").should("be.visible");

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("cart"))).to.deep.equal([]);
    });
  });

  // ================================================================
  // F05/F06 - PEMESANAN DAN DATA PELANGGAN
  // ================================================================

  it("TC-23 - Data profil konsumen dimuat dari API", () => {
    cy.intercept("GET", "**/api/auth/user", {
      statusCode: 200,
      body: {
        id: 7,
        name: "Pelanggan Cypress",
        email: "pelanggan@example.com",
        phone: "081234567890",
        address: "Jl. Contoh No. 10",
      },
    }).as("profile");

    visitCustomer("/customer/profil");

    cy.wait("@profile");

    cy.contains("Pelanggan Cypress").should("be.visible");

    cy.get('input[placeholder="Masukkan nama lengkap Anda"]')
      .should("have.value", "Pelanggan Cypress");

    cy.get('input[placeholder="Contoh: 081234567890"]')
      .should("have.value", "081234567890");
  });

  it("TC-24 - Perubahan profil dikirim ke API dan disimpan di browser", () => {
    const oldProfile = {
      id: 7,
      name: "Pelanggan Cypress",
      email: "pelanggan@example.com",
      phone: "081234567890",
      address: "Jl. Lama No. 1",
    };

    const newProfile = {
      ...oldProfile,
      name: "Pelanggan Cypress Diubah",
      phone: "081111111111",
      address: "Jl. Baru No. 22",
    };

    cy.intercept("GET", "**/api/auth/user", {
      statusCode: 200,
      body: oldProfile,
    }).as("profileLoad");

    cy.intercept("POST", "**/api/auth/user/profile", {
      statusCode: 200,
      body: { user: newProfile },
    }).as("profileSave");

    cy.on("window:alert", (message) => {
      expect(message).to.include("Profil dan Foto Berhasil Diperbarui");
    });

    visitCustomer("/customer/profil");

    cy.wait("@profileLoad");

    cy.get('input[placeholder="Masukkan nama lengkap Anda"]')
      .clear()
      .type(newProfile.name);

    cy.get('input[placeholder="Contoh: 081234567890"]')
      .clear()
      .type(newProfile.phone);

    cy.get('textarea[placeholder^="Tulis alamat pengiriman lengkap"]')
      .clear()
      .type(newProfile.address);

    cy.contains("button", "Simpan Perubahan").click();

    cy.wait("@profileSave")
      .its("response.statusCode")
      .should("eq", 200);

    cy.window().then((win) => {
      const saved = JSON.parse(win.localStorage.getItem("customerProfile"));

      expect(saved.name).to.equal(newProfile.name);
      expect(saved.phone).to.equal(newProfile.phone);
      expect(saved.address).to.equal(newProfile.address);
    });
  });

  it("TC-25 - Checkout menolak pesanan jika alamat kosong", () => {
    cy.on("window:alert", (message) => {
      expect(message).to.include("Silakan tentukan alamat pengiriman");
    });

    visitCustomer("/customer/checkout", {
      cart: JSON.stringify([{ ...product, qty: 1 }]),
      orders: JSON.stringify([]),
    });

    cy.get('textarea[placeholder^="Tuliskan alamat lengkap"]')
      .clear();

    cy.contains("button", /Amankan.*Selesaikan Pesanan/i).click();

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("orders") || "[]"))
        .to.have.length(0);

      expect(JSON.parse(win.localStorage.getItem("cart")))
        .to.have.length(1);
    });
  });

  it("TC-26 - Checkout berhasil menghitung total dan mengosongkan keranjang", () => {
    cy.on("window:alert", (message) => {
      expect(message).to.include("Pesanan Berhasil Diamankan");
    });

    visitCustomer("/customer/checkout", {
      cart: JSON.stringify([{ ...product, qty: 2 }]),
      orders: JSON.stringify([]),
    });

    cy.get('textarea[placeholder^="Tuliskan alamat lengkap"]')
      .clear()
      .type("Jl. Pengujian No. 10, Pekanbaru");

    cy.contains("button", /Amankan.*Selesaikan Pesanan/i).click();

    cy.url().should("include", "/customer/pesanan");

    cy.window().then((win) => {
      const orders = JSON.parse(win.localStorage.getItem("orders"));

      expect(orders).to.have.length(1);
      expect(orders[0].alamat).to.equal("Jl. Pengujian No. 10, Pekanbaru");
      expect(orders[0].total).to.equal(5000000);
      expect(orders[0].metodeBayar).to.equal("transfer");
      expect(win.localStorage.getItem("cart")).to.be.null;
    });
  });

  it("TC-27 - Checkout menyimpan metode pembayaran COD", () => {
    cy.on("window:alert", (message) => {
      expect(message).to.include("COD Premium Anda berhasil dijadwalkan");
    });

    visitCustomer("/customer/checkout", {
      cart: JSON.stringify([{ ...product, qty: 1 }]),
      orders: JSON.stringify([]),
    });

    cy.get('textarea[placeholder^="Tuliskan alamat lengkap"]')
      .clear()
      .type("Jl. COD No. 5");

    cy.contains("label", /Cash On Delivery \(Premium COD\)/i).click();

    cy.contains("button", /Amankan.*Selesaikan Pesanan/i).click();

    cy.window().then((win) => {
      const orders = JSON.parse(win.localStorage.getItem("orders"));

      expect(orders[0].metodeBayar).to.equal("cod");
    });
  });

  // Pengujian stok berikut diharapkan gagal sampai validasi stok dibuat.
  it("TC-28 - Checkout harus menolak produk dengan stok nol", () => {
    visitCustomer("/customer/checkout", {
      cart: JSON.stringify([{ ...product, stock: 0, qty: 1 }]),
      orders: JSON.stringify([]),
    });

    cy.on("window:alert", () => {});

    cy.get('textarea[placeholder^="Tuliskan alamat lengkap"]')
      .clear()
      .type("Jl. Uji Stok No. 1");

    cy.contains("button", /Amankan.*Selesaikan Pesanan/i).click();

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("orders") || "[]"))
        .to.have.length(0);

      expect(JSON.parse(win.localStorage.getItem("cart") || "[]"))
        .to.have.length(1);
    });
  });

  // ================================================================
  // A09 - RIWAYAT PESANAN DAN INVOICE
  // ================================================================

  it("TC-29 - Riwayat pesanan menampilkan transaksi", () => {
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

  it("TC-30 - Riwayat pesanan kosong menampilkan pesan", () => {
    visitCustomer("/customer/pesanan", {
      orders: JSON.stringify([]),
    });

    cy.contains("Belum Ada Transaksi").should("be.visible");
  });

  it("TC-31 - Detail invoice transfer dapat dibuka dan ditutup", () => {
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

  // Saat ini komponen riwayat hanya menampilkan invoice, bukan tombol konfirmasi.
  // Test ini dipakai untuk memeriksa kebutuhan fitur konfirmasi pembayaran.
  it("TC-32 - Konsumen dapat mengonfirmasi pembayaran transfer", () => {
    const orders = [
      {
        id: "92222",
        tanggal: "26/10/2026",
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

    cy.contains("button", /konfirmasi pembayaran/i).should("be.visible");
  });

  // ================================================================
  // F08 - CRUD PRODUK ADMIN
  // ================================================================

  it("TC-33 - Admin melihat katalog dan daftar produk", () => {
    mockProducts([product], "adminProducts");

    visitAdmin("/katalogproduk");

    cy.wait("@adminProducts");

    cy.contains("Katalog Produk").should("be.visible");
    cy.contains("Sofa Minimalis Cypress").should("be.visible");
    cy.contains("Tambah Produk").should("be.visible");
    cy.contains("Rp 2.500.000").should("be.visible");
  });

  it("TC-34 - Admin menambahkan produk baru", () => {
    const created = {
      ...product,
      id_product: 702,
      product_name: "Produk Baru Cypress",
      price: 1500000,
      stock: 12,
    };

    cy.intercept("GET", "**/api/products*", {
      statusCode: 200,
      body: [product],
    }).as("getProducts");

    cy.intercept("POST", "**/api/products", {
      statusCode: 201,
      body: created,
    }).as("createProduct");

    visitAdmin("/katalogproduk");

    cy.wait("@getProducts");

    cy.contains("button", /Tambah Produk/i).click();
    cy.contains("Tambah Produk Baru").should("be.visible");

    cy.get('input[placeholder="contoh: Sofa Premium"]')
      .type("Produk Baru Cypress");

    cy.get("select").last().select("1");

    cy.get('input[placeholder="contoh: 5000000"]').type("1500000");
    cy.get('input[placeholder="contoh: 10"]').type("12");

    cy.get('textarea[placeholder^="Tambahkan deskripsi singkat"]')
      .type("Produk untuk pengujian");

    cy.contains("button", "Simpan").click();

    cy.wait("@createProduct")
      .its("response.statusCode")
      .should("eq", 201);

    cy.contains("Produk Baru Cypress").should("be.visible");
  });

  it("TC-35 - Admin memperbarui nama dan harga produk", () => {
    const original = {
      ...product,
      id_product: 711,
      product_name: "Produk Edit Cypress",
    };

    const updated = {
      ...original,
      product_name: "Produk Edit Cypress Diubah",
      price: 1750000,
    };

    cy.intercept("GET", "**/api/products*", {
      statusCode: 200,
      body: [original],
    }).as("getProductEdit");

    // Komponen menggunakan POST dengan _method=PUT untuk update multipart.
    cy.intercept("POST", "**/api/products/711", {
      statusCode: 200,
      body: updated,
    }).as("updateProduct");

    visitAdmin("/katalogproduk");

    cy.wait("@getProductEdit");

    cy.contains("Produk Edit Cypress").click();
    cy.contains("button", /Edit/).click();

    cy.get('input[placeholder="contoh: Sofa Premium"]')
      .clear()
      .type(updated.product_name);

    cy.get('input[placeholder="contoh: 5000000"]')
      .clear()
      .type("1750000");

    cy.contains("button", "Simpan Perubahan").click();

    cy.wait("@updateProduct")
      .its("response.statusCode")
      .should("eq", 200);

    cy.contains("Produk Edit Cypress Diubah").should("be.visible");
  });

  it("TC-36 - Admin menghapus produk setelah konfirmasi", () => {
    const toDelete = {
      ...product,
      id_product: 721,
      product_name: "Produk Hapus Cypress",
    };

    cy.intercept("GET", "**/api/products*", {
      statusCode: 200,
      body: [toDelete],
    }).as("getProductDelete");

    cy.intercept("DELETE", "**/api/products/721", {
      statusCode: 200,
      body: { message: "Produk dihapus" },
    }).as("deleteProduct");

    cy.on("window:confirm", () => true);

    visitAdmin("/katalogproduk");

    cy.wait("@getProductDelete");

    cy.contains("Produk Hapus Cypress").click();
    cy.contains("button", /Hapus/).click();

    cy.wait("@deleteProduct")
      .its("response.statusCode")
      .should("eq", 200);

    cy.contains("Produk Hapus Cypress").should("not.exist");
  });

  it("TC-37 - Form produk menolak penyimpanan jika field wajib kosong", () => {
    cy.intercept("GET", "**/api/products*", {
      statusCode: 200,
      body: [],
    }).as("emptyProductList");

    cy.intercept("POST", "**/api/products").as("emptyProductPost");

    cy.on("window:alert", (message) => {
      expect(message).to.include("Harap lengkapi semua field");
    });

    visitAdmin("/katalogproduk");

    cy.wait("@emptyProductList");

    cy.contains("button", /Tambah Produk/i).click();
    cy.contains("button", "Simpan").click();

    cy.get("@emptyProductPost.all").should("have.length", 0);
  });

  it("TC-38 - Admin mencari produk berdasarkan nama atau SKU", () => {
    const products = [
      {
        ...product,
        id_product: 901,
        product_name: "Sofa Filter Cypress",
      },
      {
        ...product,
        id_product: 902,
        product_name: "Kursi Filter Cypress",
      },
    ];

    mockProducts(products, "adminSearchProducts");

    visitAdmin("/katalogproduk");

    cy.wait("@adminSearchProducts");

    cy.get('input[placeholder="Cari produk atau SKU..."]')
      .type("PRD-902");

    cy.contains("Kursi Filter Cypress").should("be.visible");
    cy.contains("Sofa Filter Cypress").should("not.exist");
  });

  // ================================================================
  // F09/F10 - ADMIN MENGELOLA PESANAN
  // ================================================================

  it("TC-39 - Admin melihat pesanan masuk beserta nama pelanggan", () => {
    const orders = [
      {
        id: "54321",
        tanggal: "26/10/2026",
        customer: "Pelanggan Uji F11",
        items: [{ nama: "Sofa Minimalis Cypress", qty: 1 }],
        total: 2500000,
        metodeBayar: "transfer",
        status: "Diproses",
      },
    ];

    visitAdmin("/pesananmasuk", {
      orders: JSON.stringify(orders),
    });

    cy.contains("Total Pesanan Masuk").should("be.visible");
    cy.contains("#TRX-54321").should("be.visible");
    cy.contains("Pelanggan Uji F11").should("be.visible");
    cy.contains("Sofa Minimalis Cypress").should("be.visible");
    cy.contains("Rp 2.500.000").should("be.visible");
  });

  it("TC-40 - Admin memperbarui status pesanan menjadi Selesai", () => {
    const orders = [
      {
        id: "54321",
        tanggal: "26/10/2026",
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

    cy.contains("tr", "#TRX-54321")
      .contains("button", "Selesai")
      .click();

    cy.window().then((win) => {
      expect(JSON.parse(win.localStorage.getItem("orders"))[0].status)
        .to.equal("Selesai");
    });

    cy.contains("tr", "#TRX-54321")
      .contains("Selesai")
      .should("be.visible");
  });

  // ================================================================
  // F11 - MELIHAT DATA PELANGGAN YANG MELAKUKAN PEMESANAN
  // ================================================================

  it("TC-41 - Identitas pelanggan yang membuat pesanan terlihat oleh admin", () => {
    const orders = [
      {
        id: "61111",
        tanggal: "26/10/2026",
        customer: "Nama Pelanggan F11",
        items: [{ nama: "Meja Cypress", qty: 2 }],
        total: 1700000,
        metodeBayar: "cod",
        status: "Diproses",
      },
    ];

    visitAdmin("/pesananmasuk", {
      orders: JSON.stringify(orders),
    });

    cy.contains("Nama Pelanggan F11").should("be.visible");
    cy.contains("#TRX-61111").should("be.visible");
  });

  // ================================================================
  // F12 - PEMILIK MELIHAT LAPORAN PENJUALAN
  // ================================================================

  it("TC-42 - Owner melihat laporan penjualan dan rincian produk", () => {
    cy.intercept("GET", "http://localhost:8000/api/owner/finance", {
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
    }).as("ownerFinance");

    cy.visit("/ownerLaporanKeuangan");

    cy.wait("@ownerFinance");

    cy.contains("Analisis Laba Rugi").should("be.visible");
    cy.contains("Total Omset Penjualan (Kotor)").should("be.visible");
    cy.contains("Sofa Minimalis Cypress").should("be.visible");
    cy.contains("10.000.000").should("be.visible");
  });

  it("TC-43 - Laporan owner menampilkan pesan bila API gagal", () => {
    cy.intercept("GET", "http://localhost:8000/api/owner/finance", {
      statusCode: 500,
      body: { message: "Server error" },
    }).as("financeError");

    cy.visit("/ownerLaporanKeuangan");

    cy.wait("@financeError");

    cy.contains(/Gagal memuat data/i).should("be.visible");
  });

  // ================================================================
  // F13 - PEMILIK MENGELOLA HARGA PRODUK
  // ================================================================

  // Route/komponen owner saat ini belum menyediakan pengelolaan harga.
  // Test ini akan gagal sampai fungsi tersebut diimplementasikan.
  it("TC-44 - Owner memiliki menu untuk mengelola harga produk", () => {
    cy.intercept("GET", "http://localhost:8000/api/owner/dashboard", {
      statusCode: 200,
      body: {
        stats: {
          total_pendapatan: 0,
          total_produk: 1,
          pesanan_masuk: 0,
          pembayaran_terverifikasi: 0,
        },
        orders: [],
        payments: [],
      },
    }).as("ownerDashboard");

    cy.visit("/owner");

    cy.wait("@ownerDashboard");

    cy.contains("a", /kelola harga produk/i).should("be.visible");
  });

  // ================================================================
  // F14 - PEMILIK MEMONITOR AKTIVITAS TRANSAKSI
  // ================================================================

  it("TC-45 - Dashboard owner menampilkan transaksi terbaru dan log pembayaran", () => {
    cy.intercept("GET", "http://localhost:8000/api/owner/dashboard", {
      statusCode: 200,
      body: {
        stats: {
          total_pendapatan: 5000000,
          total_produk: 8,
          pesanan_masuk: 2,
          pembayaran_terverifikasi: 1,
        },
        orders: [
          {
            id: 992,
            shipping_address: "Jl. Aktivitas No. 8",
            total_price: 2500000,
            status: "pending",
          },
        ],
        payments: [
          {
            sender_name: "Pelanggan Cypress",
            bank_name: "Mandiri",
            payment_status: "verified",
          },
        ],
      },
    }).as("ownerActivity");

    cy.visit("/owner");

    cy.wait("@ownerActivity");

    cy.contains("Dashboard Owner").should("be.visible");
    cy.contains("Pesanan Terbaru").should("be.visible");
    cy.contains("ORDER #992").should("be.visible");
    cy.contains("Jl. Aktivitas No. 8").should("be.visible");
    cy.contains("Log Pembayaran").should("be.visible");
    cy.contains("Pelanggan Cypress").should("be.visible");
    cy.contains("Mandiri").should("be.visible");
  });

  // ================================================================
  // STOK GUDANG
  // ================================================================

  it("TC-46 - Owner melihat stok produk dan indikator stok rendah", () => {
    cy.intercept("GET", "http://localhost:8000/api/owner/stock", {
      statusCode: 200,
      body: [
        {
          ...product,
          id_product: 801,
          product_name: "Stok Aman Cypress",
          stock: 12,
        },
        {
          ...product,
          id_product: 802,
          product_name: "Stok Rendah Cypress",
          stock: 4,
        },
      ],
    }).as("ownerStock");

    cy.visit("/ownerStockGudang");

    cy.wait("@ownerStock");

    cy.contains("Manajemen Stok Gudang").should("be.visible");
    cy.contains("Stok Aman Cypress").should("be.visible");
    cy.contains("Stok Rendah Cypress").should("be.visible");
    cy.contains("● Hampir Habis").should("be.visible");
    cy.contains("● Tersedia").should("be.visible");
  });

  // ================================================================
  // NF13 - PEMBATASAN HAK AKSES ANTARPERAN
  // ================================================================

  it("TC-47 - Konsumen tidak dapat membuka katalog admin", () => {
    visitCustomer("/katalogproduk");

    cy.url().should("include", "/customer");
  });

  it("TC-48 - Admin yang membuka route customer dialihkan ke dashboard admin", () => {
    visitAdmin("/customer/produk");

    cy.url().should("include", "/dashboard");
  });

  // Route owner pada App.jsx saat ini belum menggunakan route guard.
  // Test ini akan gagal sampai pembatasan akses owner diterapkan.
  it("TC-49 - Pengguna tanpa sesi tidak boleh membuka laporan owner", () => {
    cy.intercept("GET", "http://localhost:8000/api/owner/finance", {
      statusCode: 200,
      body: {
        total_pendapatan: 0,
        order_details: [],
      },
    }).as("financeNoSession");

    cy.visit("/ownerLaporanKeuangan");

    cy.url().should("include", "/login");
  });

  // ================================================================
  // NF15 - RESPONSIVITAS
  // ================================================================

  it("TC-50 - Katalog dapat digunakan pada viewport ponsel tanpa overflow horizontal", () => {
    cy.viewport(375, 812);

    mockProducts();

    visitCustomer("/customer/produk");

    cy.wait("@products");

    cy.contains("Katalog").should("be.visible");

    cy.document().then((doc) => {
      expect(doc.documentElement.scrollWidth)
        .to.be.at.most(doc.documentElement.clientWidth);
    });
  });

  // ================================================================
  // NF04 - WAKTU PEMUATAN
  // ================================================================

  it("TC-51 - Dokumen login selesai dimuat kurang dari 3 detik", () => {
    cy.visit("/login");

    cy.window().then((win) => {
      const navigation = win.performance.getEntriesByType("navigation")[0];

      expect(navigation, "navigation timing tersedia").to.exist;

      expect(navigation.domContentLoadedEventEnd)
        .to.be.lessThan(3000);
    });
  });

  // ================================================================
  // NF06 - KOMPATIBILITAS BROWSER
  // ================================================================

  // Test ini berjalan pada browser yang dipilih di Cypress Runner.
  // Untuk menilai browser lain, jalankan ulang spec menggunakan --browser firefox.
  it("TC-52 - Halaman login dan field utama berfungsi pada browser aktif", () => {
    cy.visit("/login");

    cy.get('input[type="email"]')
      .should("be.visible")
      .and("be.enabled");

    cy.get('input[type="password"]')
      .should("be.visible")
      .and("be.enabled");

    cy.get('button[type="submit"]')
      .should("be.visible")
      .and("be.enabled");
  });
});
