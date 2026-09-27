import React, { useState, useEffect } from 'react';
import { BarChart2, Search, Scale, Heart, Bell, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { getRealAccountMetrics } from '../utils/activity';
export default function Analytics() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accountMetrics, setAccountMetrics] = useState(() => getRealAccountMetrics());
  useEffect(() => {
    const handleUpdate = () => {
      setAccountMetrics(getRealAccountMetrics());
    };
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('watchlist_updated', handleUpdate);
    window.addEventListener('alerts_updated', handleUpdate);
    window.addEventListener('compare_updated', handleUpdate);
    window.addEventListener('user_activity_updated', handleUpdate);
    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('watchlist_updated', handleUpdate);
      window.removeEventListener('alerts_updated', handleUpdate);
      window.removeEventListener('compare_updated', handleUpdate);
      window.removeEventListener('user_activity_updated', handleUpdate);
    };
  }, []);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/analytics')
      .then(res => res.json())
      .then(data => {
        setAnalyticsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching analytics:", err);
        setLoading(false);
      });
  }, []);
  const mktAverages = analyticsData?.marketplace_averages || [
    { marketplace: 'Amazon', avg_price: 68400 },
    { marketplace: 'Flipkart', avg_price: 64900 },
    { marketplace: 'Croma', avg_price: 71200 },
    { marketplace: 'Reliance Digital', avg_price: 67800 }
  ];
  const priceDist = analyticsData?.price_distribution || {
    under_20k: 5,
    r_20_40k: 18,
    r_40_60k: 10,
    r_60_80k: 6,
    above_80k: 3
  };
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
            <BarChart2 size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>Analytics</h2>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Get insights from your shopping activity and market data.</p>
          </div>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          backgroundColor: '#ffffff',
          cursor: 'pointer'
        }}>
          <Calendar size={14} color="#64748b" />
          <select style={{ border: 'none', fontSize: '12px', fontWeight: '600', color: '#0f172a', backgroundColor: 'transparent', outline: 'none', cursor: 'pointer' }}>
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>Last 3 Months</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
            <Search size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{accountMetrics.searched}</h3>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#00a651', backgroundColor: '#e6f7ef', padding: '2px 8px', borderRadius: '6px' }}>
                ↑ 12%
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Products Searched</span>
          </div>
        </div>
        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed', flexShrink: 0 }}>
            <Scale size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{accountMetrics.compared}</h3>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#00a651', backgroundColor: '#e6f7ef', padding: '2px 8px', borderRadius: '6px' }}>
                ↑ 8%
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Products Compared</span>
          </div>
        </div>
        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', flexShrink: 0 }}>
            <Heart size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{accountMetrics.watchlist}</h3>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#00a651', backgroundColor: '#e6f7ef', padding: '2px 8px', borderRadius: '6px' }}>
                ↑ 20%
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Watchlist Items</span>
          </div>
        </div>
        <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '14px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c', flexShrink: 0 }}>
            <Bell size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>{accountMetrics.alerts}</h3>
              <span style={{ fontSize: '11px', fontWeight: '700', color: '#ef4444', backgroundColor: '#fef2f2', padding: '2px 8px', borderRadius: '6px' }}>
                ↓ 17%
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Price Drop Alerts</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div className="card" style={{ padding: '24px', borderRadius: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Category Distribution</h3>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>Products you searched and compared by category.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="160" height="160" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#2563eb" strokeWidth="5" strokeDasharray="64 36" strokeDashoffset="25" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#7c3aed" strokeWidth="5" strokeDasharray="18 82" strokeDashoffset="61" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f87171" strokeWidth="5" strokeDasharray="8 92" strokeDashoffset="43" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="5" strokeDasharray="6 94" strokeDashoffset="35" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="5" strokeDasharray="3 97" strokeDashoffset="29" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#64748b" strokeWidth="5" strokeDasharray="1 99" strokeDashoffset="26" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', display: 'block' }}>{accountMetrics.searched}</span>
                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>Total Searches</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', minWidth: '150px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2563eb' }}></span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Laptops</span>
                <span style={{ marginLeft: 'auto', fontWeight: '800', color: '#475569' }}>64%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#7c3aed' }}></span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Smartphones</span>
                <span style={{ marginLeft: 'auto', fontWeight: '800', color: '#475569' }}>18%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f87171' }}></span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Monitors</span>
                <span style={{ marginLeft: 'auto', fontWeight: '800', color: '#475569' }}>8%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Audio</span>
                <span style={{ marginLeft: 'auto', fontWeight: '800', color: '#475569' }}>6%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Smartwatches</span>
                <span style={{ marginLeft: 'auto', fontWeight: '800', color: '#475569' }}>3%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#64748b' }}></span>
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Accessories</span>
                <span style={{ marginLeft: 'auto', fontWeight: '800', color: '#475569' }}>1%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ padding: '24px', borderRadius: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Price Range Distribution</h3>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>Price range of products you searched.</p>
          {(() => {
            const distItems = [
              { label: '< ₹20K', count: priceDist.under_20k || 5 },
              { label: '₹20K – 40K', count: priceDist.r_20_40k || 18 },
              { label: '₹40K – 60K', count: priceDist.r_40_60k || 10 },
              { label: '₹60K – 80K', count: priceDist.r_60_80k || 6 },
              { label: '> ₹80K', count: priceDist.above_80k || 3 }
            ];
            const maxVal = Math.max(...distItems.map(d => d.count), 20);
            const chartHeight = 110;
            return (
              <div style={{ display: 'flex', gap: '12px', height: '170px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '22px', fontSize: '11px', color: '#94a3b8', fontWeight: '600', textAlign: 'right', width: '20px' }}>
                  <span>20</span>
                  <span>15</span>
                  <span>10</span>
                  <span>5</span>
                  <span>0</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
                    <div style={{ position: 'absolute', top: '25%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
                    <div style={{ position: 'absolute', top: '75%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
                    {distItems.map((item, idx) => {
                      const barHeight = Math.max(8, Math.round((item.count / maxVal) * chartHeight));
                      return (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 1 }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a' }}>{item.count}</span>
                          <div
                            style={{
                              width: '42px',
                              height: `${barHeight}px`,
                              backgroundColor: '#52c48e',
                              borderRadius: '4px 4px 0 0',
                              transition: 'height 0.4s ease'
                            }}
                            title={`${item.label}: ${item.count} items`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '8px' }}>
                    {distItems.map((item, idx) => (
                      <span key={idx} style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textAlign: 'center', width: '56px' }}>
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        <div className="card" style={{ padding: '24px', borderRadius: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Marketplace Price Comparison</h3>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>Average product prices across different marketplaces (Laptops).</p>
          {(() => {
            const colors = ['#fb923c', '#3b82f6', '#10b981', '#a855f7'];
            const maxPrice = 100000;
            const chartHeight = 110;
            return (
              <div style={{ display: 'flex', gap: '12px', height: '170px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '22px', fontSize: '10px', color: '#94a3b8', fontWeight: '600', textAlign: 'right', width: '50px' }}>
                  <span>₹1,00,000</span>
                  <span>₹80,000</span>
                  <span>₹60,000</span>
                  <span>₹40,000</span>
                  <span>₹20,000</span>
                  <span>0</span>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
                    <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
                    <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
                    <div style={{ position: 'absolute', top: '60%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
                    <div style={{ position: 'absolute', top: '80%', left: 0, right: 0, borderTop: '1px dashed #f1f5f9' }} />
                    {mktAverages.map((mkt, idx) => {
                      const price = Number(mkt.avg_price) || 0;
                      const barHeight = Math.max(16, Math.round((price / maxPrice) * chartHeight));
                      return (
                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 1 }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a' }}>₹{price.toLocaleString()}</span>
                          <div
                            style={{
                              width: '54px',
                              height: `${barHeight}px`,
                              backgroundColor: colors[idx % colors.length],
                              borderRadius: '4px 4px 0 0',
                              transition: 'height 0.4s ease'
                            }}
                            title={`${mkt.marketplace}: ₹${price.toLocaleString()}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '8px' }}>
                    {mktAverages.map((mkt, idx) => (
                      <span key={idx} style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', textAlign: 'center', width: '70px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {mkt.marketplace}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
        <div className="card" style={{ padding: '24px', borderRadius: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '4px' }}>Discount Insights</h3>
          <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>Understand real vs advertised discounts.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px', paddingTop: '8px' }}>
            <div style={{ position: 'relative', width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="140" height="140" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#e2e8f0" strokeWidth="4" />
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#00a651" strokeWidth="4.5" strokeDasharray="28 72" strokeDashoffset="25" strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', display: 'block' }}>28%</span>
                <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '600' }}>Avg. Advertised<br/>Discount</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#00a651', display: 'block' }}>17%</span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Avg. Actual Discount</span>
              </div>
              <div>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#ef4444', display: 'block' }}>12</span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Potential Fake Discounts</span>
              </div>
              <div>
                <span style={{ fontSize: '18px', fontWeight: '800', color: '#00a651', display: 'block' }}>34%</span>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>Products with &gt; 30% off</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}