import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  TrendingDown, 
  ShieldAlert, 
  Sparkles, 
  HelpCircle,
  X,
  Laptop
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function PriceDropAlerts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState('');
  const [newTargetPrice, setNewTargetPrice] = useState('');
  const [newMarketplace, setNewMarketplace] = useState('Flipkart');
  const [userEmail, setUserEmail] = useState(() => {
    const saved = localStorage.getItem('shopintel_user');
    if (saved) {
      try {
        return JSON.parse(saved).email || 'aiecom@gmail.com';
      } catch (e) {}
    }
    return 'aiecom@gmail.com';
  });
  const defaultAlerts = [
    {
      id: 'alert-1',
      name: 'ASUS ROG Strix G16 (2024)',
      category: 'Laptops',
      image: '/images/laptop.png',
      targetPrice: 85000,
      currentPrice: 89990,
      marketplace: 'Flipkart',
      active: true,
      triggered: false,
      product_url: 'https://www.flipkart.com',
      createdDate: '24 Sep 2026'
    },
    {
      id: 'alert-2',
      name: 'Apple MacBook Air M2 (8GB / 256GB)',
      category: 'Laptops',
      image: '/images/laptop.png',
      targetPrice: 82000,
      currentPrice: 89990,
      marketplace: 'Croma',
      active: true,
      triggered: false,
      product_url: 'https://www.croma.com',
      createdDate: '22 Sep 2026'
    },
    {
      id: 'alert-3',
      name: 'Lenovo Legion 5 (RTX 4060, 16GB RAM)',
      category: 'Laptops',
      image: '/images/laptop.png',
      targetPrice: 115000,
      currentPrice: 119990,
      marketplace: 'Amazon',
      active: true,
      triggered: false,
      product_url: 'https://www.amazon.in',
      createdDate: '20 Sep 2026'
    },
    {
      id: 'alert-4',
      name: 'Acer Aspire 3 Intel Core i3 12th Gen',
      category: 'Laptops',
      image: '/images/laptop.png',
      targetPrice: 27000,
      currentPrice: 25990,
      marketplace: 'Flipkart',
      active: false,
      triggered: true,
      product_url: 'https://www.flipkart.com',
      createdDate: '18 Sep 2026',
      triggeredDate: '25 Sep 2026'
    }
  ];
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('price_alerts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    localStorage.setItem('price_alerts', JSON.stringify(defaultAlerts));
    return defaultAlerts;
  });
  const saveAlerts = (newAlerts) => {
    setAlerts(newAlerts);
    localStorage.setItem('price_alerts', JSON.stringify(newAlerts));
    window.dispatchEvent(new Event('alerts_updated'));
  };
  const toggleAlertActive = (id) => {
    const updated = alerts.map(a => a.id === id ? { ...a, active: !a.active } : a);
    saveAlerts(updated);
  };
  const deleteAlert = (id) => {
    const updated = alerts.filter(a => a.id !== id);
    saveAlerts(updated);
  };
  const handleCreateAlert = (e) => {
    e.preventDefault();
    if (!newProduct.trim() || !newTargetPrice) return;
    const targetVal = Number(newTargetPrice);
    const newEntry = {
      id: `alert-${Date.now()}`,
      name: newProduct.trim(),
      category: 'Laptops',
      image: '/images/laptop.png',
      targetPrice: targetVal,
      currentPrice: Math.round(targetVal * 1.08),
      marketplace: newMarketplace,
      active: true,
      triggered: false,
      product_url: 'https://www.flipkart.com',
      createdDate: 'Today'
    };
    saveAlerts([newEntry, ...alerts]);
    setNewProduct('');
    setNewTargetPrice('');
    setShowAddModal(false);
  };
  const activeAlerts = alerts.filter(a => !a.triggered);
  const triggeredAlerts = alerts.filter(a => a.triggered);
  const currentList = activeTab === 'active' ? activeAlerts : triggeredAlerts;
  return (
    <div style={{ padding: '24px 28px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: '#e6f7ef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#00a651'
          }}>
            <Bell size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>Price Drop Alerts</h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Get notified when prices drop on your favorite products.</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#00a651',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            padding: '9px 18px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,166,81,0.25)'
          }}
        >
          <Plus size={16} />
          <span>Add New Alert</span>
        </button>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('active')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            borderRadius: '999px',
            border: '1px solid',
            borderColor: activeTab === 'active' ? '#00a651' : '#cbd5e1',
            backgroundColor: activeTab === 'active' ? '#e6f7ef' : '#ffffff',
            color: activeTab === 'active' ? '#00a651' : '#475569',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <span>Active Alerts</span>
          <span style={{
            backgroundColor: activeTab === 'active' ? '#00a651' : '#f1f5f9',
            color: activeTab === 'active' ? '#ffffff' : '#64748b',
            borderRadius: '999px',
            padding: '2px 8px',
            fontSize: '11px',
            fontWeight: '800'
          }}>
            {activeAlerts.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('triggered')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            borderRadius: '999px',
            border: '1px solid',
            borderColor: activeTab === 'triggered' ? '#00a651' : '#cbd5e1',
            backgroundColor: activeTab === 'triggered' ? '#e6f7ef' : '#ffffff',
            color: activeTab === 'triggered' ? '#00a651' : '#475569',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          <span>Triggered Alerts</span>
          <span style={{
            backgroundColor: activeTab === 'triggered' ? '#00a651' : '#f1f5f9',
            color: activeTab === 'triggered' ? '#ffffff' : '#64748b',
            borderRadius: '999px',
            padding: '2px 8px',
            fontSize: '11px',
            fontWeight: '800'
          }}>
            {triggeredAlerts.length}
          </span>
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px', alignItems: 'start' }}>
        <div>
          {currentList.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: '16px', padding: '50px 20px', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#e6f7ef', color: '#00a651', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <Bell size={24} />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                {activeTab === 'active' ? 'No Active Alerts' : 'No Triggered Alerts Yet'}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>
                {activeTab === 'active' 
                  ? 'Set a target price on any laptop to receive instant notifications when it drops.'
                  : 'When prices drop below your targets, they will appear here.'}
              </p>
              {activeTab === 'active' && (
                <button
                  onClick={() => setShowAddModal(true)}
                  style={{ backgroundColor: '#00a651', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Create Your First Alert +
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {currentList.map(alert => {
                const diff = (alert.currentPrice || 0) - (alert.targetPrice || 0);
                const isPriceDropped = diff <= 0;
                return (
                  <div
                    key={alert.id}
                    className="card"
                    style={{
                      padding: '18px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      borderLeft: isPriceDropped ? '4px solid #00a651' : '1px solid #e2e8f0',
                      transition: 'box-shadow 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      <img
                        src={alert.image || "/images/laptop.png"}
                        alt={alert.name}
                        onError={(e) => { e.target.src = "/images/laptop.png"; }}
                        style={{ width: '64px', height: '54px', objectFit: 'contain', borderRadius: '8px', flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {alert.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '12px', color: '#475569', fontWeight: '600' }}>
                            Notify me below <strong style={{ color: '#00a651' }}>₹{Number(alert.targetPrice).toLocaleString()}</strong>
                          </span>
                          <span className="badge badge-emerald" style={{ fontSize: '9px' }}>
                            {alert.marketplace || 'Store'}
                          </span>
                        </div>
                        <div style={{ marginTop: '4px', fontSize: '11px', fontWeight: '600' }}>
                          {isPriceDropped ? (
                            <span style={{ color: '#00a651', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <CheckCircle2 size={12} /> Target Reached! Dropped ₹{Math.abs(diff).toLocaleString()} below target
                            </span>
                          ) : (
                            <span style={{ color: '#64748b' }}>
                              ₹{diff.toLocaleString()} away from target price
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '100px' }}>
                      <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Current:</span>
                      <span style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>
                        ₹{Number(alert.currentPrice).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <button
                        type="button"
                        onClick={() => toggleAlertActive(alert.id)}
                        title={alert.active ? "Alert active" : "Alert paused"}
                        style={{
                          width: '42px',
                          height: '24px',
                          borderRadius: '999px',
                          backgroundColor: alert.active ? '#00a651' : '#cbd5e1',
                          border: 'none',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                          transition: 'background-color 0.25s',
                          position: 'relative'
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#ffffff',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          transform: alert.active ? 'translateX(18px)' : 'translateX(0)',
                          transition: 'transform 0.25s'
                        }} />
                      </button>
                      <a
                        href={alert.product_url || '#'}
                        target="_blank"
                        rel="noreferrer"
                        title="View deal on store"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: '1px solid #dbeafe',
                          backgroundColor: '#eff6ff',
                          color: '#2563eb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textDecoration: 'none'
                        }}
                      >
                        <ExternalLink size={14} />
                      </a>
                      <button
                        type="button"
                        onClick={() => deleteAlert(alert.id)}
                        title="Delete alert"
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          border: '1px solid #fecaca',
                          backgroundColor: '#fef2f2',
                          color: '#ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#00a651',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '11px 22px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              marginTop: '20px',
              boxShadow: '0 2px 6px rgba(0,166,81,0.2)'
            }}
          >
            <Plus size={16} />
            <span>+ Add New Alert</span>
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '24px', backgroundColor: '#ffffff' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>
              How it works?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e6f7ef', color: '#00a651', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800', fontSize: '12px' }}>
                  1
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>Add a product and set your target price.</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Pick any laptop and choose the price point you want to buy at.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800', fontSize: '12px' }}>
                  2
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>We monitor prices 24/7 across all major marketplaces.</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Our automated scrapers track Amazon, Flipkart, Croma & Reliance Digital continuously.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800', fontSize: '12px' }}>
                  3
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>Get instant notifications on email and in-app when price drops.</h4>
                  <p style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4 }}>Alerts sent directly to <strong>{userEmail}</strong> the second the deal goes live.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: '22px', backgroundColor: '#f8fafc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <ShieldAlert size={18} color="#00a651" />
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>AI Scam & Price Scanner</h4>
            </div>
            <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, marginBottom: '14px' }}>
              ShopIntel monitors <strong>498+ live price points</strong>. We flag artificial MRP spikes so you only buy when discounts are authentic.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Status</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#00a651', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00a651' }}></span>
                Active Monitoring
              </span>
            </div>
          </div>
        </div>
      </div>
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '480px',
            padding: '28px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowAddModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                border: 'none',
                background: 'none',
                color: '#94a3b8',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#e6f7ef', color: '#00a651', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bell size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Create Price Alert</h3>
                <p style={{ fontSize: '12px', color: '#64748b' }}>We will notify you immediately when price drops.</p>
              </div>
            </div>
            <form onSubmit={handleCreateAlert} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. ASUS TUF Gaming F15 or MacBook Air"
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Target Price (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 75000"
                    value={newTargetPrice}
                    onChange={(e) => setNewTargetPrice(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Marketplace</label>
                  <select
                    value={newMarketplace}
                    onChange={(e) => setNewMarketplace(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#ffffff', outline: 'none', boxSizing: 'border-box' }}
                  >
                    <option value="Flipkart">Flipkart</option>
                    <option value="Amazon">Amazon</option>
                    <option value="Croma">Croma</option>
                    <option value="Reliance Digital">Reliance Digital</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px' }}>Notification Email</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '13px', fontWeight: '700', color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', backgroundColor: '#00a651', fontSize: '13px', fontWeight: '700', color: '#ffffff', cursor: 'pointer' }}
                >
                  Set Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}