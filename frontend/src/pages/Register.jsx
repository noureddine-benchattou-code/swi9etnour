import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NOUR_PHOTO } from '../photoData';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ nom: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.nom.trim()) e.nom = 'Kteb smiytek!';
    if (!form.email) e.email = '3amer l\'email!';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email machi sahih!';
    if (!form.password) e.password = '3amer password!';
    else if (form.password.length < 6) e.password = 'Password khasso 6 caractères au moins!';
    if (!form.confirm) e.confirm = 'Confirmi password dyalek!';
    else if (form.password !== form.confirm) e.confirm = 'Password machi nfs shi!';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    setGlobalError('');
    setErrors({});
    try {
      const res = await api.post('/register', {
  name: form.nom, // 🔥 هنا الحل
  email: form.email,
  password: form.password
});
      localStorage.setItem('token', res.data.token);
      navigate('/produits');
    } catch (err) {
  console.log(err.response);
  setGlobalError(JSON.stringify(err.response?.data));
}finally {
      setLoading(false);
    }
  };

  const field = (key, label, type, placeholder, icon) => (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      <div style={styles.inputWrap}>
        <span style={styles.inputIcon}>{icon}</span>
        <input
          style={{ ...styles.input, borderColor: errors[key] ? '#e74c3c' : '#e0e0e0' }}
          type={type}
          placeholder={placeholder}
          value={form[key]}
          onChange={e => { setForm({ ...form, [key]: e.target.value }); setErrors(prev => ({ ...prev, [key]: '' })); }}
        />
      </div>
      {errors[key] && <p style={styles.fieldError}>⚠ {errors[key]}</p>}
    </div>
  );

  return (
    <div style={styles.page}>

      {/* Left panel */}
      <div style={styles.leftPanel}>
        <img src={NOUR_PHOTO} alt="Nour" style={styles.bgPhoto} />
        <div style={styles.overlay} />
        <div style={styles.brandContent}>
          <div style={styles.logoCircle}>
            <img src={NOUR_PHOTO} alt="Nour" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <h1 style={styles.brandName}>Swi9etNour</h1>
          <p style={styles.brandTagline}>Khdar o frwak frach<br />livré l bab dyalk 🌿</p>
          <div style={styles.badges}>
            {['🍅 Bio', '🍊 Frais', '🚚 Livraison'].map(b => (
              <span key={b} style={styles.badge}>{b}</span>
            ))}
          </div>
          <div style={styles.trustBox}>
            <div style={styles.trustItem}><span style={styles.trustIcon}>✓</span> Inscription gratuite</div>
            <div style={styles.trustItem}><span style={styles.trustIcon}>✓</span> Aucune carte requise</div>
            <div style={styles.trustItem}><span style={styles.trustIcon}>✓</span> Livraison rapide</div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>

          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Inscription</h2>
            <p style={styles.formSub}>Créer ton compte gratuitement 🎉</p>
          </div>

          {globalError && (
            <div style={styles.errorBox}>
              <span>⚠️</span>
              <span>{globalError}</span>
            </div>
          )}

          {field('nom', 'Nom complet', 'text', 'Smiytek...', '👤')}
          {field('email', 'Email', 'email', 'email@exemple.com', '✉️')}
          {field('password', 'Mot de passe', 'password', '••••••••', '🔒')}
          {field('confirm', 'Confirmer le mot de passe', 'password', '••••••••', '🔑')}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ ...styles.submitBtn, opacity: loading ? 0.75 : 1 }}
          >
            {loading ? <span>Chargement...</span> : (
              <>
                <span>Créer mon compte</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>

          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>ola</span>
            <div style={styles.dividerLine} />
          </div>

          <p style={styles.loginLink}>
            3ndek compte?{' '}
            <Link to="/login" style={styles.link}>Connexion</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', minHeight: '100vh', background: '#f5f5f0', fontFamily: 'sans-serif' },
  leftPanel: { flex: '0 0 42%', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' },
  bgPhoto: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' },
  overlay: { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,61,38,0.3) 0%, rgba(15,61,38,0.9) 100%)' },
  brandContent: { position: 'relative', zIndex: 2, padding: '32px 28px', width: '100%' },
  logoCircle: { width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.5)', marginBottom: 14 },
  brandName: { color: '#fff', fontSize: 26, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.5px' },
  brandTagline: { color: 'rgba(255,255,255,0.8)', fontSize: 13, lineHeight: 1.6, margin: '0 0 18px' },
  badges: { display: 'flex', gap: 7, flexWrap: 'wrap', marginBottom: 20 },
  badge: { background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 11, fontWeight: 500, padding: '5px 11px', borderRadius: 20, backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.25)' },
  trustBox: { display: 'flex', flexDirection: 'column', gap: 6 },
  trustItem: { color: 'rgba(255,255,255,0.85)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 7 },
  trustIcon: { background: 'rgba(255,255,255,0.25)', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 },
  rightPanel: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', overflowY: 'auto' },
  formCard: { width: '100%', maxWidth: 400 },
  formHeader: { marginBottom: 24 },
  formTitle: { fontSize: 26, fontWeight: 700, color: '#1a1a1a', margin: '0 0 6px', letterSpacing: '-0.5px' },
  formSub: { fontSize: 14, color: '#777', margin: 0 },
  errorBox: { display: 'flex', alignItems: 'center', gap: 8, background: '#fff0f0', border: '1px solid #ffcccc', borderRadius: 10, padding: '11px 14px', fontSize: 13, color: '#c0392b', marginBottom: 16 },
  field: { marginBottom: 14 },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 6 },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: 12, fontSize: 15, pointerEvents: 'none' },
  input: { width: '100%', padding: '11px 14px 11px 38px', borderRadius: 12, border: '1.5px solid #e0e0e0', fontSize: 14, color: '#1a1a1a', background: '#fafafa', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s' },
  fieldError: { margin: '5px 0 0', fontSize: 11, color: '#e74c3c' },
  submitBtn: { width: '100%', padding: '14px', background: 'linear-gradient(135deg,#1a5c3a,#0f3d26)', color: '#fff', border: 'none', borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 8, boxShadow: '0 4px 14px rgba(26,92,58,0.35)' },
  divider: { display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0' },
  dividerLine: { flex: 1, height: 1, background: '#e5e5e5' },
  dividerText: { fontSize: 12, color: '#aaa', fontWeight: 500 },
  loginLink: { textAlign: 'center', fontSize: 14, color: '#666', margin: 0 },
  link: { color: '#1a5c3a', fontWeight: 600, textDecoration: 'none' },
};