/**
 * KALENDER JAWA MODERN - VERSI FINAL FIX 2026 WITH TOKEN SYSTEM
 * Update: Windu Sancaya, Tahun Jawa (Filosofi), & Konzili
 */

// ==========================================
// KONSTANTA & DATA REFERENSI
// ==========================================
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const PASARAN = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
const NEPTU_HARI = { 'Minggu': 5, 'Senin': 4, 'Selasa': 3, 'Rabu': 7, 'Kamis': 8, 'Jumat': 6, 'Sabtu': 9 };
const NEPTU_PASARAN = { 'Pahing': 9, 'Pon': 7, 'Wage': 4, 'Kliwon': 8, 'Legi': 5 };

const DATA_SIFAT_PASARAN = {
    'KLIWON': 'Pandai bicara dan bergaul, periang, ambisius, urakan, kurang bisa membalas budi, setia pada janji, ceroboh memilih makanan, banyak selamat dan doanya.',
    'LEGI': 'Bertanggung jawab, murah hati, enak dalam pergaulan, selalu gembira seperti tidak pernah susah, sering kena fitnah, kuat tidak tidur malam hari, berhati-hati namun sering bingung sendiri, bicaranya berisi. Banyak keberuntungan dan kesialannya.',
    'PAHING': 'Selalu ingin memiliki (barang), kesungguhannya penuh perhitungan untuk mendapatkan untung, suka menolong, mandiri, kuat lapar, banyak musuhnya, kalau tersinggung menakutkan marahnya, suka kebersihan. Sering kena tipu dan kalau kehilangan jarang bisa menemukan kembali.',
    'PON': 'Bicaranya banyak diterima orang, suka tinggal di rumah, tidak mau memakan yang bukan kepunyaannya sendiri, suka marah kepada keluarganya, jalan pikirannya sering berbeda dengan pandangan umum. Suka berbantahan, berani kepada atasan. Rejekinya cukup.',
    'WAGE': 'Menarik tetapi angkuh, setia dan penurut, malas mencari nafkah perlu dibantu orang lain, kaku hati, tidak bisa berpikir panjang, sering gelap pikiran dan mendapat fitnah.'
};

const DATA_SIFAT_HARI = {
    'Minggu': 'Tekun, mandiri dan berwibawa.',
    'Senin': 'Selalu berubah, indah dan selalu mendapatkan simpati.',
    'Selasa': 'Pemarah dan pencemburu serta luas pergaulannya.',
    'Rabu': 'Pendiam, pemomong dan penyabar.',
    'Kamis': 'Sangar menakutkan.',
    'Jumat': 'Energik dan mengagumkan.',
    'Sabtu': 'Membuat orang merasa senang dan susah ditebak.'
};

const NASIB_AHLI_WARIS = { 
    1: { nama: "Gunung", arti: "Kehidupan yang mulia bagi ahli waris." },
    2: { nama: "Guntur", arti: "Ahli waris akan mendapatkan kesulitan." },
    3: { nama: "Segoro", arti: "Kemudahan dalam mencari rezeki." },
    0: { nama: "Asat", arti: "Kesulitan dalam mendapatkan rezeki." }
};

const PEMBAGI_5 = { 
    1: { nama: "Sri", arti: "Murah rezeki dan hidup makmur." },
    2: { nama: "Lungguh", arti: "Mendapatkan kedudukan atau pangkat tinggi." },
    3: { nama: "Gendhong", arti: "Mapan secara lahiriah dan dihargai orang." },
    4: { nama: "Loro", arti: "Sering menghadapi rintangan kesehatan/hidup." },
    0: { nama: "Pati", arti: "Banyak hambatan, perlu kehati-hatian dalam melangkah." }
};

