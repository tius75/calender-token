function getLunarShio(date) {
    try {
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        
        // Data tanggal Imlek (dapat diperluas)
        const imlekDates = {
            2020: { date: new Date(2020, 0, 25), shio: "Tikus", year: 4718 },
            2021: { date: new Date(2021, 1, 12), shio: "Kerbau", year: 4719 },
            2022: { date: new Date(2022, 1, 1), shio: "Macan", year: 4720 },
            2023: { date: new Date(2023, 0, 22), shio: "Kelinci", year: 4721 },
            2024: { date: new Date(2024, 1, 10), shio: "Naga", year: 4722 },
            2025: { date: new Date(2025, 0, 29), shio: "Ular", year: 4723 },
            2026: { date: new Date(2026, 1, 17), shio: "Kuda", year: 4724 },
            2027: { date: new Date(2027, 1, 6), shio: "Kambing", year: 4725 },
            2028: { date: new Date(2028, 0, 26), shio: "Monyet", year: 4726 },
            2029: { date: new Date(2029, 1, 13), shio: "Ayam", year: 4727 },
            2030: { date: new Date(2030, 1, 3), shio: "Anjing", year: 4728 }
        };
        
        // Cari tahun Imlek yang sesuai
        let lunarYear, shio, imlekDate;
        
        // Cek apakah tanggal ini setelah Imlek tahun ini
        if (imlekDates[y] && date >= imlekDates[y].date) {
            // Sudah Imlek tahun ini
            lunarYear = imlekDates[y].year;
            shio = imlekDates[y].shio;
            imlekDate = imlekDates[y].date;
        } else {
            // Masih tahun Imlek sebelumnya
            const lastYear = y - 1;
            if (imlekDates[lastYear]) {
                lunarYear = imlekDates[lastYear].year;
                shio = imlekDates[lastYear].shio;
                imlekDate = imlekDates[lastYear].date;
            } else {
                // Fallback calculation
                const baseYear = 2026; // Tahun Kuda 4724
                const baseShioIndex = 6; // Kuda = index 6
                const shios = ["Tikus", "Kerbau", "Macan", "Kelinci", "Naga", "Ular", "Kuda", "Kambing", "Monyet", "Ayam", "Anjing", "Babi"];
                
                const yearDiff = y - baseYear;
                let shioIndex = (baseShioIndex + yearDiff) % 12;
                if (shioIndex < 0) shioIndex += 12;
                
                shio = shios[shioIndex];
                lunarYear = 4724 + yearDiff; // 4724 adalah tahun Imlek untuk 2026
                
                // Estimasi tanggal Imlek (biasanya Jan-Feb)
                imlekDate = new Date(y, 1, 5);
            }
        }
        
        // Hitung bulan dan tanggal Imlek
        const diffTime = Math.abs(date - imlekDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        let lunarMonth, lunarDay;
        
        if (date >= imlekDate) {
            // Setelah Imlek: bulan 1-12
            lunarMonth = Math.floor(diffDays / 29.53) + 1;
            lunarDay = (diffDays % 30) + 1;
        } else {
            // Sebelum Imlek: bulan 11, 12 tahun sebelumnya
            const daysBeforeImlek = Math.floor((imlekDate - date) / (1000 * 60 * 60 * 24));
            lunarMonth = 12 - Math.floor(daysBeforeImlek / 29.53);
            lunarDay = 30 - (daysBeforeImlek % 30);
        }
        
        // Validasi
        if (lunarMonth < 1) lunarMonth = 1;
        if (lunarMonth > 12) lunarMonth = 12;
        if (lunarDay < 1) lunarDay = 1;
        if (lunarDay > 30) lunarDay = 30;
        
        // Ramalan berdasarkan shio
        const ramalan = {
            "Tikus": "Tahun baru membawa peluang finansial dan hubungan baik.",
            "Kerbau": "Ketekunan akan membawa kesuksesan dalam pekerjaan.",
            "Macan": "Keberanian dibutuhkan untuk menghadapi tantangan.",
            "Kelinci": "Harmoni dalam keluarga dan hubungan interpersonal.",
            "Naga": "Energi kuat untuk memimpin dan berinovasi.",
            "Ular": "Kebijaksanaan dalam pengambilan keputusan penting.",
            "Kuda": "Kebebasan dan petualangan menanti di depan.",
            "Kambing": "Kreativitas akan berkembang dengan baik.",
            "Monyet": "Kecerdikan akan membantu menyelesaikan masalah.",
            "Ayam": "Perhatian pada detail membawa kesempurnaan.",
            "Anjing": "Kesetiaan dan perlindungan untuk orang terdekat.",
            "Babi": "Kemakmuran dan keberuntungan dalam bisnis."
        };

        return {
            full: `${lunarDay} - ${lunarMonth} - ${lunarYear}`,
            shio: shio,
            ramalan: ramalan[shio] || "Hari ini baik untuk merencanakan masa depan."
        };
        
    } catch (error) {
        console.error("Error in getLunarShio:", error);
        // Default untuk 17 Februari 2026 (Imlek 2026)
        return {
            full: "1 - 1 - 4724",
            shio: "Kuda",
            ramalan: "Tahun Kuda dimulai, saatnya untuk perjalanan dan kebebasan."
        };
    }
}
