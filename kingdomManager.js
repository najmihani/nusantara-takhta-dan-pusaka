// js/kingdomManager.js
// ============================================
// Pengurus Kerajaan – Cipta, ubah, dan kesan sejarah
// ============================================

class KingdomManager {
    constructor(timeMachine) {
        this.timeMachine = timeMachine;
        this.playerKingdom = null; // Kerajaan yang dimainkan (jika ciptaan sendiri)
        this.originalOwners = {}; // Simpan pemilik asal untuk rujukan
    }

    // Cipta kerajaan baru berdasarkan wilayah pilihan dan tahun
    createKingdom(name, provinceIds, year, culture, color = '#FFD700') {
        // 1. Simpan pemilik asal setiap wilayah
        const ownerChanges = {};
        provinceIds.forEach(pid => {
            const oldOwner = this.timeMachine.getOwner(pid, year);
            ownerChanges[pid] = oldOwner;
        });

        // 2. Hasilkan ID unik
        const id = `player_${Date.now()}`;

        // 3. Bina objek kerajaan
        const newKingdom = {
            id: id,
            name: name,
            color: color,
            appear: year,
            disappear: 9999, // Tidak akan luput melainkan ditakluk
            culture: culture || 'Melayu',
            isPlayer: true,
            claims: provinceIds.map(pid => ({
                provinceId: pid,
                type: 'core' // Semua wilayah pilihan dianggap inti
            })),
            // Data permainan
            treasury: 1000,
            army: provinceIds.length * 500,
            navy: Math.floor(provinceIds.length * 0.3) * 100,
            stability: 60,
            technology: { military: 1, civil: 1, naval: 1 }
        };

        // 4. Simpan dalam memori
        this.playerKingdom = newKingdom;
        this.originalOwners = ownerChanges;

        // 5. Kesan diplomatik: semua kerajaan yang kehilangan wilayah akan marah
        const affectedKingdoms = new Set();
        for (const pid of provinceIds) {
            const oldOwner = ownerChanges[pid];
            if (oldOwner && oldOwner !== 'bebas') {
                affectedKingdoms.add(oldOwner);
            }
        }

        // 6. Balikkan objek baru
        return {
            kingdom: newKingdom,
            affectedKingdoms: Array.from(affectedKingdoms),
            originalOwners: ownerChanges
        };
    }

    // Semak sama ada kerajaan baru menyebabkan 'pecahan sejarah'
    checkHistoricalBreak(provinceId, year) {
        // Jika pemain memiliki wilayah yang sepatutnya menjadi milik kerajaan lain pada tahun ini
        const expectedOwner = this.timeMachine.getOwner(provinceId, year);
        const actualOwner = this.playerKingdom ? this.playerKingdom.id : null;
        
        if (expectedOwner && actualOwner && expectedOwner !== actualOwner) {
            // Cari kerajaan yang 'terlepas'
            const lostKingdom = this.timeMachine.kingdoms.find(k => k.id === expectedOwner);
            if (lostKingdom) {
                return {
                    broken: true,
                    lostKingdom: lostKingdom.name,
                    province: provinceId,
                    message: `Sejarah terpesong! ${lostKingdom.name} kehilangan ${provinceId}.`
                };
            }
        }
        return { broken: false };
    }

    // Gabungkan kerajaan pemain dengan data utama (untuk rendering)
    mergeWithWorldData(allKingdoms) {
        if (!this.playerKingdom) return allKingdoms;
        // Gantikan atau tambah kerajaan pemain
        const filtered = allKingdoms.filter(k => k.id !== this.playerKingdom.id);
        return [...filtered, this.playerKingdom];
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = KingdomManager;
}