const DATA_BULAN_JAWA = [
    { nama: "Sura", status: "Tidak Baik", naas: [6, 11, 13, 14, 17, 18, 27], taliWangke: "Rabu Pahing" },
    { nama: "Sapar", status: "Tidak Baik", naas: [1, 10, 12, 20, 22], taliWangke: "Kamis Pon" },
    { nama: "Mulud", status: "Tidak Baik", naas: [1, 3, 8, 10, 13, 15, 20, 23], taliWangke: "Jumat Wage" },
    { nama: "Bakdamulud", status: "Baik", naas: [10, 15, 16, 20, 25, 28], taliWangke: "Sabtu Kliwon" },
    { nama: "Jumadilawal", status: "Tidak Baik", naas: [1, 5, 10, 11, 16, 26, 28], taliWangke: "Senin Kliwon" },
    { nama: "Jumadilakir", status: "Kurang Baik", naas: [4, 10, 11, 14, 18, 21], taliWangke: "Selasa Legi" },
    { nama: "Rejeb", status: "Tidak Baik", naas: [2, 11, 12, 13, 14, 18, 22, 27], taliWangke: "Rabu Pahing" },
    { nama: "Ruwah", status: "Baik", naas: [4, 12, 13, 19, 24, 26, 28], taliWangke: "Kamis Pon" },
    { nama: "Pasa", status: "Tidak Baik", naas: [7, 9, 10, 15, 20, 21, 24, 25], taliWangke: "Jumat Wage" },
    { nama: "Syawal", status: "Sangat Tidak Baik", naas: [2, 10, 17, 20, 27], taliWangke: "Sabtu Kliwon" },
    { nama: "Dulkaidah", status: "Cukup Baik", naas: [2, 6, 11, 12, 13, 21, 22, 24, 28], taliWangke: "Senin Kliwon" },
    { nama: "Besar", status: "Sangat Baik", naas: [1, 6, 10, 13, 20, 23, 25], taliWangke: "Selasa Wage" }
];

const DATA_SIKLUS_TAHUN = [
    { nama: "Alip", makna: "Ada-ada (Niat)", deskripsi: "Melambangkan permulaan. Waktunya manusia mulai menanam niat, ide, atau tekad untuk melakukan sesuatu yang baik." },
    { nama: "Ehe", makna: "Tumandang (Bekerja)", deskripsi: "Melambangkan realisasi. Setelah ada niat di tahun Alip, tahun ini adalah waktunya mulai bergerak dan bertindak." },
    { nama: "Jimawal", makna: "Gawe (Pekerjaan)", deskripsi: "Melambangkan proses. Pekerjaan mulai terlihat bentuknya dan menuntut ketekunan untuk menyelesaikannya." },
    { nama: "Je", makna: "Lelakon (Peristiwa/Nasib)", deskripsi: "Melambangkan ujian. Dalam proses bekerja, manusia pasti menemui cobaan atau dinamika hidup sebagai ujian mental." },
    { nama: "Dal", makna: "Urip (Hidup)", deskripsi: "Melambangkan keberadaan. Tahun ini dianggap sakral (Tahun Duda). Waktunya merenungi hakikat hidup dan hubungan dengan Sang Pencipta." },
    { nama: "Be", makna: "Bola-bali (Kembali/Konsisten)", deskripsi: "Melambangkan keteguhan. Mengajarkan manusia untuk tetap konsisten pada kebaikan meskipun sudah melalui berbagai ujian." },
    { nama: "Wawu", makna: "Marang (Arah/Tujuan)", deskripsi: "Melambangkan fokus. Menjelang akhir siklus, manusia diingatkan untuk kembali fokus pada tujuan akhir hidup agar tidak tersesat." },
    { nama: "Jimakir", makna: "Suwung (Kosong/Selesai)", deskripsi: "Melambangkan akhir dan evaluasi. Fase untuk melepaskan keterikatan duniawi dan mengevaluasi apa yang telah dilakukan." }
];

const WINDU_LIST = ["Kuntara", "Sangara", "Sancaya", "Adi"];

let current = new Date();
const TODAY = new Date();

// ==========================================
// FUNGSI LOGIKA DASAR
// ==========================================

function getPasaran(date) {
    const base = new Date(1900, 0, 1);
    const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24));
    return PASARAN[(((diff + 1) % 5) + 5) % 5];
}

function getZodiak(date) {
    const d = date.getDate(); const m = date.getMonth() + 1;
    if ((m == 3 && d >= 21) || (m == 4 && d <= 19)) return "Aries";
    if ((m == 4 && d >= 20) || (m == 5 && d <= 20)) return "Taurus";
    if ((m == 5 && d >= 21) || (m == 6 && d <= 20)) return "Gemini";
    if ((m == 6 && d >= 21) || (m == 7 && d <= 22)) return "Cancer";
    if ((m == 7 && d >= 23) || (m == 8 && d <= 22)) return "Leo";
    if ((m == 8 && d >= 23) || (m == 9 && d <= 22)) return "Virgo";
    if ((m == 9 && d >= 23) || (m == 10 && d <= 22)) return "Libra";
    if ((m == 10 && d >= 23) || (m == 11 && d <= 21)) return "Scorpio";
    if ((m == 11 && d >= 22) || (m == 12 && d <= 21)) return "Sagittarius";
    if ((m == 12 && d >= 22) || (m == 1 && d <= 19)) return "Capricorn";
    if ((m == 1 && d >= 20) || (m == 2 && d <= 18)) return "Aquarius";
    return "Pisces";
}

