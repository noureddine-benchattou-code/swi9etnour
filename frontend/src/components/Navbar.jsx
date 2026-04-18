import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NOUR_PHOTO } from '../photoData';

function Navbar({ cartCount = 0, cartTotal = 0 }) {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        <div style={styles.logoImgWrap}>
          <img src={NOUR_PHOTO} alt="Nour" style={styles.logoImg} />
        </div>
        <div style={styles.logoTextWrap}>
          <span style={styles.logoText}>Swi9etNour</span>
          <span style={styles.logoSub}>Souk lblediya 🌿</span>
        </div>
      </Link>

      {/* Center nav links */}
      <div style={styles.centerLinks}>
        <Link to="/" style={{ ...styles.navLink, ...(isActive('/') ? styles.navLinkActive : {}) }}>
          Accueil
        </Link>
        <Link to="/produits" style={{ ...styles.navLink, ...(isActive('/produits') ? styles.navLinkActive : {}) }}>
          Produits
        </Link>
      </div>

      {/* Right actions */}
      <div style={styles.actions}>
        {/* Cart */}
        <Link to="/panier" style={{ ...styles.cartBtn, ...(isActive('/panier') ? styles.cartBtnActive : {}) }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span style={styles.cartLabel}>Panier</span>
          {cartCount > 0 && (
            <div style={styles.cartPill}>
              <span style={styles.cartCount}>{cartCount}</span>
              <span style={styles.cartTotal}>{cartTotal} DH</span>
            </div>
          )}
        </Link>

        {/* Auth */}
        {token ? (
          <button onClick={logout} style={styles.logoutBtn}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Déconnexion
          </button>
        ) : (
          <div style={styles.authGroup}>
            <Link to="/login" style={styles.loginLink}>Connexion</Link>
            <Link to="/register" style={styles.registerBtn}>Inscription</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    height: 64,
    background: 'linear-gradient(135deg, #1a5c3a 0%, #0d3d24 100%)',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 200,
    boxShadow: '0 2px 20px rgba(0,0,0,0.18)',
    gap: 24,
  },
  logo: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 11,
    flexShrink: 0,
  },
  logoImgWrap: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid rgba(255,255,255,0.4)',
    flexShrink: 0,
  },
  logoImg: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' },
  logoTextWrap: { display: 'flex', flexDirection: 'column', lineHeight: 1.2 },
  logoText: { fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.3px' },
  logoSub: { fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400 },

  centerLinks: {
    display: 'flex',
    gap: 4,
    flex: 1,
    justifyContent: 'center',
  },
  navLink: {
    color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    fontSize: '0.88rem',
    fontWeight: 500,
    padding: '7px 16px',
    borderRadius: 8,
    transition: 'all 0.15s',
    letterSpacing: '0.1px',
  },
  navLinkActive: {
    color: '#fff',
    background: 'rgba(255,255,255,0.15)',
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flexShrink: 0,
  },
  cartBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    textDecoration: 'none',
    color: 'rgba(255,255,255,0.85)',
    padding: '7px 14px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(255,255,255,0.08)',
    fontSize: '0.85rem',
    fontWeight: 500,
    transition: 'all 0.15s',
  },
  cartBtnActive: {
    background: 'rgba(255,255,255,0.18)',
    color: '#fff',
  },
  cartLabel: { fontSize: '0.85rem' },
  cartPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    background: '#e8603a',
    borderRadius: 20,
    padding: '2px 9px',
  },
  cartCount: { color: '#fff', fontSize: 11, fontWeight: 700 },
  cartTotal: { color: 'rgba(255,255,255,0.9)', fontSize: 11, fontWeight: 600 },

  authGroup: { display: 'flex', alignItems: 'center', gap: 8 },
  loginLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 500,
    padding: '7px 14px',
    borderRadius: 10,
    transition: 'color 0.15s',
  },
  registerBtn: {
    color: '#1a5c3a',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 600,
    padding: '7px 16px',
    borderRadius: 10,
    background: '#fff',
    transition: 'opacity 0.15s',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'rgba(232,96,58,0.2)',
    color: '#ffb49a',
    border: '1px solid rgba(232,96,58,0.35)',
    padding: '7px 14px',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 500,
    transition: 'all 0.15s',
  },
};

export default Navbar;