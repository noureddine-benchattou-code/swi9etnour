import { useState } from 'react';

const produits = [
  { nom: "Tomates Beldiya",  cat: "legumes",   prix: 8,   unit: "kg",    img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80", stars: 5, badge: "bio",   stock: 24 },
  { nom: "Courgettes",       cat: "legumes",   prix: 5,   unit: "kg",    img: "https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?w=400&q=80", stars: 4, badge: "",     stock: 18 },
  { nom: "Carottes",         cat: "legumes",   prix: 4,   unit: "kg",    img: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400&q=80", stars: 5, badge: "promo",stock: 30 },
  { nom: "Épinards",         cat: "legumes",   prix: 6,   unit: "botte", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80", stars: 4, badge: "bio",   stock: 12 },
  { nom: "Oranges Maroc",    cat: "fruits",    prix: 7,   unit: "kg",    img: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80", stars: 5, badge: "",     stock: 50 },
  { nom: "Fraises",          cat: "fruits",    prix: 15,  unit: "kg",    img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80", stars: 5, badge: "new",   stock: 8  },
  { nom: "Pastèque",         cat: "fruits",    prix: 3,   unit: "kg",    img: "https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400&q=80", stars: 4, badge: "",     stock: 20 },
  { nom: "Figues",           cat: "fruits",    prix: 18,  unit: "kg",    img: "https://images.unsplash.com/photo-1601379760883-1bb497c558a0?w=400&q=80", stars: 5, badge: "promo",stock: 6  },
  { nom: "Tajine Artisanal", cat: "artisanat", prix: 120, unit: "pce",   img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80", stars: 5, badge: "new",   stock: 4  },
  { nom: "Panier Osier",     cat: "artisanat", prix: 85,  unit: "pce",   img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80", stars: 4, badge: "",     stock: 7  },
  { nom: "Huile d'Argan",    cat: "autre",     prix: 45,  unit: "250ml", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80", stars: 5, badge: "bio",   stock: 15 },
  { nom: "Miel Beldiya",     cat: "autre",     prix: 60,  unit: "500g",  img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80", stars: 5, badge: "",     stock: 10 },
];

const categories = [
  { key: "tout",      label: "Tous les produits", emoji: "🛒" },
  { key: "legumes",   label: "Légumes",            emoji: "🥬" },
  { key: "fruits",    label: "Fruits",             emoji: "🍊" },
  { key: "artisanat", label: "Artisanat",          emoji: "🧺" },
  { key: "autre",     label: "Épicerie",           emoji: "🫙" },
];

const badgeConfig = {
  bio:   { label: "Bio",   bg: "#c0dd97", color: "#27500a" },
  promo: { label: "Promo", bg: "#f09595", color: "#791f1f" },
  new:   { label: "New",   bg: "#b5d4f4", color: "#0c447c" },
};

const sortOptions = [
  { key: "default", label: "Par défaut" },
  { key: "price_asc", label: "Prix ↑" },
  { key: "price_desc", label: "Prix ↓" },
  { key: "stars", label: "Mieux notés" },
];

function Stars({ count }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24">
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={i < count ? "#EF9F27" : "#e0e0e0"}
          />
        </svg>
      ))}
    </div>
  );
}

function ProduitCard({ produit, onAdd }) {
  const badge = badgeConfig[produit.badge];
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAdd(produit);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)'; }}
    >
      <div style={styles.cardImgWrap}>
        <img src={produit.img} alt={produit.nom} style={styles.cardImg} />
        {badge && (
          <div style={{ ...styles.cardBadge, background: badge.bg, color: badge.color }}>{badge.label}</div>
        )}
        {added && (
          <div style={styles.addedOverlay}>
            <span style={{ fontSize: 28, color: '#fff' }}>✓</span>
          </div>
        )}
        <div style={{ ...styles.stockPill, background: produit.stock < 10 ? '#fff5f5' : '#f0f9eb', color: produit.stock < 10 ? '#c0392b' : '#27500a' }}>
          {produit.stock < 10 ? `⚠ Stock: ${produit.stock}` : `✓ En stock`}
        </div>
      </div>
      <div style={styles.cardBody}>
        <Stars count={produit.stars} />
        <div style={styles.cardName}>{produit.nom}</div>
        <div style={styles.cardUnit}>par {produit.unit}</div>
        <div style={styles.cardFooter}>
          <div>
            <span style={styles.cardPrice}>{produit.prix} DH</span>
            <span style={styles.cardPriceUnit}> /{produit.unit}</span>
          </div>
          <button
            onClick={handleAdd}
            style={{ ...styles.addBtn, background: added ? '#27500a' : '#1a5c3a' }}
          >
            {added ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            )}
            {added ? 'Ajouté' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Produits({ onAdd }) {
  const [activeCat, setActiveCat] = useState('tout');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  let filtered = produits.filter(p => {
    const matchCat = activeCat === 'tout' || p.cat === activeCat;
    const matchSearch = p.nom.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === 'price_asc') filtered = [...filtered].sort((a, b) => a.prix - b.prix);
  else if (sort === 'price_desc') filtered = [...filtered].sort((a, b) => b.prix - a.prix);
  else if (sort === 'stars') filtered = [...filtered].sort((a, b) => b.stars - a.stars);

  const catCounts = {};
  categories.forEach(c => {
    catCounts[c.key] = c.key === 'tout' ? produits.length : produits.filter(p => p.cat === c.key).length;
  });

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f8f9f5', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderInner}>
          <div>
            <h1 style={styles.pageTitle}>Nos Produits 🌿</h1>
            <p style={styles.pageSub}>Khdar o frwak frach — directement des producteurs locaux</p>
          </div>
          {/* Promo badge */}
          <div style={styles.promoBadge}>
            <div style={styles.promoBadgeCircle}>-20%</div>
            <div>
              <div style={styles.promoTitle}>Promo l'yum!</div>
              <div style={styles.promoSub}>Légumes frais — livraison gratuite</div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.mainLayout}>

        {/* ── SIDEBAR ── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarSection}>
            <div style={styles.sidebarTitle}>Catégories</div>
            <div style={styles.catList}>
              {categories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCat(cat.key)}
                  style={{
                    ...styles.catBtn,
                    ...(activeCat === cat.key ? styles.catBtnActive : {}),
                  }}
                >
                  <span style={styles.catEmoji}>{cat.emoji}</span>
                  <span style={styles.catLabel}>{cat.label}</span>
                  <span style={{ ...styles.catCount, ...(activeCat === cat.key ? styles.catCountActive : {}) }}>
                    {catCounts[cat.key]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.sidebarSection}>
            <div style={styles.sidebarTitle}>Trier par</div>
            <div style={styles.sortList}>
              {sortOptions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setSort(opt.key)}
                  style={{ ...styles.sortBtn, ...(sort === opt.key ? styles.sortBtnActive : {}) }}
                >
                  {sort === opt.key && <span style={styles.sortCheck}>●</span>}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div style={styles.infoBox}>
            <div style={styles.infoBoxIcon}>🚚</div>
            <div style={styles.infoBoxText}>
              <strong>Livraison gratuite</strong><br />
              Sur toutes les commandes aujourd'hui
            </div>
          </div>
        </aside>

        {/* ── PRODUCTS AREA ── */}
        <main style={styles.productsArea}>

          {/* Toolbar */}
          <div style={styles.toolbar}>
            <div style={styles.searchWrap}>
              <svg style={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Chercher un produit..."
                style={styles.searchInput}
              />
              {search && (
                <button onClick={() => setSearch('')} style={styles.searchClear}>✕</button>
              )}
            </div>
            <div style={styles.resultCount}>
              <strong>{filtered.length}</strong> produit{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div style={styles.productsGrid}>
              {filtered.map(p => (
                <ProduitCard key={p.nom} produit={p} onAdd={onAdd} />
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>😅</div>
              <div style={styles.emptyTitle}>Ma kayn walou</div>
              <div style={styles.emptySub}>Essaye avec un autre mot-clé</div>
              <button onClick={() => { setSearch(''); setActiveCat('tout'); }} style={styles.emptyReset}>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  pageHeader: {
    background: 'linear-gradient(135deg, #1a5c3a, #0f3d26)',
    padding: '32px 40px',
  },
  pageHeaderInner: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: { fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.5px' },
  pageSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 },
  promoBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    padding: '14px 20px',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  promoBadgeCircle: {
    width: 52, height: 52, borderRadius: '50%',
    background: '#e8603a', color: '#fff',
    fontSize: 14, fontWeight: 800,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  promoTitle: { fontSize: 14, fontWeight: 700, color: '#fff' },
  promoSub: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },

  mainLayout: {
    maxWidth: 1240,
    margin: '0 auto',
    padding: '32px 40px',
    display: 'flex',
    gap: 28,
    alignItems: 'flex-start',
  },

  sidebar: { width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 },
  sidebarSection: {
    background: '#fff',
    borderRadius: 14,
    padding: '18px 16px',
    border: '1px solid #ebebeb',
  },
  sidebarTitle: { fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 },

  catList: { display: 'flex', flexDirection: 'column', gap: 3 },
  catBtn: {
    display: 'flex', alignItems: 'center', gap: 9,
    padding: '9px 10px', borderRadius: 10,
    border: 'none', background: 'transparent',
    cursor: 'pointer', width: '100%', textAlign: 'left',
    transition: 'background 0.15s',
  },
  catBtnActive: { background: '#eaf3de' },
  catEmoji: { fontSize: 16, flexShrink: 0 },
  catLabel: { flex: 1, fontSize: 13, fontWeight: 500, color: '#333' },
  catCount: {
    fontSize: 11, fontWeight: 600, color: '#aaa',
    background: '#f0f0f0', borderRadius: 10, padding: '1px 7px',
  },
  catCountActive: { background: '#c0dd97', color: '#27500a' },

  sortList: { display: 'flex', flexDirection: 'column', gap: 2 },
  sortBtn: {
    padding: '8px 10px', borderRadius: 8,
    border: 'none', background: 'transparent',
    cursor: 'pointer', fontSize: 13, color: '#555',
    textAlign: 'left', display: 'flex', alignItems: 'center', gap: 7,
    transition: 'background 0.15s',
  },
  sortBtnActive: { background: '#eaf3de', color: '#1a5c3a', fontWeight: 600 },
  sortCheck: { color: '#1a5c3a', fontSize: 8 },

  infoBox: {
    background: '#eaf3de',
    borderRadius: 14,
    padding: '16px',
    display: 'flex',
    gap: 12,
    alignItems: 'flex-start',
  },
  infoBoxIcon: { fontSize: 22, flexShrink: 0 },
  infoBoxText: { fontSize: 12, color: '#27500a', lineHeight: 1.5 },

  productsArea: { flex: 1, minWidth: 0 },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  searchWrap: {
    position: 'relative',
    flex: 1,
    maxWidth: 340,
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: { position: 'absolute', left: 12, pointerEvents: 'none' },
  searchInput: {
    width: '100%',
    padding: '10px 36px',
    borderRadius: 12,
    border: '1.5px solid #e0e0e0',
    background: '#fff',
    fontSize: 13,
    color: '#333',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  searchClear: {
    position: 'absolute', right: 10,
    background: 'none', border: 'none',
    cursor: 'pointer', fontSize: 12, color: '#aaa',
  },
  resultCount: { fontSize: 13, color: '#888' },

  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))',
    gap: 16,
  },

  card: {
    background: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid #ebebeb',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  },
  cardImgWrap: { height: 140, position: 'relative', overflow: 'hidden' },
  cardImg: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
  cardBadge: {
    position: 'absolute', top: 8, left: 8,
    fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 8,
  },
  addedOverlay: {
    position: 'absolute', inset: 0,
    background: 'rgba(26,92,58,0.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  stockPill: {
    position: 'absolute', bottom: 7, right: 7,
    fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 8,
  },
  cardBody: { padding: '12px 14px' },
  cardName: { fontSize: 13, fontWeight: 700, color: '#1a1a1a', margin: '5px 0 2px' },
  cardUnit: { fontSize: 11, color: '#aaa', marginBottom: 10 },
  cardFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  cardPrice: { fontSize: 17, fontWeight: 800, color: '#1a5c3a' },
  cardPriceUnit: { fontSize: 10, color: '#aaa', fontWeight: 400 },
  addBtn: {
    display: 'flex', alignItems: 'center', gap: 5,
    color: '#fff', border: 'none', borderRadius: 9,
    padding: '7px 11px', fontSize: 11, fontWeight: 600,
    cursor: 'pointer', transition: 'background 0.2s',
  },

  emptyState: {
    textAlign: 'center',
    padding: '72px 24px',
    background: '#fff',
    borderRadius: 16,
    border: '1px solid #ebebeb',
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 17, fontWeight: 700, color: '#333', marginBottom: 6 },
  emptySub: { fontSize: 13, color: '#aaa', marginBottom: 18 },
  emptyReset: {
    background: '#1a5c3a', color: '#fff', border: 'none',
    borderRadius: 10, padding: '10px 20px',
    fontSize: 13, fontWeight: 600, cursor: 'pointer',
  },
};