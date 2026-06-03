document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. INISIALISASI DATA AWAL (DUMMY DATABASE)
  // ==========================================

  // Beri saldo awal Rp1.500.000 jika belum ada
  if (!localStorage.getItem("saldo_uangku")) {
    localStorage.setItem("saldo_uangku", 1500000);
  }

  // Buat riwayat kosong jika belum ada (Beri 2 data dummy awal)
  if (!localStorage.getItem("riwayat_transaksi")) {
    const dataAwal = [
      {
        jenis: "pengeluaran",
        nominal: 15000,
        kategori: "Nongkrong",
        catatan: "Kopi Susu",
        tanggal: "2026-05-08",
        emoji: "☕",
      },
      {
        jenis: "pengeluaran",
        nominal: 30000,
        kategori: "Makanan",
        catatan: "Sushi",
        tanggal: "2026-05-09",
        emoji: "🍣",
      },
    ];
    localStorage.setItem("riwayat_transaksi", JSON.stringify(dataAwal));
  }

  // Fungsi bantuan untuk memformat angka jadi Rupiah (contoh: 15000 -> Rp15.000)
  function formatRp(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
  }

  // ==========================================
  // 2. LOGIKA TAMPILAN BERANDA (index.html)
  // ==========================================
  const saldoElement = document.getElementById("saldo-utama");

  if (saldoElement) {
    let currentSaldo = parseInt(localStorage.getItem("saldo_uangku"));
    saldoElement.textContent = formatRp(currentSaldo);

    let riwayat = JSON.parse(localStorage.getItem("riwayat_transaksi")) || [];

    let totalPemasukan = 0;
    let totalPengeluaran = 0;
    let pengeluaranHariIni = 0;

    // Ambil tanggal transaksi terakhir (yang paling baru) untuk "Budget Hari Ini"
    let tanggalTerakhir =
      riwayat.length > 0
        ? riwayat[riwayat.length - 1].tanggal
        : new Date().toISOString().split("T")[0];

    // Hitung semua riwayat transaksi
    riwayat.forEach((trx) => {
      if (trx.jenis === "pemasukan") {
        totalPemasukan += trx.nominal;
      } else if (trx.jenis === "pengeluaran") {
        totalPengeluaran += trx.nominal;
        // Hitung pengeluaran khusus di hari ini saja
        if (trx.tanggal === tanggalTerakhir) {
          pengeluaranHariIni += trx.nominal;
        }
      }
    });

    // A. Update UI Ringkasan Bulan Ini
    let elPemasukan = document.getElementById("total-pemasukan");
    let elPengeluaran = document.getElementById("total-pengeluaran");
    if (elPemasukan) elPemasukan.textContent = formatRp(totalPemasukan);
    if (elPengeluaran) elPengeluaran.textContent = formatRp(totalPengeluaran);

    // B. Update UI Budget Harian (Asumsi limit harian Rp70.000)
    let limitHarian = 70000;
    let persenBudget = Math.min(
      Math.round((pengeluaranHariIni / limitHarian) * 100),
      100,
    );

    let elTeksBudget = document.getElementById("teks-budget");
    let elPersenBudget = document.getElementById("persen-budget");
    let barBudget = document.getElementById("bar-budget");

    if (elTeksBudget && elPersenBudget && barBudget) {
      elTeksBudget.innerHTML = `${formatRp(pengeluaranHariIni)} <span class="text-slate-400 font-medium">/ ${formatRp(limitHarian)}</span>`;
      elPersenBudget.textContent = persenBudget + "%";
      barBudget.style.width = persenBudget + "%";

      // Ubah warna bar jadi merah kalau pengeluaran sudah mepet batas (>= 90%)
      if (persenBudget >= 90) {
        barBudget.classList.remove("bg-[#4CAF50]");
        barBudget.classList.add("bg-red-500");
      }
    }

    // C. Update UI Transaksi Terbaru (Maksimal 2 item teratas di Beranda)
    const containerTransaksi = document.getElementById("container-transaksi");
    if (containerTransaksi) {
      containerTransaksi.innerHTML = ""; // Bersihkan kontainer

      // Balik urutan riwayat (yang terbaru di atas), lalu ambil 2 saja
      let riwayatTerbaru = [...riwayat].reverse().slice(0, 2);

      riwayatTerbaru.forEach((trx) => {
        let warnaTeks =
          trx.jenis === "pemasukan" ? "text-[#4CAF50]" : "text-red-500";
        let simbol = trx.jenis === "pemasukan" ? "+" : "-";
        let warnaBgIcon =
          trx.jenis === "pemasukan"
            ? "bg-green-100"
            : trx.kategori === "Transportasi"
              ? "bg-blue-50"
              : "bg-yellow-100";
        let teksCatatan = trx.catatan ? trx.catatan : trx.kategori;

        let htmlItem = `
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full ${warnaBgIcon} flex items-center justify-center text-lg shadow-sm border border-slate-50">${trx.emoji}</div>
                            <div>
                                <h4 class="text-xs font-bold text-slate-800">${teksCatatan}</h4>
                                <p class="text-[10px] text-slate-400">${trx.kategori}</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <span class="text-xs font-bold ${warnaTeks} block">${simbol}${formatRp(trx.nominal)}</span>
                            <span class="text-[9px] text-slate-400">${trx.tanggal}</span>
                        </div>
                    </div>
                `;
        containerTransaksi.insertAdjacentHTML("beforeend", htmlItem);
      });
    }
  }

  // ==========================================
  // 3. LOGIKA FORM TAMBAH & KATEGORI
  // ==========================================
  const categoryItems = document.querySelectorAll(".category-item");
  let kategoriTerpilih = "Lainnya";
  let emojiTerpilih = "📝";

  // Efek Klik Kategori agar bisa berpindah-pindah
  if (categoryItems.length > 0) {
    // Secara default, ambil data dari item pertama (misal: Makanan)
    let firstItem = categoryItems[0];
    kategoriTerpilih = firstItem.getAttribute("data-kategori");
    emojiTerpilih = firstItem.querySelector(".icon-box").textContent;

    categoryItems.forEach((item) => {
      item.addEventListener("click", function () {
        // Reset semua desain kategori ke abu-abu
        categoryItems.forEach((el) => {
          let box = el.querySelector(".icon-box");
          let txt = el.querySelector(".category-text");
          box.classList.remove("border-2", "border-[#4CAF50]");
          box.classList.add("border", "border-slate-100");
          txt.classList.remove("text-[#4CAF50]", "font-bold");
          txt.classList.add("text-slate-500", "font-semibold");
        });

        // Aktifkan (hijaukan) hanya kategori yang sedang diklik
        let clickedBox = this.querySelector(".icon-box");
        let clickedTxt = this.querySelector(".category-text");
        clickedBox.classList.remove("border", "border-slate-100");
        clickedBox.classList.add("border-2", "border-[#4CAF50]");
        clickedTxt.classList.remove("text-slate-500", "font-semibold");
        clickedTxt.classList.add("text-[#4CAF50]", "font-bold");

        // Simpan pilihan user ke dalam variabel
        kategoriTerpilih = this.getAttribute("data-kategori");
        emojiTerpilih = clickedBox.textContent;
      });
    });
  }

  // Logika Simpan Transaksi ke Memori (localStorage)
  const btnSimpan = document.querySelector("button");
  const inputNominal = document.getElementById("input-nominal");
  const inputTanggal = document.getElementById("input-tanggal");
  const inputCatatan = document.getElementById("input-catatan");

  // Pastikan tombol yang diklik adalah tombol "Simpan"
  if (btnSimpan && btnSimpan.textContent.trim() === "Simpan") {
    btnSimpan.addEventListener("click", function (e) {
      e.preventDefault();

      if (inputNominal && inputNominal.value !== "") {
        let nominal = parseInt(inputNominal.value);
        // Tentukan jenis transaksi dari judul Halaman HTML
        let jenisTrx = document.title.includes("Pengeluaran")
          ? "pengeluaran"
          : "pemasukan";
        let tanggal = inputTanggal
          ? inputTanggal.value
          : new Date().toISOString().split("T")[0];
        let catatan = inputCatatan ? inputCatatan.value : kategoriTerpilih;

        if (!isNaN(nominal)) {
          // Update Saldo
          let saldoSaatIni = parseInt(localStorage.getItem("saldo_uangku"));
          saldoSaatIni =
            jenisTrx === "pengeluaran"
              ? saldoSaatIni - nominal
              : saldoSaatIni + nominal;
          localStorage.setItem("saldo_uangku", saldoSaatIni);

          // Update Data Riwayat Transaksi
          let riwayat =
            JSON.parse(localStorage.getItem("riwayat_transaksi")) || [];
          riwayat.push({
            jenis: jenisTrx,
            nominal: nominal,
            kategori: kategoriTerpilih,
            catatan: catatan,
            tanggal: tanggal,
            emoji: emojiTerpilih,
          });
          localStorage.setItem("riwayat_transaksi", JSON.stringify(riwayat));

          // Munculkan notifikasi dan pindah ke Beranda
          alert("✅ Transaksi berhasil dicatat dan Beranda telah diperbarui!");
          window.location.href = "/";
        }
      } else {
        alert("Harap masukkan nominal transaksi!");
      }
    });
  }

  // ==========================================
  // 4. LOGIKA TOMBOL (+) FLOATING MUNCULKAN MENU
  // ==========================================
  const fabBtn = document.getElementById("fab-btn");
  const fabMenu = document.getElementById("fab-menu");

  if (fabBtn && fabMenu) {
    // Munculkan / hilangkan menu saat tombol + diklik
    fabBtn.addEventListener("click", function (e) {
      e.preventDefault();
      fabMenu.classList.toggle("hidden");
    });

    // Sembunyikan menu kalau pengguna klik di sembarang area luar tombol
    document.addEventListener("click", function (e) {
      if (!fabBtn.contains(e.target) && !fabMenu.contains(e.target)) {
        fabMenu.classList.add("hidden");
      }
    });
  }
});
