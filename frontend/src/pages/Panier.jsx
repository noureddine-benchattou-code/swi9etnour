const badgeConfig = {
  bio:   { label: "Bio",   bg: "#c0dd97", color: "#27500a" },
  promo: { label: "Promo", bg: "#f09595", color: "#791f1f" },
  new:   { label: "New",   bg: "#b5d4f4", color: "#0c447c" },
};

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const badge = badgeConfig[item.badge];
  return (
    <div style={styles.cartItem}>
      <div style={styles.itemImgWrap}>
        <img src={item.img} alt={item.nom} style={styles.itemImg} />
        {badge && (
          <div style={{ ...styles.itemBadge, background: badge.bg, color: badge.color }}>{badge.label}</div>
        )}
      </div>

      <div style={styles.itemInfo}>
        <div style={styles.itemName}>{item.nom}</div>
        <div style={styles.itemUnit}>{item.prix} DH / {item.unit}</div>
        <div style={styles.itemQtyRow}>
          <button onClick={() => onDecrease(item.nom)} style={styles.qtyBtn}>−</button>
          <span style={styles.qtyVal}>{item.qty}</span>
          <button onClick={() => onIncrease(item.nom)} style={styles.qtyBtnAdd}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

      <div style={styles.itemRight}>
        <div style={styles.itemTotal}>{(item.prix * item.qty).toFixed(0)} DH</div>
        <button onClick={() => onRemove(item.nom)} style={styles.removeBtn} title="Supprimer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
            <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function EmptyCart() {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>🧺</div>
      <div style={styles.emptyTitle}>Panier khawi</div>
      <div style={styles.emptySub}>Zid chi haja mn les produits 😄</div>
      <a href="/produits" style={styles.emptyBtn}>Voir les produits →</a>
    </div>
  );
}

