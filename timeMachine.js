// js/timeMachine.js
// ============================================
// Enjin Masa – Mengurus state dunia pada mana-mana tahun
// ============================================

class TimeMachine {
    constructor(kingdomData, provinceData) {
        this.kingdoms = kingdomData;
        this.provinces = provinceData;
        // Bina indeks untuk pencarian cepat
        this.provinceIndex = {};
        this.provinces.forEach(p => this.provinceIndex[p.id] = p);
    }

    // Dapatkan pemilik sesebuah wilayah pada tahun tertentu
    getOwner(provinceId, year) {
        const prov = this.provinceIndex[provinceId];
        if (!prov) return null;

        // Cari kerajaan yang menuntut wilayah ini pada tahun tersebut
        let owner = null;
        let highestPriority = -1;

        for (const k of this.kingdoms) {
            // Semak sama ada kerajaan ini wujud pada tahun ini
            if (year < k.appear || year > k.disappear) continue;

            // Semak sama ada provinsi ini dalam senarai tuntutan atau wilayah inti
            const claim = k.claims?.find(c => c.provinceId === provinceId);
            if (claim) {
                // Priority: core > tributary > claim
                const priority = { 'core': 3, 'tributary': 2, 'claim': 1 }[claim.type] || 0;
                if (priority > highestPriority) {
                    highestPriority = priority;
                    owner = k.id;
                }
            }
        }

        // Jika tiada, semak 'historical_owner' dari data provinsi (fallback)
        if (!owner && prov.historical) {
            const hist = prov.historical.find(h => year >= h.start && year <= h.end);
            if (hist) owner = hist.ownerId;
        }

        return owner || 'bebas';
    }

    // Dapatkan semua kerajaan yang aktif pada tahun tertentu
    getActiveKingdoms(year) {
        return this.kingdoms.filter(k => year >= k.appear && year <= k.disappear);
    }

    // Dapatkan semua wilayah yang dimiliki oleh sesebuah kerajaan pada tahun tertentu
    getKingdomProvinces(kingdomId, year) {
        const kingdom = this.kingdoms.find(k => k.id === kingdomId);
        if (!kingdom) return [];
        
        const result = [];
        for (const p of this.provinces) {
            if (this.getOwner(p.id, year) === kingdomId) {
                result.push(p.id);
            }
        }
        return result;
    }

    // Semak sama ada wilayah itu adalah 'core' bagi kerajaan pada tahun itu
    isCoreProvince(provinceId, kingdomId, year) {
        const kingdom = this.kingdoms.find(k => k.id === kingdomId);
        if (!kingdom) return false;
        const claim = kingdom.claims?.find(c => c.provinceId === provinceId);
        return claim && claim.type === 'core' && year >= kingdom.appear && year <= kingdom.disappear;
    }
}

// Eksport untuk digunakan di main.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeMachine;
}
