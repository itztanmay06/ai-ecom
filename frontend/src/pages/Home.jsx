import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  ArrowRight, 
  BarChart2 
} from 'lucide-react';
export default function Home() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(() => {
    const saved = localStorage.getItem('shopintel_user');
    if (saved) {
      try {
        return JSON.parse(saved).name || 'Tanmay';
      } catch (e) {}
    }
    return 'Tanmay';
  });
  const [fakeDiscountsCount, setFakeDiscountsCount] = useState(50);
  const [arbitrageCount, setArbitrageCount] = useState(50);
  const [bestValueProd, setBestValueProd] = useState({
    title: 'Acer Aspire 3',
    vdi: '31.63',
    priceText: 'Under ₹30,000',
    image: '/images/laptop.png'
  });
  const [bestPriceProd, setBestPriceProd] = useState({
    price: '₹89,990',
    name: 'Asus ROG Strix G16',
    store: 'on Reliance Digital',
    savingsTag: '69% less than Amazon'
  });
  useEffect(() => {
    fetch('http://127.0.0.1:8000/fake-discounts?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.count === 'number' && data.count > 0) {
          setFakeDiscountsCount(data.count);
        }
      })
      .catch(() => {});
    fetch('http://127.0.0.1:8000/arbitrage?limit=100')
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.count === 'number' && data.count > 0) {
          setArbitrageCount(data.count);
        }
        if (data && data.deals && data.deals.length > 0) {
          const topDeal = data.deals[0];
          const modelName = (topDeal.model && topDeal.model !== 'Unknown') ? topDeal.model : 'ROG Strix G16';
          setBestPriceProd({
            price: `₹${Number(topDeal.cheapest_price).toLocaleString()}`,
            name: `${topDeal.brand || ''} ${modelName}`.trim(),
            store: `on ${topDeal.cheapest_marketplace || 'Reliance Digital'}`,
            savingsTag: `${Math.round(topDeal.savings_percentage || 69)}% less than ${topDeal.priciest_marketplace || 'Amazon'}`
          });
        }
      })
      .catch(() => {});
    fetch('http://127.0.0.1:8000/value-champions?limit=1')
      .then(res => res.json())
      .then(data => {
        if (data && data.champions && data.champions.length > 0) {
          const champ = data.champions[0];
          const namePart = (champ.brand && champ.model && champ.model !== 'Unknown') 
            ? `${champ.brand} ${champ.model}` 
            : (champ.product_name ? champ.product_name.split(' ').slice(0, 3).join(' ') : 'Acer Aspire 3');
          setBestValueProd({
            title: namePart,
            vdi: champ.value_density_index ? Number(champ.value_density_index).toFixed(2) : '31.63',
            priceText: `Under ₹${(Math.ceil(Number(champ.current_price || 25990)/10000)*10000).toLocaleString()}`,
            image: champ.image_url || '/images/laptop.png'
          });
        }
      })
      .catch(() => {});
  }, []);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist_items');
    return saved ? JSON.parse(saved) : [];
  });
  const toggleWatchlist = (item) => {
    const itemKey = item.product_id || item.id;
    const exists = watchlist.some(w => (w.product_id || w.id) === itemKey);
    let updated;
    if (exists) {
      updated = watchlist.filter(w => (w.product_id || w.id) !== itemKey);
    } else {
      updated = [...watchlist, item];
    }
    setWatchlist(updated);
    localStorage.setItem('watchlist_items', JSON.stringify(updated));
    window.dispatchEvent(new Event('watchlist_updated'));
  };
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('recently_viewed');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    const defaults = [
      {
        id: 'rec-1',
        product_id: 'rec-1',
        name: 'ASUS TUF F15',
        price: 78990,
        image: '/images/laptop.png',
        product_url: 'https://www.amazon.in',
        marketplace: 'Amazon'
      },
      {
        id: 'rec-2',
        product_id: 'rec-2',
        name: 'OnePlus 12R',
        price: 42999,
        image: '/images/cat smartphone.png',
        product_url: 'https://www.amazon.in',
        marketplace: 'Amazon'
      },
      {
        id: 'rec-3',
        product_id: 'rec-3',
        name: 'LG UltraGear 24"',
        price: 12999,
        image: '/images/monitor.png',
        product_url: 'https://www.amazon.in',
        marketplace: 'Amazon'
      }
    ];
    localStorage.setItem('recently_viewed', JSON.stringify(defaults));
    return defaults;
  });
  useEffect(() => {
    const handleSync = () => {
      const savedUser = localStorage.getItem('shopintel_user');
      if (savedUser) {
        try {
          setUserName(JSON.parse(savedUser).name || 'Tanmay');
        } catch (e) {}
      }
      const saved = localStorage.getItem('recently_viewed');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setRecentlyViewed(parsed);
        } catch (e) {}
      }
    };
    window.addEventListener('recently_viewed_updated', handleSync);
    window.addEventListener('user_session_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('recently_viewed_updated', handleSync);
      window.removeEventListener('user_session_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);
  const topDeals = [
    {
      id: 'deal-1',
      title: 'Lenovo LOQ 15',
      specs: 'RTX 4050 | 16GB RAM',
      price: 62990,
      mrp: 96990,
      discount: '35% OFF',
      marketplace: 'Flipkart',
      logo: 'f',
      badgeClass: 'flipkart-badge',
      badgeBg: '#10b981',
      image: '/images/laptop.png'
    },
    {
      id: 'deal-2',
      title: 'iQOO Neo 9 Pro',
      specs: '12GB RAM | 256GB',
      price: 29999,
      mrp: 41999,
      discount: '28% OFF',
      marketplace: 'Amazon',
      logo: 'a',
      badgeClass: 'amazon-badge',
      badgeBg: '#6366f1',
      image: '/images/cat smartphone.png'
    },
    {
      id: 'deal-3',
      title: 'Samsung S24',
      specs: '8GB RAM | 256GB',
      price: 54999,
      mrp: 74999,
      discount: '27% OFF',
      marketplace: 'Croma',
      logo: 'C',
      badgeClass: 'croma-badge',
      badgeBg: '#0891b2',
      image: '/images/cat smartphone.png'
    }
  ];
  return (
    <div className="dashboard" style={{ paddingTop: '16px', overflowY: 'visible', height: 'auto' }}>
      <div className="welcome-section">
        <div className="welcome-card">
          <div className="welcome-content">
            <h1 className="welcome-title">Welcome back, <span className="highlight-name">{userName}!</span> 👋</h1>
            <h2 className="welcome-subtitle">Shop Smarter with AI</h2>
            <p className="welcome-desc">Compare prices, track deals, and make better buying decisions across top marketplaces.</p>
          </div>
        </div>
        <div className="ai-assistant-card" onClick={() => navigate('/assistant')} style={{ cursor: 'pointer' }}>
          <div className="ai-content">
            <h3 className="ai-greeting">Good morning, <span className="highlight-name">{userName}!</span> 👋</h3>
            <p className="ai-title">I&apos;m your AI Shopping Assistant.</p>
            <p className="ai-desc">Ask me anything about products, prices, deals or comparisons across marketplaces.</p>
          </div>
          <div className="ai-robot">
            <div className="robot-glow" />
            <img src="/images/robot.png" alt="AI Robot Assistant" />
          </div>
        </div>
      </div>
      <div className="stats-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <div className="stat-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '14px 16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '145px', position: 'relative' }}>
          <div>
            <div className="stat-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#00b050">
                <path d="M21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9a2 2 0 0 0 2.83 0l7-7a2 2 0 0 0 0-2.84zM6.5 7.5A1.5 1.5 0 1 1 8 6a1.5 1.5 0 0 1-1.5 1.5z"/>
              </svg>
              <span className="stat-label" style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Best Price Today</span>
            </div>
            <div className="stat-value" style={{ fontSize: '24px', fontWeight: '800', color: '#00b050', lineHeight: '1.15', marginBottom: '4px' }}>
              {bestPriceProd.price}
            </div>
            <p className="stat-product-name" style={{ fontSize: '12.5px', fontWeight: '500', color: '#475569', margin: 0, lineHeight: '1.25' }}>
              {bestPriceProd.name}
            </p>
            <p className="stat-sub" style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', marginTop: '1px' }}>
              {bestPriceProd.store}
            </p>
          </div>
          <div className="stat-footer" style={{ marginTop: 'auto' }}>
            <span className="comparison-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#e6f7ef', color: '#00a651', fontSize: '11.5px', fontWeight: '600', padding: '4px 10px', borderRadius: '6px' }}>
              <span className="arrow-down" style={{ fontWeight: '700' }}>↓</span> {bestPriceProd.savingsTag}
            </span>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '14px 16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '145px', position: 'relative' }}>
          <div>
            <div className="stat-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#ef4444">
                <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3zm1 14h-2v-2h2v2zm0-4h-2V8h2v4z"/>
              </svg>
              <span className="stat-label" style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Fake Discounts Found</span>
            </div>
            <div className="stat-value" style={{ fontSize: '24px', fontWeight: '800', color: '#ef4444', lineHeight: '1.15', marginBottom: '4px' }}>
              {fakeDiscountsCount}
            </div>
            <p className="stat-product-name" style={{ fontSize: '12.5px', fontWeight: '500', color: '#475569', margin: 0, lineHeight: '1.25' }}>
              Products with deceptive
            </p>
            <p className="stat-sub" style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', marginTop: '1px' }}>
              MRP detected
            </p>
          </div>
          <div className="stat-footer" style={{ marginTop: 'auto' }}>
            <button 
              className="stat-cta-btn" 
              onClick={() => navigate('/alerts')}
              style={{ background: '#fef2f2', color: '#ef4444', fontSize: '12px', fontWeight: '700', padding: '6px 14px', borderRadius: '7px', border: 'none', cursor: 'pointer', transition: 'all 0.15s ease' }}
            >
              View All Alerts
            </button>
          </div>
        </div>
        <div className="stat-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '14px 16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '145px', position: 'relative' }}>
          <div>
            <div className="stat-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9"></polyline>
                <path d="M3 5h18"></path>
                <polyline points="7 23 3 19 7 15"></polyline>
                <path d="M21 19H3"></path>
              </svg>
              <span className="stat-label" style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Arbitrage Opportunities</span>
            </div>
            <div className="stat-value" style={{ fontSize: '24px', fontWeight: '800', color: '#2563eb', lineHeight: '1.15', marginBottom: '4px' }}>
              {arbitrageCount}
            </div>
            <p className="stat-product-name" style={{ fontSize: '12.5px', fontWeight: '500', color: '#475569', margin: 0, lineHeight: '1.25' }}>
              Products with price gaps
            </p>
            <p className="stat-sub" style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', marginTop: '1px' }}>
              &gt; ₹5,000
            </p>
          </div>
          <div className="stat-footer" style={{ marginTop: 'auto' }}>
            <button 
              className="stat-cta-btn" 
              onClick={() => navigate('/deals')}
              style={{ background: '#eff6ff', color: '#2563eb', fontSize: '12px', fontWeight: '700', padding: '6px 14px', borderRadius: '7px', border: 'none', cursor: 'pointer', transition: 'all 0.15s ease' }}
            >
              View Opportunities
            </button>
          </div>
        </div>
        <div className="stat-card stat-card-overflow" style={{ background: '#ffffff', borderRadius: '12px', padding: '14px 16px', border: '1px solid #f1f5f9', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '145px', position: 'relative', overflow: 'hidden' }}>
          <div>
            <div className="stat-header" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#7c3aed">
                <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V18H8v2h8v-2h-3v-2.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
              </svg>
              <span className="stat-label" style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Best Value Product</span>
            </div>
            <div className="stat-value-text" style={{ fontSize: '16px', fontWeight: '800', color: '#7c3aed', lineHeight: '1.2', marginBottom: '4px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {bestValueProd.title}
            </div>
            <p className="stat-product-name" style={{ fontSize: '12.5px', fontWeight: '500', color: '#475569', margin: 0, lineHeight: '1.25' }}>
              VDI Score: {bestValueProd.vdi}
            </p>
            <p className="stat-sub" style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', marginTop: '1px' }}>
              {bestValueProd.priceText}
            </p>
          </div>
          <div className="stat-footer" style={{ marginTop: 'auto' }}>
            <button 
              className="stat-cta-btn" 
              onClick={() => navigate('/compare')}
              style={{ background: '#f3e8ff', color: '#7c3aed', fontSize: '12px', fontWeight: '700', padding: '6px 14px', borderRadius: '7px', border: 'none', cursor: 'pointer', transition: 'all 0.15s ease' }}
            >
              View Details
            </button>
          </div>
          <div className="stat-peek-image" style={{ position: 'absolute', right: '-12px', top: '4px', bottom: '4px', width: '135px', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={bestValueProd.image} alt="Best Value Product" onError={(e) => { e.target.src = "/images/laptop.png"; }} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', alignItems: 'start', marginTop: '20px' }}>
        <div className="category-section" style={{ flex: '1', minWidth: '350px' }}>
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h2 className="section-title" style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Browse by Category</h2>
            <span onClick={() => navigate('/browse')} className="view-all-link" style={{ color: '#00a651', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              View All Categories <ArrowRight size={14} />
            </span>
          </div>
          <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 185px)', gap: '16px' }}>
            <div className="category-card" style={{ backgroundColor: '#eef4ff', width: '185px', padding: '16px 14px 14px', borderRadius: '16px', textAlign: 'center', cursor: 'pointer', border: '1px solid #f1f5f9', transition: 'all 0.2s ease' }} onClick={() => navigate('/browse?category=Laptops')}>
              <div className="category-img" style={{ width: '100%', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <img src="/images/laptop.png" alt="Laptops" style={{ maxHeight: '64px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <span className="category-name" style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Laptops</span>
            </div>
            <div className="category-card" style={{ backgroundColor: '#f0fdf4', width: '185px', padding: '16px 14px 14px', borderRadius: '16px', textAlign: 'center', cursor: 'pointer', border: '1px solid #f1f5f9', transition: 'all 0.2s ease' }} onClick={() => navigate('/browse?category=Smartphones')}>
              <div className="category-img" style={{ width: '100%', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <img src="/images/cat smartphone.png" alt="Smartphones" style={{ maxHeight: '64px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <span className="category-name" style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Smartphones</span>
            </div>
            <div className="category-card" style={{ backgroundColor: '#f0f0ff', width: '185px', padding: '16px 14px 14px', borderRadius: '16px', textAlign: 'center', cursor: 'pointer', border: '1px solid #f1f5f9', transition: 'all 0.2s ease' }} onClick={() => navigate('/browse?category=Monitors')}>
              <div className="category-img" style={{ width: '100%', height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <img src="/images/monitor.png" alt="Monitors" style={{ maxHeight: '64px', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <span className="category-name" style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Monitors</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '20px', flexShrink: 0 }}>
          <div className="recent-section" style={{ width: '340px', flex: '0 0 340px', background: '#ffffff', borderRadius: '16px', padding: '20px 22px', border: '1px solid #f1f5f9', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 className="section-title" style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Recently Viewed</h2>
              <span onClick={() => navigate('/browse')} className="view-all-link-sm" style={{ color: '#00a651', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>View All</span>
            </div>
            <div className="recent-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recentlyViewed.slice(0, 3).map((item, idx) => {
                const itemKey = item.product_id || item.id || idx;
                const isFav = watchlist.some(w => (w.product_id || w.id) === itemKey);
                return (
                  <div key={idx} className="recent-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: idx === 2 ? '0' : '12px', borderBottom: idx === 2 ? 'none' : '1px solid #f8fafc' }}>
                    <div 
                      className="recent-thumb" 
                      onClick={() => {
                        if (item.product_url && item.product_url !== '#') {
                          window.open(item.product_url, '_blank');
                        } else {
                          navigate('/browse');
                        }
                      }}
                      style={{ cursor: 'pointer', width: '50px', height: '50px', background: '#f8fafc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '4px' }}
                    >
                      <img src={item.image || item.image_url} alt={item.name} onError={(e) => { e.target.src = "/images/laptop.png"; }} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <div 
                      className="recent-info" 
                      onClick={() => {
                        if (item.product_url && item.product_url !== '#') {
                          window.open(item.product_url, '_blank');
                        } else {
                          navigate('/browse');
                        }
                      }}
                      style={{ cursor: 'pointer', flex: 1, minWidth: 0 }}
                    >
                      <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', margin: '0 0 2px 0', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                      <span className="recent-price" style={{ fontSize: '13.5px', fontWeight: '700', color: '#00b050' }}>₹{item.price ? Number(item.price).toLocaleString() : 'N/A'}</span>
                    </div>
                    <button className="heart-btn" onClick={() => toggleWatchlist(item)} title={isFav ? 'Remove from Watchlist' : 'Add to Watchlist'} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                      <Heart size={18} color={isFav ? '#ef4444' : '#9ca3af'} fill={isFav ? '#ef4444' : 'none'} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="quick-section" style={{ width: '280px', flex: '0 0 280px', background: '#ffffff', borderRadius: '16px', padding: '20px 22px', border: '1px solid #f1f5f9', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
            <h2 className="section-title" style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '16px', margin: '0 0 16px 0' }}>Quick Actions</h2>
            <div className="actions-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="action-row" onClick={() => navigate('/compare')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s ease' }}>
                <div className="action-icon-box blue-box" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <div className="action-text">
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: '0 0 1px 0' }}>Compare Products</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Find the best among top picks</p>
                </div>
              </div>
              <div className="action-row" onClick={() => navigate('/alerts')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s ease' }}>
                <div className="action-icon-box green-box" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#e6f7ef', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bell size={18} color="#00a651" />
                </div>
                <div className="action-text">
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: '0 0 1px 0' }}>Set Price Alert</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Get notified on price drops</p>
                </div>
              </div>
              <div className="action-row" onClick={() => navigate('/watchlist')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s ease' }}>
                <div className="action-icon-box pink-box" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Heart size={18} color="#ef4444" />
                </div>
                <div className="action-text">
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: '0 0 1px 0' }}>Build Watchlist</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Save products you love</p>
                </div>
              </div>
              <div className="action-row" onClick={() => navigate('/analytics')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 10px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s ease' }}>
                <div className="action-icon-box purple-box" style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <BarChart2 size={18} color="#2563eb" />
                </div>
                <div className="action-text">
                  <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: '0 0 1px 0' }}>View Analytics</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Explore trends & insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}