export default function Panier({ cart = [], onIncrease, onDecrease, onRemove, onClear }) {
  const subtotal = cart.reduce((acc, i) => acc + i.prix * i.qty, 0);
  const totalItems = cart.reduce((acc, i) => acc + i.qty, 0);

  return (
    <div style={styles.page}>

      {/* Page header */}
      <div style={styles.pageHeader}>
        <div style={styles.pageHeaderInner}>
          <div>
            <h1 style={styles.pageTitle}>Panier dyali 🛒</h1>
            <p style={styles.pageSub}>{totalItems} article{totalItems !== 1 ? 's' : ''} sélectionné{totalItems !== 1 ? 's' : ''}</p>
          </div>
          {cart.length > 0 && (
            <button onClick={onClear} style={styles.clearBtn}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
              </svg>
              Vider le panier
            </button>
          )}
        </div>
      </div>

      <div style={styles.mainLayout}>

        {/* ── CART ITEMS ── */}
        <div style={styles.itemsCol}>

          {/* Free delivery banner */}
          {cart.length > 0 && (
            <div style={styles.deliveryBanner}>
              <span style={styles.deliveryIcon}>🎉</span>
              <div>
                <strong style={styles.deliveryTitle}>Livraison gratuite aktivée</strong>
                <span style={styles.deliverySub}> — Promo l'yum!</span>
              </div>
            </div>
          )}

          <div style={styles.itemsList}>
            {cart.length === 0
              ? <EmptyCart />
              : cart.map(item => (
                <CartItem key={item.nom} item={item} onIncrease={onIncrease} onDecrease={onDecrease} onRemove={onRemove} />
              ))
            }
          </div>
        </div>

        {/* ── ORDER SUMMARY ── */}
        {cart.length > 0 && (
          <aside style={styles.summaryCol}>
            <div style={styles.summaryCard}>
              <div style={styles.summaryTitle}>Résumé de la commande</div>

              <div style={styles.summaryRows}>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Sous-total ({totalItems} articles)</span>
                  <span style={styles.summaryVal}>{subtotal.toFixed(0)} DH</span>
                </div>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>Livraison</span>
                  <span style={styles.summaryFree}>Gratuite 🎉</span>
                </div>
                <div style={styles.summaryRow}>
                  <span style={styles.summaryLabel}>TVA incluse</span>
                  <span style={styles.summaryVal}>—</span>
                </div>
              </div>

              <div style={styles.summaryTotal}>
                <span style={styles.summaryTotalLabel}>Total</span>
                <span style={styles.summaryTotalVal}>{subtotal.toFixed(0)} DH</span>
              </div>

              <button style={styles.checkoutBtn}>
                Confirmer la commande
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>

              <div style={styles.secureBadges}>
                <span style={styles.secureBadge}>🔒 Paiement sécurisé</span>
                <span style={styles.secureBadge}>📦 Livraison rapide</span>
              </div>
            </div>

            {/* Order items recap */}
            <div style={styles.recapCard}>
              <div style={styles.recapTitle}>Articles ({cart.length})</div>
              {cart.map(item => (
                <div key={item.nom} style={styles.recapRow}>
                  <span style={styles.recapName}>{item.nom}</span>
                  <span style={styles.recapQty}>×{item.qty}</span>
                  <span style={styles.recapPrice}>{(item.prix * item.qty).toFixed(0)} DH</span>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { fontFamily: 'sans-serif', background: '#f8f9f5', minHeight: '100vh' },

  pageHeader: {
    background: 'linear-gradient(135deg, #1a5c3a, #0f3d26)',
    padding: '28px 40px',
  },
  pageHeaderInner: {
    maxWidth: 1200, margin: '0 auto',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  },
  pageTitle: { fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 4px', letterSpacing: '-0.5px' },
  pageSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', margin: 0 },
  clearBtn: {
    display: 'flex', alignItems: 'center', gap: 7,
    background: 'rgba(232,96,58,0.15)',
    color: '#ffb49a', border: '1px solid rgba(232,96,58,0.35)',
    borderRadius: 10, padding: '8px 16px',
    fontSize: 13, fontWeight: 500, cursor: 'pointer',
  },

  mainLayout: {
    maxWidth: 1200, margin: '0 auto',
    padding: '32px 40px',
    display: 'flex', gap: 28, alignItems: 'flex-start',
  },

  itemsCol: { flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 },

  deliveryBanner: {
    background: '#eaf3de',
    borderRadius: 12, padding: '14px 18px',
    display: 'flex', alignItems: 'center', gap: 12,
    border: '1px solid #c0dd97',
  },
  deliveryIcon: { fontSize: 20, flexShrink: 0 },
  deliveryTitle: { fontSize: 13, color: '#27500a' },
  deliverySub: { fontSize: 13, color: '#27500a', fontWeight: 400 },

  itemsList: { display: 'flex', flexDirection: 'column', gap: 12 },

  cartItem: {
    background: '#fff', borderRadius: 16,
    border: '1px solid #ebebeb', padding: '16px 18px',
    display: 'flex', alignItems: 'center', gap: 16,
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  itemImgWrap: {
    width: 80, height: 80, borderRadius: 12,
    overflow: 'hidden', flexShrink: 0, position: 'relative',
  },
  itemImg: { width: '100%', height: '100%', objectFit: 'cover' },
  itemBadge: {
    position: 'absolute', top: 4, left: 4,
    fontSize: 9, fontWeight: 600, padding: '1px 6px', borderRadius: 6,
  },
  itemInfo: { flex: 1, minWidth: 0 },
  itemName: { fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 3 },
  itemUnit: { fontSize: 12, color: '#aaa', marginBottom: 12 },
  itemQtyRow: { display: 'flex', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: '50%',
    border: '1.5px solid #e0e0e0', background: '#fff',
    cursor: 'pointer', fontSize: 18, color: '#555',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  qtyVal: { fontSize: 15, fontWeight: 700, color: '#1a1a1a', minWidth: 24, textAlign: 'center' },
  qtyBtnAdd: {
    width: 30, height: 30, borderRadius: '50%',
    background: '#1a5c3a', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  itemRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 },
  itemTotal: { fontSize: 18, fontWeight: 800, color: '#1a5c3a' },
  removeBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#ccc', padding: 4, borderRadius: 6,
    transition: 'color 0.15s',
  },

  emptyState: {
    textAlign: 'center', padding: '80px 24px',
    background: '#fff', borderRadius: 16, border: '1px solid #ebebeb',
  },
  emptyIcon: { fontSize: 56, marginBottom: 14 },
  emptyTitle: { fontSize: 18, fontWeight: 700, color: '#333', marginBottom: 8 },
  emptySub: { fontSize: 13, color: '#aaa', marginBottom: 20 },
  emptyBtn: {
    display: 'inline-block',
    background: '#1a5c3a', color: '#fff', textDecoration: 'none',
    borderRadius: 10, padding: '11px 22px', fontSize: 13, fontWeight: 600,
  },

  summaryCol: { width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14 },
  summaryCard: {
    background: '#fff', borderRadius: 16,
    border: '1px solid #ebebeb', padding: '22px 20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
  },
  summaryTitle: { fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 18 },
  summaryRows: { display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 13, color: '#888' },
  summaryVal: { fontSize: 13, color: '#333', fontWeight: 500 },
  summaryFree: { fontSize: 13, color: '#27500a', fontWeight: 700 },
  summaryTotal: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    borderTop: '1.5px solid #f0f0f0', paddingTop: 14, marginBottom: 18,
  },
  summaryTotalLabel: { fontSize: 16, fontWeight: 700, color: '#1a1a1a' },
  summaryTotalVal: { fontSize: 24, fontWeight: 800, color: '#1a5c3a' },
  checkoutBtn: {
    width: '100%', padding: '15px',
    background: 'linear-gradient(135deg, #1a5c3a, #0f3d26)',
    color: '#fff', border: 'none', borderRadius: 12,
    fontSize: 15, fontWeight: 700, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    boxShadow: '0 4px 14px rgba(26,92,58,0.35)',
    marginBottom: 14,
  },
  secureBadges: { display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' },
  secureBadge: { fontSize: 11, color: '#aaa' },

  recapCard: {
    background: '#fff', borderRadius: 14,
    border: '1px solid #ebebeb', padding: '16px 18px',
  },
  recapTitle: { fontSize: 12, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 },
  recapRow: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '6px 0', borderBottom: '1px solid #f5f5f5',
  },
  recapName: { flex: 1, fontSize: 12, color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  recapQty: { fontSize: 12, color: '#aaa', flexShrink: 0 },
  recapPrice: { fontSize: 12, fontWeight: 700, color: '#1a5c3a', flexShrink: 0 },
};