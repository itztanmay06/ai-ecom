import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bell, Trash2, TrendingDown, TrendingUp, Filter, CheckCircle2, PlusCircle, ExternalLink } from 'lucide-react';
export default function Watchlist() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Recently Added');
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist_items');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse watchlist_items:", e);
      }
    }
    return [];
  });
  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('watchlist_items');
      if (saved !== null) {
        try {
          setWatchlist(JSON.parse(saved));
        } catch (e) {
          setWatchlist([]);
        }
      } else {
        setWatchlist([]);
      }
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('watchlist_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('watchlist_updated', handleSync);
    };
  }, []);
  const removeItem = (id) => {
    const updated = watchlist.filter(item => (item.id || item.product_id) !== id);
    setWatchlist(updated);
    localStorage.setItem('watchlist_items', JSON.stringify(updated));
    window.dispatchEvent(new Event('watchlist_updated'));
  };
  let filteredWatchlist = activeCategory === 'All' 
    ? [...watchlist] 
    : watchlist.filter(item => (item.category || '').toLowerCase() === activeCategory.toLowerCase());
  if (sortBy === 'Price: Low to High') {
    filteredWatchlist.sort((a, b) => (Number(a.currentPrice) || 0) - (Number(b.currentPrice) || 0));
  } else if (sortBy === 'Price: High to Low') {
    filteredWatchlist.sort((a, b) => (Number(b.currentPrice) || 0) - (Number(a.currentPrice) || 0));
  }
  return (
    <div style={{ padding: '24px 28px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
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
            <Heart size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>Watchlist</h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>All products you've saved in one place.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '600', backgroundColor: '#ffffff', outline: 'none', cursor: 'pointer' }}
          >
            <option value="Recently Added">Recently Added</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        {['All', 'Laptops', 'Smartphones', 'Monitors'].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1px solid',
              borderColor: activeCategory === cat ? '#00a651' : '#cbd5e1',
              backgroundColor: activeCategory === cat ? '#e6f7ef' : '#ffffff',
              color: activeCategory === cat ? '#00a651' : '#475569',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {cat} ({cat === 'All' ? watchlist.length : watchlist.filter(w => w.category.toLowerCase() === cat.toLowerCase()).length})
          </button>
        ))}
      </div>
      {watchlist.length === 0 ? (
        <div style={{ backgroundColor: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: '16px', padding: '50px 20px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Heart size={28} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>Your Watchlist is Empty</h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px' }}>
            Click the heart icon on any product in the Browse page to save products to your watchlist and track price drops.
          </p>
          <button
            onClick={() => navigate('/browse')}
            style={{ backgroundColor: '#00a651', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 22px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
          >
            Browse Products ↗
          </button>
        </div>
      ) : (
        <div className="card" style={{ padding: '20px', marginBottom: '24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                <th style={{ padding: '12px', width: '320px' }}>Product</th>
                <th style={{ padding: '12px' }}>Current Price</th>
                <th style={{ padding: '12px' }}>Price Trend</th>
                <th style={{ padding: '12px' }}>Lowest Price</th>
                <th style={{ padding: '12px' }}>Added On</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredWatchlist.map(item => (
                <tr key={item.id || item.product_id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '60px', height: '50px', objectFit: 'contain', borderRadius: '6px' }} />
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>{item.name}</h4>
                        <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>{item.specs}</p>
                        <span className="badge badge-emerald">{item.marketplace}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#00a651' }}>₹{Number(item.currentPrice || 0).toLocaleString()}</h4>
                    <span style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'line-through', marginRight: '6px' }}>₹{Number(item.mrp || 0).toLocaleString()}</span>
                    <span style={{ fontSize: '10px', color: '#00a651', fontWeight: '700', backgroundColor: '#e6f7ef', padding: '1px 5px', borderRadius: '4px' }}>{item.discount}</span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: item.trend === 'down' ? '#00a651' : '#ef4444',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {item.trend === 'down' ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                      {item.trendText}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#00a651', display: 'block' }}>₹{item.lowestPrice}</span>
                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>on {item.lowestDate}</span>
                  </td>
                  <td style={{ padding: '14px 12px', color: '#64748b' }}>
                    {item.addedOn}
                  </td>
                  <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      {item.product_url && (
                        <a
                          href={item.product_url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '6px 10px',
                            borderRadius: '8px',
                            border: '1px solid #dbeafe',
                            backgroundColor: '#eff6ff',
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#2563eb',
                            textDecoration: 'none'
                          }}
                        >
                          <span>Deal</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                      <button onClick={() => removeItem(item.id || item.product_id)} title="Remove from Watchlist" style={{ border: '1px solid #fecaca', borderRadius: '8px', padding: '6px', backgroundColor: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{
        backgroundColor: '#f2fbf5',
        border: '1px solid #dcfce7',
        borderRadius: '16px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <Bell size={24} color="#00a651" />
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Never miss a deal!</h4>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Get notified when the price drops for any product in your watchlist.</p>
          </div>
        </div>
        <button style={{ backgroundColor: '#00a651', color: '#ffffff', border: 'none', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
          Enable Price Alerts
        </button>
      </div>
    </div>
  );
}