function getLunarShio(date) {
    const y = date.getFullYear();
    let imlekM, imlekD, shioTahunIni;
    if (typeof DB_IMLEK !== 'undefined' && DB_IMLEK[y]) {
        imlekM = DB_IMLEK[y].m;
        imlekD = DB_IMLEK[y].d;
        shioTahunIni = DB_IMLEK[y].shio;
    } else {
        const shios = ["Monyet", "Ayam", "Anjing", "Babi", "Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing"];
        shioTahunIni = shios[y % 12];
        imlekM = 2; imlekD = 5;
    }
    const tglImlek = new Date(y, imlekM - 1, imlekD);
    const isSudahImlek = date >= tglImlek;
    const diffTime = Math.abs(date - tglImlek);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let lunarDay = isSudahImlek ? (diffDays % 30) + 1 : 30 - (diffDays % 30);
    return {
        full: `${lunarDay} - ${isSudahImlek ? Math.floor(diffDays/30)+1 : 12} - ${y + 551}`,
        shio: isSudahImlek ? shioTahunIni : "Transisi",
        ramalan: "Gunakan energi hari ini dengan bijaksana."
    };
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
    const refTglJawa = 9;
    const refBulanIdx = 7; 
    const refTahunJawa = 1959;
    const diffDays = Math.floor((date.getTime() - refDate.getTime()) / (1000 * 60 * 60 * 24));
    let totalHariJawa = refTglJawa + diffDays;
    let bulanIdx = refBulanIdx;
    let tahunJawa = refTahunJawa;
    let tglJawa = totalHariJawa;
    while (tglJawa > 30) { tglJawa -= 30; bulanIdx = (bulanIdx + 1) % 12; if (bulanIdx === 0) tahunJawa++; }
    while (tglJawa <= 0) { tglJawa += 30; bulanIdx = (bulanIdx - 1 + 12) % 12; if (bulanIdx === 11) tahunJawa--; }
    return { tanggal: tglJawa, bulan: DATA_BULAN_JAWA[bulanIdx], tahun: tahunJawa };
}

function getSiklusBesar(date) {
    const tahunJawa = getTanggalJawa(date).tahun;
    const REF_TAHUN_JAWA = 2576;
    const REF_TAHUN_IDX = 4; // Dal
    const REF_WINDU_IDX = 2; // Sancaya
    const diffYears = tahunJawa - REF_TAHUN_JAWA;
    let tahunIdx = (REF_TAHUN_IDX + diffYears) % 8;
    if (tahunIdx < 0) tahunIdx += 8;
    let winduIdx = (REF_WINDU_IDX + Math.floor(diffYears / 8)) % 4;
    if (winduIdx < 0) winduIdx += 4;
    return { tahun: DATA_SIKLUS_TAHUN[tahunIdx], windu: WINDU_LIST[winduIdx] };
}

function getMangsaInfo(date) {
    const d = date.getDate(); const m = date.getMonth() + 1;
    let id = 12; 
    if ((d >= 22 && m == 6) || (m == 7) || (d <= 1 && m == 8)) id = 1;
    else if (d >= 2 && m == 8 && d <= 25) id = 2;
    else if ((d >= 26 && m == 8) || (d <= 18 && m == 9)) id = 3;
    else if ((d >= 19 && m == 9) || (d <= 13 && m == 10)) id = 4;
    else if ((d >= 14 && m == 10) || (d <= 9 && m == 11)) id = 5;
    else if ((d >= 10 && m == 11) || (d <= 22 && m == 12)) id = 6;
    else if ((d >= 23 && m == 12) || (m == 1) || (d <= 3 && m == 2)) id = 7;
    else if (m == 2 && d >= 4) id = 8;
    else if (m == 3 && d <= 26) id = 9;
    else if ((d >= 27 && m == 3) || (d <= 19 && m == 4)) id = 10;
    else if ((d >= 20 && m == 4) || (d <= 12 && m == 5)) id = 11;
    return (typeof DATA_MANGSA !== 'undefined') ? DATA_MANGSA[id] : {nama: "-", deskripsi: "-"};
}

function getArahMeditasi(neptu) {
    const map = { 7: "Barat", 8: "Utara", 9: "Timur", 10: "Selatan", 11: "Barat", 12: "Utara", 13: "Timur", 14: "Selatan", 15: "Barat", 16: "Utara", 17: "Timur", 18: "Selatan" };
    return map[neptu] || "Pusat";
}

