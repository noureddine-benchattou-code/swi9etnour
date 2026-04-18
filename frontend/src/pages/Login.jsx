import { useState } from 'react';
import { NOUR_PHOTO } from '../photoData';
import api from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError('3amer email w password!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/login', form);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/produits';
    } catch {
      setError('Email ola password ghalat!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* Left panel — photo + branding */}
      <div style={styles.leftPanel}>
        <img src={NOUR_PHOTO} alt="Nour" style={styles.bgPhoto} />
        <div style={styles.overlay} />
        <div style={styles.brandContent}>
          <div style={styles.logoCircle}>
            <img src={NOUR_PHOTO} alt="Nour" style={{ width:'100%',height:'100%',objectFit:'cover',objectPosition:'top' }} />
          </div>
          <h1 style={styles.brandName}>Swi9etNour</h1>
          <p style={styles.brandTagline}>Khdar o frwak frach<br/>livré l bab dyalk 🌿</p>
          <div style={styles.badges}>
            {['🍅 Bio', '🍊 Frais', '🚚 Livraison'].map(b => (
              <span key={b} style={styles.badge}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>

          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Connexion</h2>
            <p style={styles.formSub}>Dkhol l compte dyalk 👋</p>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <span style={{ fontSize:14 }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <div style={styles.inputWrap}>
              <svg style={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                style={styles.input}
                type="email"
                placeholder="email@exemple.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Mot de passe</label>
            <div style={styles.inputWrap}>
              <svg style={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ ...styles.submitBtn, opacity: loading ? 0.75 : 1 }}
          >
            {loading ? (
              <span>Chargement...</span>
            ) : (
              <>
                <span>Se connecter</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </>
            )}
          </button>

          <div style={styles.divider}>
            <div style={styles.dividerLine}/>
            <span style={styles.dividerText}>ola</span>
            <div style={styles.dividerLine}/>
          </div>

          <p style={styles.registerLink}>
            Machi 3ndek compte?{' '}
            <a href="/register" style={styles.link}>Inscris-toi gratuitement</a>
          </p>

        </div>
      </div>

    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    background: '#f5f5f0',
  },
  leftPanel: {
    flex: '0 0 42%',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
  },
  bgPhoto: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top center',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(15,61,38,0.3) 0%, rgba(15,61,38,0.85) 100%)',
  },
  brandContent: {
    position: 'relative',
    zIndex: 2,
    padding: '32px 28px',
    width: '100%',
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    overflow: 'hidden',
    border: '3px solid rgba(255,255,255,0.5)',
    marginBottom: 14,
  },
  brandName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 700,
    margin: '0 0 8px',
    letterSpacing: '-0.5px',
  },
  brandTagline: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    lineHeight: 1.6,
    margin: '0 0 18px',
  },
  badges: {
    display: 'flex',
    gap: 7,
    flexWrap: 'wrap',
  },
  badge: {
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: 11,
    fontWeight: 500,
    padding: '5px 11px',
    borderRadius: 20,
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255,255,255,0.25)',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 32px',
  },
  formCard: {
    width: '100%',
    maxWidth: 380,
  },
  formHeader: {
    marginBottom: 28,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: '#1a1a1a',
    margin: '0 0 6px',
    letterSpacing: '-0.5px',
  },
  formSub: {
    fontSize: 14,
    color: '#777',
    margin: 0,
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#fff0f0',
    border: '1px solid #ffcccc',
    borderRadius: 10,
    padding: '11px 14px',
    fontSize: 13,
    color: '#c0392b',
    marginBottom: 18,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 600,
    color: '#333',
    marginBottom: 7,
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 13,
    color: '#999',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '12px 14px 12px 40px',
    borderRadius: 12,
    border: '1.5px solid #e0e0e0',
    fontSize: 14,
    color: '#1a1a1a',
    background: '#fafafa',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg,#1a5c3a,#0f3d26)',
    color: '#fff',
    border: 'none',
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    boxShadow: '0 4px 14px rgba(26,92,58,0.35)',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    margin: '22px 0',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: '#e5e5e5',
  },
  dividerText: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: 500,
  },
  registerLink: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    margin: 0,
  },
  link: {
    color: '#1a5c3a',
    fontWeight: 600,
    textDecoration: 'none',
  },
};