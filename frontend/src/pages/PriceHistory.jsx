import React, { useState, useEffect } from 'react';
import { Clock, TrendingDown, TrendingUp, Calendar, ShoppingCart, CheckCircle } from 'lucide-react';
export default function PriceHistory() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [topProduct, setTopProduct] = useState(null);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/price-history?limit=15')
      .then(res => res.json())
      .then(data => {
        if (data && data.history && data.history.length > 0) {
          setHistoryData(data.history);
          setTopProduct(data.history[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching price history:", err);
        setLoading(false);
      });
  }, []);
  const prices = historyData.map(h => Number(h.price || 0)).filter(p => p > 0);
  const highestPrice = prices.length > 0 ? Math.max(...prices) : 109990;
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : 74990;
  const avgPrice = prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 92450;
  const currentPrice = topProduct?.price ? Number(topProduct.price) : 89990;
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
            <Clock size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>Price History</h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Track the historical prices of products and make better buying decisions.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '600', backgroundColor: '#ffffff', outline: 'none' }}>
            <option>Last 6 Months</option>
            <option>Last 3 Months</option>
            <option>Last 1 Year</option>
          </select>
          <select style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: '600', backgroundColor: '#ffffff', outline: 'none' }}>
            <option>All Marketplaces</option>
            <option>Amazon</option>
            <option>Flipkart</option>
          </select>
        </div>
      </div>
      {topProduct && (
        <div className="card" style={{ padding: '24px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img
              src={topProduct.image_url || "/images/laptop.png"}
              alt={topProduct.product_name}
              style={{ width: '120px', height: '90px', objectFit: 'contain' }}
            />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>
                {topProduct.product_name || `${topProduct.brand} ${topProduct.model}`}
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>
                {topProduct.brand} • {topProduct.model || 'Laptop'}
              </p>
              <span className="badge badge-emerald">Laptop</span>
            </div>
          </div>
          <div style={{ backgroundColor: '#f2fbf5', border: '1px solid #dcfce7', borderRadius: '14px', padding: '16px 24px', textAlign: 'right' }}>
            <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Current Price</span>
            <h4 style={{ fontSize: '24px', fontWeight: '800', color: '#00a651', margin: '2px 0' }}>₹{currentPrice.toLocaleString()}</h4>
            <span style={{ fontSize: '11px', color: '#00a651', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'flex-end' }}>
              <TrendingDown size={13} /> 12% vs last month
            </span>
          </div>
        </div>
      )}
      <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>Price History Chart</h3>
        <div style={{ width: '100%', height: '180px', marginBottom: '24px', position: 'relative' }}>
          <svg style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00a651" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00a651" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0,100 Q 150,40 300,110 T 600,60 T 900,50 T 1200,90"
              fill="url(#grad)"
              stroke="#00a651"
              strokeWidth="3"
            />
            <circle cx="0" cy="100" r="5" fill="#00a651" />
            <circle cx="200" cy="60" r="5" fill="#00a651" />
            <circle cx="450" cy="110" r="5" fill="#00a651" />
            <circle cx="700" cy="70" r="5" fill="#00a651" />
            <circle cx="950" cy="55" r="5" fill="#00a651" />
            <circle cx="1200" cy="90" r="7" fill="#00a651" stroke="#ffffff" strokeWidth="2" />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '12px', color: '#ef4444', fontWeight: '700', display: 'block' }}>Highest Price</span>
            <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#dc2626', margin: '4px 0 2px' }}>₹{highestPrice.toLocaleString()}</h4>
            <span style={{ fontSize: '11px', color: '#ef4444' }}>Peak recorded price</span>
          </div>
          <div style={{ backgroundColor: '#f2fbf5', border: '1px solid #dcfce7', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '12px', color: '#00a651', fontWeight: '700', display: 'block' }}>Lowest Price</span>
            <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#00a651', margin: '4px 0 2px' }}>₹{lowestPrice.toLocaleString()}</h4>
            <span style={{ fontSize: '11px', color: '#166534' }}>Best historic deal</span>
          </div>
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: '700', display: 'block' }}>Average Price</span>
            <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#1d4ed8', margin: '4px 0 2px' }}>₹{avgPrice.toLocaleString()}</h4>
            <span style={{ fontSize: '11px', color: '#2563eb' }}>Last 6 months average</span>
          </div>
          <div style={{ backgroundColor: '#f3e8ff', border: '1px solid #e9d5ff', borderRadius: '12px', padding: '16px' }}>
            <span style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', display: 'block' }}>Current Price</span>
            <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#6d28d9', margin: '4px 0 2px' }}>₹{currentPrice.toLocaleString()}</h4>
            <span style={{ fontSize: '11px', color: '#7c3aed' }}>↓ 12% vs peak</span>
          </div>
        </div>
      </div>
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '16px' }}>Live PostgreSQL Price History Log</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
              <th style={{ padding: '12px' }}>Date Scraped</th>
              <th style={{ padding: '12px' }}>Product</th>
              <th style={{ padding: '12px' }}>Price</th>
              <th style={{ padding: '12px' }}>Discount</th>
              <th style={{ padding: '12px' }}>Marketplace</th>
              <th style={{ padding: '12px' }}>Availability</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((row, idx) => (
              <tr key={row.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px', color: '#64748b' }}>
                  {row.scraped_at ? new Date(row.scraped_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '12 Jun 2026'}
                </td>
                <td style={{ padding: '12px', fontWeight: '700', color: '#0f172a' }}>
                  {row.product_name || `${row.brand} ${row.model}`}
                </td>
                <td style={{ padding: '12px', fontWeight: '800', color: '#00a651' }}>
                  ₹{Number(row.price || 0).toLocaleString()}
                </td>
                <td style={{ padding: '12px', color: '#2563eb', fontWeight: '700' }}>
                  {row.discount_percentage ? `${Number(row.discount_percentage).toFixed(0)}% OFF` : '12% OFF'}
                </td>
                <td style={{ padding: '12px' }}>
                  <span className="badge badge-emerald">{row.marketplace || 'Store'}</span>
                </td>
                <td style={{ padding: '12px', color: '#166534', fontWeight: '600' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={14} color="#00a651" /> In Stock
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}