function hitungUsiaLengkap(birthDate) {
    let now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    return `${years} Thn, ${months} Bln, ${days} Hr`;
}

// ==========================================
// RENDER & UI
// ==========================================

function generateCalendar() {
    const grid = document.getElementById('calendar');
    const mNav = document.getElementById('monthYearNav');
    if (!grid) return;
    grid.innerHTML = '';
    const y = current.getFullYear();
    const m = current.getMonth();
    const namaBulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    mNav.innerText = `${namaBulan[m]} ${y}`;

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

function updateDetail(date, pasaran) {
    const detailDiv = document.getElementById('detail');
    if (!detailDiv) return;
    const h = HARI[date.getDay()];
    const wetonKey = `${h} ${pasaran}`;
    const neptu = NEPTU_HARI[h] + NEPTU_PASARAN[pasaran];
    const infoJawa = getTanggalJawa(date);
    const wukuName = getWuku(date);
    const siklusBesar = getSiklusBesar(date);
    const mangsa = getMangsaInfo(date);
    const zodiak = getZodiak(date);
    const lunar = getLunarShio(date);
    const nasibKematian = NASIB_AHLI_WARIS[neptu % 4];
    const nasib5 = PEMBAGI_5[neptu % 5];
    const usia = hitungUsiaLengkap(date);

    detailDiv.style.display = 'block';
    detailDiv.innerHTML = `
        <div id="printableArea" style="background:white; padding:15px; border-radius:10px; border:1px solid #ddd;">
            <h2 style="color:red; border-bottom:2px solid red;">${wetonKey} (Neptu ${neptu})</h2>
            <p><b>Masehi:</b> ${date.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
            <p><b>Jawa:</b> ${infoJawa.tanggal} ${infoJawa.bulan.nama} ${infoJawa.tahun} AJ</p>
            <p><b>Wuku:</b> ${wukuName} | <b>Zodiak:</b> ${zodiak}</p>
            <p><b>Tahun:</b> ${siklusBesar.tahun.nama} | <b>Windu:</b> ${siklusBesar.windu}</p>
            <hr>
            <p><b>Nasib:</b> ${nasib5.nama} (${nasib5.arti})</p>
            <p><b>Usia Saat Ini:</b> ${usia}</p>
            <button onclick="shareWhatsApp()" style="background:#25D366; color:white; border:none; padding:10px; width:100%; border-radius:5px; font-weight:bold; cursor:pointer;">Bagikan ke WhatsApp</button>
        </div>
    `;
    detailDiv.scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// TOKEN LOGIC TIUS
// ==========================================
const SECRET_KEY = "TIUS_2026_MANTRA";

function checkTokenLogic(token) {
    if (!token || !token.includes('-')) return false;
    try {
        const [expiry, hash] = token.split('-');
        const validHash = btoa(expiry + SECRET_KEY).substring(0, 8);
        if (hash !== validHash) return false;
        const expY = parseInt(expiry.substring(0, 4)), expM = parseInt(expiry.substring(4, 6)) - 1, expD = parseInt(expiry.substring(6, 8));
        return new Date(expY, expM, expD) > new Date();
    } catch (e) { return false; }
}

function validateAndSaveToken() {
    const input = document.getElementById('tokenInput').value.trim();
    if (checkTokenLogic(input)) {
        localStorage.setItem('kalender_token_tius', input);
        alert("Token Berhasil Aktif!");
        location.reload();
    } else {
        alert("Token Salah atau Sudah Kedaluwarsa!");
    }
}

function showTokenModal() { document.getElementById('tokenModal').style.display = 'flex'; }
function closeModal() { document.getElementById('tokenModal').style.display = 'none'; }
function searchWeton() {
    const input = document.getElementById('dateInput');
    if (input && input.value) {
        const target = new Date(input.value);
        current = new Date(target.getFullYear(), target.getMonth(), 1);
        generateCalendar();
        updateDetail(target, getPasaran(target));
    }
}

// START
document.addEventListener("DOMContentLoaded", () => {
    generateCalendar();
    const prev = document.getElementById('prevMonth');
    const next = document.getElementById('nextMonth');
    if(prev) prev.onclick = () => { current.setMonth(current.getMonth() - 1); generateCalendar(); };
    if(next) next.onclick = () => { current.setMonth(current.getMonth() + 1); generateCalendar(); };
});

function shareWhatsApp() {
    const text = document.getElementById('printableArea').innerText;
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
}
