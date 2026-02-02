/**
 * KALENDER JAWA MODERN - VERSI FINAL FIX 2026
 */

// 1. DAFTAR TOKEN (Edit di sini jika ingin menambah token baru)
const DAFTAR_TOKEN_AKTIF = {
    "TIUS2026": "2026-12-31", 
    "VIP-MEMBER": "9999-12-31", 
    "COBA": "2026-02-10"        
};

// 2. KONSTANTA DATA
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan.',
    'PAHING': 'Selalu ingin memiliki, suka menolong, mandiri.',
    'PON': 'Bicaranya banyak diterima orang, suka di rumah.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut.'
};

const DATA_SIFAT_HARI = {
    'Minggu': 'Tekun dan berwibawa.', 'Senin': 'Selalu berubah, indah.',
    'Selasa': 'Pemarah, luas pergaulan.', 'Rabu': 'Pendiam dan penyabar.',
    'Kamis': 'Sangar menakutkan.', 'Jumat': 'Energik.', 'Sabtu': 'Susah ditebak.'
};

const NASIB_AHLI_WARIS = { 1: {nama:"Gunung", arti:"Mulia"}, 2: {nama:"Guntur", arti:"Sulit"}, 3: {nama:"Segoro", arti:"Mudah rejeki"}, 0: {nama:"Asat", arti:"Seret rejeki"} };
const PEMBAGI_5 = { 1: {nama:"Sri", arti:"Makmur"}, 2: {nama:"Lungguh", arti:"Pangkat"}, 3: {nama:"Gendhong", arti:"Mapan"}, 4: {nama:"Loro", arti:"Sakit"}, 0: {nama:"Pati", arti:"Hambatan"} };

const WINDU_LIST = ["Kuntara", "Sangara", "Sancaya", "Adi"];
let current = new Date();
const TODAY = new Date();

// 3. LOGIKA TOKEN
function checkTokenLogic(token) {
    if (!token) return false;
    const expiryDateStr = DAFTAR_TOKEN_AKTIF[token.toUpperCase()];
    if (!expiryDateStr) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiryDate = new Date(expiryDateStr);
    return today <= expiryDate;
}

function showTokenModal() {
    const userInput = prompt("Masukkan Token Akses untuk melihat detail:");
    if (!userInput) return;
    const tokenInput = userInput.trim().toUpperCase();

    if (checkTokenLogic(tokenInput)) {
        localStorage.setItem('kalender_token_tius', tokenInput);
        alert("Token Berhasil! Silakan klik tanggal kembali.");
        location.reload();
    } else {
        alert("Token SALAH atau EXPIRED!");
    }
}

// 4. FUNGSI KALENDER
function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    mNav.innerText = `${namaBulan[m]} ${y}`;

    // Header Hari
    HARI.forEach((h, i) => {
        const el = document.createElement('div');
        el.innerText = h.substring(0, 3);
        el.className = 'header-day' + (i === 0 ? ' sunday-red' : '');
        grid.appendChild(el);
    });

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= daysInMonth; d++) {
        const dateObj = new Date(y, m, d);
        const p = getPasaran(dateObj);
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        
        if (dateObj.getDay() === 0) cell.classList.add('sunday-red');
        if (dateObj.toDateString() === TODAY.toDateString()) cell.classList.add('today-highlight');
        
        cell.innerHTML = `<div class="date-num">${d}</div><div class="pasaran-text">${p}</div>`;
        
        cell.onclick = () => {
            const savedToken = localStorage.getItem('kalender_token_tius');
            if (checkTokenLogic(savedToken)) {
                document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('selected-day'));
                cell.classList.add('selected-day');
                updateDetail(dateObj, p);
            } else {
                showTokenModal();
            }
        };
        grid.appendChild(cell);
    }
}

// 5. FUNGSI PEMBANTU (Wuku, Pasaran, dll)
function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getWuku(date) {
    const wukuList = ["Sinta", "Landep", "Wukir", "Kurantil", "Tolu", "Gumbreg", "Warigalit", "Wariagung", "Julungwangi", "Sungsang", "Galungan", "Kuningan", "Langkir", "Mandasiya", "Julungpujut", "Pahang", "Kuruwelut", "Marakeh", "Tambir", "Medangkungan", "Maktal", "Wuye", "Manahil", "Prangbakat", "Bala", "Wugu", "Wayang", "Kulawu", "Dukut", "Watugunung"];
    const refDate = new Date(2026, 0, 25); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let wukuIndex = (20 + Math.floor(diffDays / 7)) % 30;
    while (wukuIndex < 0) wukuIndex += 30;
    return wukuList[wukuIndex];
}

function getTanggalJawa(date) {
    const refDate = new Date(2026, 0, 28); 
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let tglJawa = 9 + diffDays;
    while (tglJawa > 30) tglJawa -= 30;
    while (tglJawa <= 0) tglJawa += 30;
    return { tanggal: tglJawa, tahun: 1959, bulan: {nama: "Rejeb", naas: [2, 11, 13], taliWangke: "Rabu Pahing", status: "Baik"} };
}

// 6. UPDATE DETAIL (Disederhanakan agar tidak error)
function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;

    const h = HARI[date.getDay()];
    const nHari = NEPTU_HARI[h];
    const nPasaran = NEPTU_PASARAN[pasaran];
    const neptu = nHari + nPasaran;
    const infoJawa = getTanggalJawa(date);

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" class="card-result" style="background:#fff; padding:20px; border-radius:12px; border:1px solid #ddd;">
            <h2 style="color:#D30000;">${h} ${pasaran}</h2>
            <p><b>Neptu:</b> ${neptu} (${nHari} + ${nPasaran})</p>
            <p><b>Wuku:</b> ${getWuku(date)}</p>
            <p><b>Tanggal Jawa:</b> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun}</p>
            <hr>
            <p><i>Sifat Hari: ${DATA_SIFAT_HARI[h]}</i></p>
            <p><i>Sifat Pasaran: ${DATA_SIFAT_PASARAN[pasaran.toUpperCase()]}</i></p>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// 7. INISIALISASI
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    
    // Tombol Navigasi
    document.getElementById('prevMonth').onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    document.getElementById('nextMonth').onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});
