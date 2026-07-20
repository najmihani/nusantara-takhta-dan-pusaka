// js/data/dataExpansion.js
// ============================================
// DATA DIPERLUS UNTUK ERA 1211–1300 (Semenanjung + Sumatera)
// ============================================

const EXPANDED_PROVINCE_DATA = [
    // Semenanjung
    { id: 'melaka', name: 'Melaka', x: 420, y: 320, culture: 'Melayu', historical: [{start:1402, end:1511, ownerId:'melaka_sultanate'}] },
    { id: 'negeri_sembilan', name: 'Negeri Sembilan', x: 470, y: 340, culture: 'Melayu' },
    { id: 'johor', name: 'Johor', x: 540, y: 370, culture: 'Melayu', historical: [{start:1528, end:1947, ownerId:'johor_sultanate'}] },
    { id: 'pahang', name: 'Pahang', x: 550, y: 290, culture: 'Melayu', historical: [{start:1470, end:1947, ownerId:'pahang_sultanate'}] },
    { id: 'perak', name: 'Perak', x: 400, y: 260, culture: 'Melayu', historical: [{start:1528, end:1947, ownerId:'perak_sultanate'}] },
    { id: 'kedah', name: 'Kedah', x: 350, y: 200, culture: 'Melayu' },
    { id: 'patani', name: 'Patani', x: 500, y: 200, culture: 'Melayu', historical: [{start:1457, end:1902, ownerId:'patani_sultanate'}] },
    { id: 'kelantan', name: 'Kelantan', x: 520, y: 230, culture: 'Melayu' },
    { id: 'terengganu', name: 'Terengganu', x: 560, y: 250, culture: 'Melayu' },
    
    // Sumatera
    { id: 'aceh', name: 'Aceh', x: 150, y: 130, culture: 'Aceh', historical: [{start:1496, end:1947, ownerId:'aceh_sultanate'}] },
    { id: 'sumatera_utara', name: 'Sumatera Utara', x: 200, y: 250, culture: 'Batak' },
    { id: 'jambi', name: 'Jambi', x: 250, y: 340, culture: 'Melayu' },
    { id: 'palembang', name: 'Palembang', x: 300, y: 400, culture: 'Melayu' },
    { id: 'lampung', name: 'Lampung', x: 330, y: 460, culture: 'Melayu' },
    { id: 'bengkulu', name: 'Bengkulu', x: 240, y: 450, culture: 'Rejang' },
    { id: 'riau', name: 'Riau', x: 340, y: 280, culture: 'Melayu' },
    { id: 'singapura', name: 'Singapura', x: 580, y: 400, culture: 'Melayu' }
];

const EXPANDED_KINGDOM_DATA = [
    {
        id: 'sriwijaya',
        name: 'Sriwijaya',
        color: '#8B4513',
        appear: 600,
        disappear: 1400,
        culture: 'Melayu Kuno',
        claims: [
            { provinceId: 'palembang', type: 'core' },
            { provinceId: 'jambi', type: 'core' },
            { provinceId: 'lampung', type: 'tributary' },
            { provinceId: 'riau', type: 'tributary' }
        ]
    },
    {
        id: 'melayu_jambi',
        name: 'Kerajaan Melayu (Jambi)',
        color: '#DAA520',
        appear: 1100,
        disappear: 1400,
        culture: 'Melayu',
        claims: [
            { provinceId: 'jambi', type: 'core' },
            { provinceId: 'riau', type: 'claim' }
        ]
    },
    {
        id: 'kedah_tua',
        name: 'Kedah Tua',
        color: '#2E8B57',
        appear: 800,
        disappear: 1400,
        culture: 'Melayu',
        claims: [
            { provinceId: 'kedah', type: 'core' },
            { provinceId: 'perak', type: 'claim' }
        ]
    },
    {
        id: 'pagan',
        name: 'Empayar Pagan (Bagan)',
        color: '#B22222',
        appear: 1044,
        disappear: 1287,
        culture: 'Burma',
        claims: [] // Luar skop peta kita
    },
    {
        id: 'khmer',
        name: 'Kerajaan Khmer (Angkor)',
        color: '#FF8C00',
        appear: 802,
        disappear: 1431,
        culture: 'Khmer',
        claims: [] // Luar skop
    },
    {
        id: 'singhasari',
        name: 'Singhasari',
        color: '#C71585',
        appear: 1222,
        disappear: 1292,
        culture: 'Jawa',
        claims: [] // Jawa, belum dalam peta
    },
    // Tambahan untuk kesan naungan Melaka (akan aktif 1400+)
    {
        id: 'melaka_sultanate',
        name: 'Kesultanan Melaka',
        color: '#F4A460',
        appear: 1402,
        disappear: 1511,
        culture: 'Melayu',
        claims: [
            { provinceId: 'melaka', type: 'core' },
            { provinceId: 'negeri_sembilan', type: 'core' },
            { provinceId: 'johor', type: 'tributary' },
            { provinceId: 'pahang', type: 'tributary' },
            { provinceId: 'perak', type: 'tributary' },
            { provinceId: 'kedah', type: 'tributary' },
            { provinceId: 'patani', type: 'tributary' },
            { provinceId: 'riau', type: 'tributary' }
        ]
    },
    {
        id: 'johor_sultanate',
        name: 'Kesultanan Johor',
        color: '#1E90FF',
        appear: 1528,
        disappear: 1947,
        culture: 'Melayu',
        claims: [
            { provinceId: 'johor', type: 'core' },
            { provinceId: 'singapura', type: 'core' },
            { provinceId: 'riau', type: 'core' },
            { provinceId: 'pahang', type: 'claim' }
        ]
    },
    {
        id: 'perak_sultanate',
        name: 'Kesultanan Perak',
        color: '#32CD32',
        appear: 1528,
        disappear: 1947,
        culture: 'Melayu',
        claims: [
            { provinceId: 'perak', type: 'core' },
            { provinceId: 'kedah', type: 'claim' }
        ]
    },
    {
        id: 'pahang_sultanate',
        name: 'Kesultanan Pahang',
        color: '#FFD700',
        appear: 1470,
        disappear: 1947,
        culture: 'Melayu',
        claims: [
            { provinceId: 'pahang', type: 'core' },
            { provinceId: 'kelantan', type: 'claim' }
        ]
    },
    {
        id: 'patani_sultanate',
        name: 'Kesultanan Patani',
        color: '#FF69B4',
        appear: 1457,
        disappear: 1902,
        culture: 'Melayu',
        claims: [
            { provinceId: 'patani', type: 'core' },
            { provinceId: 'kelantan', type: 'tributary' },
            { provinceId: 'terengganu', type: 'tributary' }
        ]
    }
];

// Eksport
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EXPANDED_PROVINCE_DATA, EXPANDED_KINGDOM_DATA };
}
