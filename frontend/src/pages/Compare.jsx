import React, { useState, useEffect } from 'react';
import { Star, Sparkles, Trash2, PlusCircle, HelpCircle, Info, Lightbulb, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function Compare() {
  const navigate = useNavigate();
  const defaultSingleLaptop = {
    product_id: 'default-compare-1',
    id: 'default-compare-1',
    product_name: 'ASUS TUF Gaming F15 (2024)',
    brand: 'ASUS',
    model: 'TUF Gaming F15',
    current_price: 78990,
    price: 78990,
    mrp: 89990,
    marketplace: 'Amazon',
    image_url: '/images/laptop.png',
    processor_series: 'Intel Core i5 13th Gen',
    gpu: 'NVIDIA RTX 4050 (6GB)',
    ram_gb: 16,
    storage_gb: 512,
    value_density_index: 26.4,
    product_url: 'https://www.amazon.in'
  };
  const [laptops, setLaptops] = useState(() => {
    const saved = localStorage.getItem('compare_laptops');
    if (saved !== null) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Failed to parse compare_laptops:", e);
      }
    }
    localStorage.setItem('compare_laptops', JSON.stringify([defaultSingleLaptop]));
    return [defaultSingleLaptop];
  });
  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('compare_laptops');
      if (saved !== null) {
        try {
          setLaptops(JSON.parse(saved));
        } catch (e) {
          setLaptops([]);
        }
      } else {
        setLaptops([]);
      }
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('compare_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('compare_updated', handleSync);
    };
  }, []);
  const removeProduct = (id) => {
    const updated = (laptops || []).filter(l => (l.product_id || l.id) !== id);
    setLaptops(updated);
    localStorage.setItem('compare_laptops', JSON.stringify(updated));
    window.dispatchEvent(new Event('compare_updated'));
  };
  const clearAll = () => {
    setLaptops([]);
    localStorage.setItem('compare_laptops', JSON.stringify([]));
    window.dispatchEvent(new Event('compare_updated'));
  };
  const getAIRecommendation = () => {
    if (!laptops || laptops.length === 0) {
      return {
        winnerName: 'No Laptops in Comparison',
        winnerPrice: '—',
        winnerStore: 'Browse Catalog',
        rationale: 'No laptops are currently in comparison. Add products from the Browse catalog to let the AI calculate Value Density Index (VDI) scores and provide head-to-head recommendations!'
      };
    }
    if (laptops.length === 1) {
      const item = laptops[0];
      const itemPrice = item.current_price ? Number(item.current_price).toLocaleString() : (item.price ? Number(item.price).toLocaleString() : 'N/A');
      const vdi = item.value_density_index ? Number(item.value_density_index).toFixed(1) : '26.4';
      return {
        winnerName: item.product_name || item.name || `${item.brand || ''} ${item.model || ''}`,
        winnerPrice: itemPrice,
        winnerStore: item.marketplace || 'Store',
        rationale: `${item.product_name || item.model || 'This laptop'} is under active AI evaluation with a high VDI score of ${vdi}. Equipped with ${item.gpu || 'RTX Graphics'} and ${item.ram_gb || 16}GB RAM at ₹${itemPrice} on ${item.marketplace || 'Store'}, it delivers top-tier hardware density per rupee. Add 1 more laptop to view a direct head-to-head winner!`
      };
    }
    let winner = laptops[0];
    for (const item of laptops) {
      const currentVdi = parseFloat(item.value_density_index) || (item.ram_gb * 10 + 100000 / (item.current_price || 50000));
      const winnerVdi = parseFloat(winner.value_density_index) || (winner.ram_gb * 10 + 100000 / (winner.current_price || 50000));
      if (currentVdi > winnerVdi) {
        winner = item;
      }
    }
    const winnerPrice = winner.current_price ? Number(winner.current_price).toLocaleString() : 'N/A';
    const winnerGpu = winner.gpu || 'Dedicated Graphics';
    const winnerStore = winner.marketplace || 'Store';
    return {
      winnerName: winner.product_name || `${winner.brand || ''} ${winner.model || ''}`,
      winnerPrice,
      winnerStore,
      rationale: `${winner.product_name || winner.model} delivers the highest Value Density Index (VDI) score among your active compared laptops. Equipping ${winnerGpu} with ${winner.ram_gb || 16}GB RAM at ₹${winnerPrice} on ${winnerStore}, it offers maximum hardware value per rupee.`
    };
  };
  const currentLaptops = laptops || [];
  const aiRec = getAIRecommendation();
  return (
    <div style={{ padding: '24px 28px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>Compare Products</h2>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Compare up to 4 laptops side-by-side using live PostgreSQL specs & prices.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => navigate('/browse')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '12px', fontWeight: '600', color: '#334155', cursor: 'pointer' }}
          >
            <PlusCircle size={14} color="#00a651" />
            <span>Add Products</span>
          </button>
          {currentLaptops.length > 0 && (
            <button
              onClick={clearAll}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '8px', border: '1px solid #fecaca', backgroundColor: '#fef2f2', fontSize: '12px', fontWeight: '600', color: '#ef4444', cursor: 'pointer' }}
            >
              <Trash2 size={14} />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px', alignItems: 'start' }}>
        {currentLaptops.length === 0 ? (
          <div className="card" style={{ padding: '40px 24px', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#64748b' }}>
              <PlusCircle size={24} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>No Laptops in Comparison</h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>You deleted all products from comparison. Click below to add laptops to compare side-by-side.</p>
            <button
              onClick={() => navigate('/browse')}
              style={{ backgroundColor: '#00a651', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
            >
              Browse Laptops Catalog ↗
            </button>
          </div>
        ) : (
          <div className="card" style={{ padding: '20px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '12px', color: '#64748b', width: '130px' }}>Product</th>
                  {currentLaptops.map(l => {
                    const id = l.product_id || l.id;
                    return (
                      <th key={id} style={{ padding: '12px', textAlign: 'center', position: 'relative', minWidth: '190px' }}>
                        <button
                          onClick={() => removeProduct(id)}
                          title="Remove from comparison"
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            backgroundColor: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            width: '26px',
                            height: '26px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ef4444',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                        <img
                          src={l.image_url || l.image || "/images/laptop.png"}
                          alt={l.product_name}
                          onError={(e) => { e.target.src = "/images/laptop.png"; }}
                          style={{ width: '90px', height: '65px', objectFit: 'contain', margin: '8px auto 6px' }}
                        />
                        <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', padding: '0 8px', height: '36px', overflow: 'hidden' }}>
                          {l.product_name || l.name}
                        </h4>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: '#475569' }}>Price</td>
                  {currentLaptops.map(l => (
                    <td key={l.product_id || l.id} style={{ padding: '10px 12px', textAlign: 'center', fontWeight: '800', color: '#00a651' }}>
                      ₹{l.current_price ? Number(l.current_price).toLocaleString() : (l.price ? Number(l.price).toLocaleString() : 'N/A')}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: '#475569' }}>Marketplace</td>
                  {currentLaptops.map(l => (
                    <td key={l.product_id || l.id} style={{ padding: '10px 12px', textAlign: 'center', color: '#334155' }}>
                      <span className="badge badge-emerald" style={{ fontSize: '10px' }}>{l.marketplace || 'Store'}</span>
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: '#475569' }}>VDI Score</td>
                  {currentLaptops.map(l => (
                    <td key={l.product_id || l.id} style={{ padding: '10px 12px', textAlign: 'center', fontWeight: '800', color: '#7c3aed' }}>
                      {l.value_density_index ? Number(l.value_density_index).toFixed(1) : '24.0'}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: '#475569' }}>Processor</td>
                  {currentLaptops.map(l => (
                    <td key={l.product_id || l.id} style={{ padding: '10px 12px', textAlign: 'center', color: '#334155' }}>
                      {l.processor_series || l.processor || 'Intel / AMD'}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: '#475569' }}>GPU</td>
                  {currentLaptops.map(l => (
                    <td key={l.product_id || l.id} style={{ padding: '10px 12px', textAlign: 'center', color: '#334155' }}>
                      {l.gpu || 'Integrated Graphics'}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: '#475569' }}>RAM</td>
                  {currentLaptops.map(l => (
                    <td key={l.product_id || l.id} style={{ padding: '10px 12px', textAlign: 'center', color: '#334155' }}>
                      {l.ram_gb ? `${l.ram_gb}GB` : (l.ram || '16GB')}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: '#475569' }}>Storage</td>
                  {currentLaptops.map(l => (
                    <td key={l.product_id || l.id} style={{ padding: '10px 12px', textAlign: 'center', color: '#334155' }}>
                      {l.storage_gb ? `${l.storage_gb}GB SSD` : (l.storage || '512GB SSD')}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 12px', fontWeight: '700', color: '#475569' }}>Store Link</td>
                  {currentLaptops.map(l => (
                    <td key={l.product_id || l.id} style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <a href={l.product_url || '#'} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>
                        View Deal ↗
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {aiRec && (
              <div className="card" style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <Sparkles size={18} color="#7c3aed" />
                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>AI Recommendation</h3>
                </div>
                <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, marginBottom: '14px' }}>
                  {aiRec.rationale}
                </p>
                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: '#047857', display: 'block' }}>Best Value Winner:</span>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#00a651', marginTop: '2px' }}>{aiRec.winnerName}</h4>
                  <span style={{ fontSize: '11px', color: '#166534', fontWeight: '600' }}>₹{aiRec.winnerPrice} on {aiRec.winnerStore}</span>
                </div>
              </div>
            )}
            <div className="card" style={{ padding: '20px', backgroundColor: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <BarChart2 size={18} color="#00a651" />
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>What is VDI Score?</h3>
                <span style={{ fontSize: '10px', fontWeight: '800', backgroundColor: '#e6f7ef', color: '#00a651', padding: '2px 8px', borderRadius: '999px', marginLeft: 'auto' }}>
                  Value Density Index
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, marginBottom: '12px' }}>
                <strong>VDI (Value Density Index)</strong> is ShopIntel AI's proprietary score measuring raw hardware performance per rupee spent.
              </p>
              <div style={{
                backgroundColor: '#f5f3ff',
                border: '1px solid #ddd6fe',
                borderRadius: '10px',
                padding: '10px 12px',
                fontSize: '11px',
                color: '#5b21b6',
                fontFamily: 'monospace',
                lineHeight: 1.4,
                marginBottom: '14px'
              }}>
                <strong>Formula:</strong><br />
                VDI = (RAM × 10) + (Storage / 50) + GPU_Power<br />
                -----------------------------------<br />
                (Current Price in ₹10,000s)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00a651' }}></span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>VDI &gt; 25.0:</span>
                  <span style={{ color: '#64748b' }}>Exceptional performance per ₹</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }}></span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>VDI 18 - 25:</span>
                  <span style={{ color: '#64748b' }}>Standard balanced value</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }}></span>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>VDI &lt; 18.0:</span>
                  <span style={{ color: '#64748b' }}>Overpriced hardware specs</span>
                </div>
              </div>
              <div style={{
                backgroundColor: '#fefce8',
                border: '1px solid #fef08a',
                borderRadius: '8px',
                padding: '8px 10px',
                fontSize: '11px',
                color: '#854d0e',
                display: 'flex',
                alignItems: 'start',
                gap: '6px'
              }}>
                <Lightbulb size={14} color="#ca8a04" style={{ marginTop: '2px', flexShrink: 0 }} />
                <span>
                  <strong>Interview Tip:</strong> VDI normalizes multi-marketplace price fluctuations against benchmarked CPU/GPU performance.
                </span>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}