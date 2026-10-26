
const hargaMenu = {
    "Beef Burger": 25000,
    "Ayam Crispy": 20000,
    "Mie Spesial": 18000,
    "Es Teh": 5000
};

const formatRupiah = angka =>
    "Rp" + angka.toLocaleString("id-ID");

let daftarPesanan = [];

function pilihMenu(namaMenu) {
    document.getElementById("menuMakanan").value = namaMenu;
    document.getElementById("pesan").scrollIntoView({
        behavior: "smooth"
    });
}

document.getElementById("orderForm").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const menu = document.getElementById("menuMakanan").value;
        const jumlah = Number(document.getElementById("jumlah").value);
        const pembayaran = document.getElementById("pembayaran").value;

        if (!nama || !hargaMenu[menu] ||
            !Number.isInteger(jumlah) || jumlah < 1 ||
            jumlah > 100 || !pembayaran) {
            alert("Silakan periksa kembali data pesanan.");
            return;
        }

        daftarPesanan.push({
            nama: nama,
            menu: menu,
            jumlah: jumlah,
            pembayaran: pembayaran
        });

        tampilkanPesanan();
        alert("Pesanan berhasil ditambahkan!");

        this.reset();
        document.getElementById("jumlah").value = 1;
    }
);

function tampilkanPesanan() {
    const tabel = document.getElementById("tabelPesanan");
    tabel.innerHTML = "";
    let totalSemua = 0;

    daftarPesanan.forEach((pesanan, index) => {
        const total = hargaMenu[pesanan.menu] * pesanan.jumlah;
        totalSemua += total;

        const baris = document.createElement("tr");
        const data = [
            index + 1,
            pesanan.nama,
            pesanan.menu,
            pesanan.jumlah,
            formatRupiah(total),
            pesanan.pembayaran
        ];

        data.forEach(nilai => {
            const kolom = document.createElement("td");
            kolom.textContent = nilai;
            baris.appendChild(kolom);
        });

        const kolomAksi = document.createElement("td");
        const tombol = document.createElement("button");

        tombol.textContent = "Hapus";
        tombol.type = "button";

        tombol.addEventListener("click", () => {
            daftarPesanan.splice(index, 1);
            tampilkanPesanan();
        });

        kolomAksi.appendChild(tombol);
        baris.appendChild(kolomAksi);
        tabel.appendChild(baris);
    });

    document.getElementById("totalTransaksi").textContent =
        formatRupiah(totalSemua);

    if (daftarPesanan.length === 0) {
        const baris = document.createElement("tr");
        const kolom = document.createElement("td");

        kolom.colSpan = 7;
        kolom.textContent = "Belum ada pesanan.";
        baris.appendChild(kolom);
        tabel.appendChild(baris);
    }
}