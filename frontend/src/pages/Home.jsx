import { useNavigate } from 'react-router-dom';
import { NOUR_PHOTO } from '../photoData';

const announcements = [
  { id: 1, icon: "🎉", text: "Livraison gratuite — Promo l'yum sur tous les légumes!", color: "#eaf3de", textColor: "#1a5c3a" },
  { id: 2, icon: "🆕", text: "Tajines artisanaux — nouveauté cette semaine!", color: "#faeeda", textColor: "#7a4a00" },
  { id: 3, icon: "⚡", text: "Stock limité — Fraises Larache disponibles maintenant", color: "#fbeaf0", textColor: "#7a1a3a" },
  { id: 4, icon: "🌿", text: "Huile d'Argan bio — directement des producteurs", color: "#e6f1fb", textColor: "#1a5c8a" },
];

const categories = [
  { key: "legumes", label: "Légumes", desc: "Frais du souk", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80", accent: "#2d6a4f" },
  { key: "fruits", label: "Fruits", desc: "Saison Maroc", img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=80", accent: "#b45309" },
  { key: "artisanat", label: "Artisanat", desc: "Fait main", img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80", accent: "#7a1a3a" },
  { key: "autre", label: "Épicerie", desc: "Argan, Miel...", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80", accent: "#1a5c8a" },
];

const featured = [
  { nom: "Tomates Beldiya", prix: 8, unit: "kg", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&q=80", badge: "bio" },
  { nom: "Oranges Maroc", prix: 7, unit: "kg", img: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&q=80", badge: "" },
  { nom: "Huile d'Argan", prix: 45, unit: "250ml", img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80", badge: "bio" },
  { nom: "Miel Beldiya", prix: 60, unit: "500g", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80", badge: "" },
  { nom: "Fraises Larache", prix: 15, unit: "kg", img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&q=80", badge: "new" },
  { nom: "Tajine Artisanal", prix: 120, unit: "pce", img: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80", badge: "new" },
];

const badgeConfig = {
  bio:   { label: "Bio",   bg: "#c0dd97", color: "#27500a" },
  promo: { label: "Promo", bg: "#f09595", color: "#791f1f" },
  new:   { label: "New",   bg: "#b5d4f4", color: "#0c447c" },
};

const stats = [
  { icon: "🌿", value: "100%", label: "Produits frais" },
  { icon: "🚚", value: "< 24h", label: "Livraison rapide" },
  { icon: "🤝", value: "+500", label: "Clients satisfaits" },
  { icon: "🌍", label: "Casablanca & environs", value: "📍" },
];

export default function Home({ onAdd }) {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f8f9f5', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroTextWrap}>
            <span style={styles.heroBadge}>🌿 Livraison gratuite aujourd'hui</span>
            <h1 style={styles.heroTitle}>
              Le souk blediya<br />
              <span style={{ color: '#a8d980' }}>livré chez toi</span>
            </h1>
            <p style={styles.heroDesc}>
              Khdar o frwak frach — directement des producteurs locaux à ta porte 🛒
            </p>
            <div style={styles.heroBtns}>
              <button onClick={() => navigate('/produits')} style={styles.heroCta}>
                Chouf les produits →
              </button>
              <button onClick={() => navigate('/register')} style={styles.heroCtaGhost}>
                Créer un compte
              </button>
            </div>
          </div>
          <div style={styles.heroImageWrap}>
            <img
              src={NOUR_PHOTO}
              alt="Nour"
              style={styles.heroImage}
            />
            <div style={styles.heroImageDecor1} />
            <div style={styles.heroImageDecor2} />
          </div>
        </div>

        {/* Stats bar */}
        <div style={styles.statsBar}>
          {stats.map(s => (
            <div key={s.label} style={styles.statItem}>
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ANNOUNCEMENTS ── */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.announcements}>
            {announcements.map(a => (
              <div key={a.id} style={{ ...styles.announcementCard, background: a.color }}>
                <span style={styles.announcementIcon}>{a.icon}</span>
                <span style={{ ...styles.announcementText, color: a.textColor }}>{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Catégories</h2>
              <p style={styles.sectionSub}>Explorer par catégorie</p>
            </div>
            <span onClick={() => navigate('/produits')} style={styles.seeAll}>Tout voir →</span>
          </div>
          <div style={styles.categoriesGrid}>
            {categories.map(cat => (
              <div
                key={cat.key}
                onClick={() => navigate('/produits')}
                style={styles.categoryCard}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img src={cat.img} alt={cat.label} style={styles.categoryImg} />
                <div style={styles.categoryOverlay}>
                  <div style={styles.categoryLabel}>{cat.label}</div>
                  <div style={styles.categoryDesc}>{cat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section style={{ ...styles.section, paddingBottom: 64 }}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>Populaires 🔥</h2>
              <p style={styles.sectionSub}>Les plus commandés cette semaine</p>
            </div>
            <span onClick={() => navigate('/produits')} style={styles.seeAll}>Tout voir →</span>
          </div>
          <div style={styles.featuredGrid}>
            {featured.map(p => {
              const badge = badgeConfig[p.badge];
              return (
                <div key={p.nom} style={styles.featuredCard}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={styles.featuredImgWrap}>
                    <img src={p.img} alt={p.nom} style={styles.featuredImg} />
                    {badge && (
                      <div style={{ ...styles.featuredBadge, background: badge.bg, color: badge.color }}>
                        {badge.label}
                      </div>
                    )}
                  </div>
                  <div style={styles.featuredBody}>
                    <div style={styles.featuredName}>{p.nom}</div>
                    <div style={styles.featuredUnit}>{p.unit}</div>
                    <div style={styles.featuredFooter}>
                      <span style={styles.featuredPrice}>{p.prix} DH</span>
                      <button
                        onClick={() => onAdd && onAdd(p)}
                        style={styles.addBtn}
                        onMouseEnter={e => e.currentTarget.style.background = '#145230'}
                        onMouseLeave={e => e.currentTarget.style.background = '#1a5c3a'}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

const styles = {
  hero: {
    background: 'linear-gradient(135deg, #0f3d26 0%, #1a5c3a 60%, #2d7a52 100%)',
    padding: '0 32px',
    position: 'relative',
    overflow: 'hidden',
  },
  heroContent: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 420,
    gap: 48,
    paddingTop: 48,
  },
  heroTextWrap: { flex: 1, maxWidth: 560 },
  heroBadge: {
    display: 'inline-block',
    background: 'rgba(168,217,128,0.2)',
    color: '#a8d980',
    border: '1px solid rgba(168,217,128,0.35)',
    fontSize: 12,
    fontWeight: 600,
    padding: '5px 14px',
    borderRadius: 20,
    marginBottom: 20,
    letterSpacing: '0.3px',
  },
  heroTitle: {
    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
    fontWeight: 800,
    color: '#fff',
    margin: '0 0 16px',
    lineHeight: 1.15,
    letterSpacing: '-1px',
  },
  heroDesc: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 15,
    lineHeight: 1.6,
    margin: '0 0 28px',
    maxWidth: 440,
  },
  heroBtns: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  heroCta: {
    background: '#fff',
    color: '#1a5c3a',
    border: 'none',
    borderRadius: 12,
    padding: '13px 28px',
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    transition: 'transform 0.15s',
  },
  heroCtaGhost: {
    background: 'transparent',
    color: 'rgba(255,255,255,0.85)',
    border: '1.5px solid rgba(255,255,255,0.35)',
    borderRadius: 12,
    padding: '13px 28px',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  heroImageWrap: {
    position: 'relative',
    flexShrink: 0,
    width: 280,
    height: 320,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  heroImage: {
    width: 240,
    height: 300,
    objectFit: 'cover',
    objectPosition: 'top',
    borderRadius: '50% 50% 0 0',
    position: 'relative',
    zIndex: 2,
    border: '3px solid rgba(255,255,255,0.25)',
  },
  heroImageDecor1: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.06)',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  heroImageDecor2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: '50%',
    background: 'rgba(168,217,128,0.12)',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  statsBar: {
    maxWidth: 1200,
    margin: '0 auto',
    display: 'flex',
    gap: 0,
    borderTop: '1px solid rgba(255,255,255,0.12)',
    marginTop: 32,
    paddingBottom: 0,
  },
  statItem: {
    flex: 1,
    padding: '18px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
    borderRight: '1px solid rgba(255,255,255,0.1)',
  },
  statValue: { fontSize: 18, fontWeight: 700, color: '#a8d980' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 500 },

  section: { padding: '48px 32px 0' },
  container: { maxWidth: 1200, margin: '0 auto' },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  sectionTitle: { fontSize: 22, fontWeight: 700, color: '#1a1a1a', margin: '0 0 4px', letterSpacing: '-0.5px' },
  sectionSub: { fontSize: 13, color: '#888', margin: 0 },
  seeAll: { fontSize: 13, color: '#1a5c3a', cursor: 'pointer', fontWeight: 600, textDecoration: 'none' },

  announcements: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 12,
  },
  announcementCard: {
    borderRadius: 12,
    padding: '14px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  announcementIcon: { fontSize: 20, flexShrink: 0 },
  announcementText: { fontSize: 12, fontWeight: 500, lineHeight: 1.4 },

  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 14,
  },
  categoryCard: {
    borderRadius: 16,
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative',
    height: 160,
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
  },
  categoryImg: { width: '100%', height: '100%', objectFit: 'cover' },
  categoryOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.65) 100%)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  categoryLabel: { fontSize: 16, fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.5)' },
  categoryDesc: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textShadow: '0 1px 3px rgba(0,0,0,0.4)' },

  featuredGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: 16,
  },
  featuredCard: {
    background: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid #ebebeb',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    cursor: 'default',
  },
  featuredImgWrap: { height: 130, position: 'relative', overflow: 'hidden' },
  featuredImg: { width: '100%', height: '100%', objectFit: 'cover' },
  featuredBadge: {
    position: 'absolute', top: 8, left: 8,
    fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 8,
  },
  featuredBody: { padding: '12px 14px' },
  featuredName: { fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 },
  featuredUnit: { fontSize: 11, color: '#999', marginBottom: 10 },
  featuredFooter: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  featuredPrice: { fontSize: 16, fontWeight: 800, color: '#1a5c3a' },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    background: '#1a5c3a',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    padding: '6px 12px',
    fontSize: 11,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
};