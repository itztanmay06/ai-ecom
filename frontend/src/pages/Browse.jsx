import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Filter, Heart, Scale, Laptop, Smartphone, Monitor } from 'lucide-react';
import fallbackLaptops from '../data/laptops.json';
import fallbackMonitors from '../data/monitors.json';
import fallbackSmartphones from '../data/smartphones.json';
export default function Browse() {
  const navigate = useNavigate();
  const location = useLocation();
  const [laptops, setLaptops] = useState([]);
  const [dbBrands, setDbBrands] = useState([
    'Acer', 'Alienware', 'Apple', 'Asus', 'Dell', 'Hp', 'Lenovo', 'Microsoft', 'Msi', 'Samsung'
  ]);
  const [activeCategory, setActiveCategory] = useState('Laptops');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [maxPrice, setMaxPrice] = useState(200000);
  const [selectedCompare, setSelectedCompare] = useState(() => {
    const saved = localStorage.getItem('compare_laptops');
    return saved ? JSON.parse(saved) : [];
  });
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist_items');
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    const handleSync = () => {
      const saved = localStorage.getItem('compare_laptops');
      if (saved) {
        try {
          setSelectedCompare(JSON.parse(saved));
        } catch (e) {}
      } else {
        setSelectedCompare([]);
      }
      const savedWatchlist = localStorage.getItem('watchlist_items');
      if (savedWatchlist) {
        try {
          setWatchlist(JSON.parse(savedWatchlist));
        } catch (e) {}
      } else {
        setWatchlist([]);
      }
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('compare_updated', handleSync);
    window.addEventListener('watchlist_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('compare_updated', handleSync);
      window.removeEventListener('watchlist_updated', handleSync);
    };
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const catParam = queryParams.get('category');
    if (catParam && ['Laptops', 'Smartphones', 'Monitors'].includes(catParam)) {
      setActiveCategory(catParam);
    }
    const searchParam = queryParams.get('search') || '';
    setSearchTerm(searchParam);
  }, [location.search]);
  useEffect(() => {
    setSelectedBrand('All');
    if (activeCategory === 'Laptops') {
      setLaptops(fallbackLaptops);
      fetch('http://127.0.0.1:8000/value-champions?limit=300')
        .then(res => res.json())
        .then(data => {
          if (data && data.champions && data.champions.length > 0) setLaptops(data.champions);
        })
        .catch(() => setLaptops(fallbackLaptops));
    } else if (activeCategory === 'Monitors') {
      setLaptops(fallbackMonitors);
      fetch('http://127.0.0.1:8000/monitors')
        .then(res => res.json())
        .then(data => {
          if (data && data.monitors && data.monitors.length > 0) setLaptops(data.monitors);
        })
        .catch(() => setLaptops(fallbackMonitors));
    } else if (activeCategory === 'Smartphones') {
      setLaptops(fallbackSmartphones);
      fetch('http://127.0.0.1:8000/smartphones')
        .then(res => res.json())
        .then(data => {
          if (data && data.smartphones && data.smartphones.length > 0) setLaptops(data.smartphones);
        })
        .catch(() => setLaptops(fallbackSmartphones));
    }
  }, [activeCategory]);
  const toggleCompare = (prod) => {
    let updated;
    const exists = selectedCompare.find(p => (p.product_id || p.id) === (prod.product_id || prod.id));
    if (exists) {
      updated = selectedCompare.filter(p => (p.product_id || p.id) !== (prod.product_id || prod.id));
    } else {
      if (selectedCompare.length >= 4) {
        alert("You can compare up to 4 items at a time.");
        return;
      }
      updated = [...selectedCompare, prod];
    }
    setSelectedCompare(updated);
    localStorage.setItem('compare_laptops', JSON.stringify(updated));
    window.dispatchEvent(new Event('compare_updated'));
  };
  const toggleWatchlist = (prod) => {
    const prodId = prod.product_id || prod.id;
    let updated;
    const exists = watchlist.some(p => (p.product_id || p.id) === prodId);
    if (exists) {
      updated = watchlist.filter(p => (p.product_id || p.id) !== prodId);
    } else {
      const newItem = {
        id: prodId,
        product_id: prodId,
        name: prod.product_name || `${prod.brand || ''} ${prod.model || ''}`,
        category: activeCategory || 'Smartphones',
        specs: prod.battery_mah ? `${prod.ram_gb || 8}GB RAM • ${prod.storage_gb || 128}GB Storage • ${prod.battery_mah}mAh` : prod.display_size_inch ? `${prod.display_size_inch}" Screen • ${prod.refresh_rate_hz || 75}Hz` : `${prod.ram_gb || 16}GB RAM • ${prod.storage_gb || 512}GB SSD`,
        image: prod.image_url || "/images/laptop.png",
        currentPrice: prod.current_price || 0,
        mrp: prod.mrp || Math.round((prod.current_price || 15000) * 1.2),
        discount: `${prod.discount_percentage || Math.round((((prod.mrp || (prod.current_price * 1.2)) - prod.current_price) / (prod.mrp || (prod.current_price * 1.2))) * 100) || 15}% OFF`,
        trend: 'down',
        trendText: 'Best price',
        lowestPrice: prod.current_price ? Number(prod.current_price).toLocaleString() : 'N/A',
        lowestDate: 'Today',
        addedOn: 'Recently',
        marketplace: prod.marketplace || 'Store',
        product_url: prod.product_url || '#'
      };
      updated = [...watchlist, newItem];
    }
    setWatchlist(updated);
    localStorage.setItem('watchlist_items', JSON.stringify(updated));
    window.dispatchEvent(new Event('watchlist_updated'));
  };
  const addToRecentlyViewed = (prod) => {
    const prodId = prod.product_id || prod.id;
    const saved = localStorage.getItem('recently_viewed');
    let currentList = saved ? JSON.parse(saved) : [];
    currentList = currentList.filter(p => (p.product_id || p.id) !== prodId);
    const entry = {
      id: prodId,
      product_id: prodId,
      name: prod.product_name || `${prod.brand || ''} ${prod.model || ''}`,
      price: prod.current_price || prod.price || 0,
      image: prod.image_url || prod.image || "/images/laptop.png",
      product_url: prod.product_url || '#',
      marketplace: prod.marketplace || 'Store'
    };
    const updated = [entry, ...currentList].slice(0, 5);
    localStorage.setItem('recently_viewed', JSON.stringify(updated));
    window.dispatchEvent(new Event('recently_viewed_updated'));
  };
  const clearAllFilters = () => {
    setSelectedBrand('All');
    setMaxPrice(200000);
    setActiveCategory('Laptops');
    setSearchTerm('');
    navigate('/browse');
  };
  const categories = [
    { id: 'Laptops', label: 'Laptops', icon: Laptop, count: '314 Laptops' },
    { id: 'Smartphones', label: 'Smartphones', icon: Smartphone, count: '472 Phones' },
    { id: 'Monitors', label: 'Monitors', icon: Monitor, count: '369 Monitors' }
  ];
  const filteredLaptops = laptops.filter(p => {
    if (selectedBrand !== 'All') {
      const pBrand = (p.brand || '').toLowerCase();
      const pName = (p.product_name || '').toLowerCase();
      const b = selectedBrand.toLowerCase();
      if (pBrand !== b && !pName.includes(b)) {
        return false;
      }
    }
    if (maxPrice && (p.current_price || 0) > maxPrice) {
      return false;
    }
    if (searchTerm.trim()) {
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/);
      const searchableText = `${p.product_name || ''} ${p.brand || ''} ${p.model || ''} ${p.processor_series || p.processor || ''} ${p.gpu || ''} ${p.marketplace || ''} ${p.ram_gb ? p.ram_gb + 'gb' : ''} ${p.storage_gb ? p.storage_gb + 'gb' : ''}`.toLowerCase();
      const matchesAll = searchWords.every(word => searchableText.includes(word));
      if (!matchesAll) return false;
    }
    return true;
  });
  return (
    <div style={{ padding: '24px 28px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>Browse Product Catalog</h2>
          <p style={{ fontSize: '13px', color: '#64748b' }}>Explore normalized marketplace listings across Amazon, Flipkart, Croma & Reliance Digital.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {selectedCompare.length > 0 && (
            <button
              onClick={() => navigate('/compare')}
              style={{
                backgroundColor: '#00a651',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Scale size={16} />
              <span>Compare Selected ({selectedCompare.length})</span>
            </button>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #e2e8f0', marginBottom: '20px', paddingBottom: '10px' }}>
        {categories.map(cat => {
          const IconComp = cat.icon;
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                navigate(`/browse?category=${cat.id}`);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                background: 'none',
                fontSize: '14px',
                fontWeight: isSelected ? '800' : '600',
                color: isSelected ? '#00a651' : '#64748b',
                borderBottom: isSelected ? '2px solid #00a651' : '2px solid transparent',
                paddingBottom: '8px',
                cursor: 'pointer'
              }}
            >
              <IconComp size={18} color={isSelected ? '#00a651' : '#64748b'} />
              <span>{cat.label}</span>
              <span className="badge badge-emerald" style={{ fontSize: '10px', marginLeft: '2px' }}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
        <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} color="#00a651" />
              <span style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a' }}>Filters</span>
            </div>
            <button onClick={clearAllFilters} style={{ border: 'none', background: 'none', color: '#00a651', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>
              Clear All
            </button>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '8px' }}>Search Products</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search Acer, i5, RTX..."
                value={searchTerm}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchTerm(val);
                  const params = new URLSearchParams(location.search);
                  if (val.trim()) {
                    params.set('search', val);
                  } else {
                    params.delete('search');
                  }
                  navigate(`/browse?${params.toString()}`, { replace: true });
                }}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '12px',
                  backgroundColor: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    const params = new URLSearchParams(location.search);
                    params.delete('search');
                    navigate(`/browse?${params.toString()}`, { replace: true });
                  }}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'none',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '700'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '8px' }}>Brand Filter</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#ffffff' }}
            >
              {(() => {
                const availableBrands = Array.from(
                  new Set(
                    laptops
                      .map(p => p.brand)
                      .filter(b => b && typeof b === 'string' && b.trim() !== '' && b.toLowerCase() !== 'generic' && b.toLowerCase() !== 'other')
                  )
                ).sort();
                return (
                  <>
                    <option value="All">All Brands ({availableBrands.length})</option>
                    {availableBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </>
                );
              })()}
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '8px' }}>Price Range</label>
            <input
              type="range"
              min="800"
              max="200000"
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#00a651' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>₹ 800</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#00a651' }}>Max: ₹ {maxPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div>
          {searchTerm && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', backgroundColor: '#e6f7ef', border: '1px solid #bbf7d0', padding: '8px 14px', borderRadius: '10px', width: 'fit-content' }}>
              <span style={{ fontSize: '12px', color: '#047857', fontWeight: '700' }}>
                Showing results for "{searchTerm}" ({filteredLaptops.length} items found)
              </span>
              <button
                onClick={() => {
                  setSearchTerm('');
                  const params = new URLSearchParams(location.search);
                  params.delete('search');
                  navigate(`/browse?${params.toString()}`, { replace: true });
                }}
                style={{ border: 'none', background: 'none', color: '#ef4444', fontWeight: '800', cursor: 'pointer', fontSize: '12px', marginLeft: '6px' }}
              >
                ✕ Clear Search
              </button>
            </div>
          )}
          {!['Laptops', 'Monitors', 'Smartphones'].includes(activeCategory) ? (
            <div style={{ backgroundColor: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                {activeCategory} Dataset Coming Soon!
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b' }}>
                We are currently processing price data for {activeCategory}. Check back shortly when the dataset is linked!
              </p>
            </div>
          ) : filteredLaptops.length === 0 ? (
            <div style={{ backgroundColor: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: '16px', padding: '60px 20px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                No products match your search
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>
                We couldn't find any products matching <strong>"{searchTerm}"</strong>. Try checking your spelling or clearing filters.
              </p>
              <button
                onClick={clearAllFilters}
                style={{ backgroundColor: '#00a651', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '9px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              >
                Reset All Filters & Search
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '16px' }}>
              {filteredLaptops.map((prod, idx) => {
                const prodId = prod.product_id || prod.id;
                const isChecked = selectedCompare.some(p => (p.product_id || p.id) === prodId);
                const isWatchlisted = watchlist.some(p => (p.product_id || p.id) === prodId);
                return (
                  <div key={idx} className="card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div onClick={() => addToRecentlyViewed(prod)} style={{ cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span className="badge badge-emerald" style={{ fontSize: '9px' }}>
                            VDI: {prod.value_density_index ? prod.value_density_index.toFixed(1) : '150.0'}
                          </span>
                          <Heart
                            size={16}
                            color={isWatchlisted ? '#ef4444' : '#94a3b8'}
                            fill={isWatchlisted ? '#ef4444' : 'none'}
                            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                            onClick={(e) => { e.stopPropagation(); toggleWatchlist(prod); }}
                            title={isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
                          />
                        </div>
                        <img
                          src={prod.image_url || "/images/laptop.png"}
                          alt={prod.product_name}
                          onError={(e) => { e.target.src = "/images/laptop.png"; }}
                          style={{ width: '100%', height: '110px', objectFit: 'contain', marginBottom: '8px' }}
                        />
                        <h4 style={{ fontSize: '12px', fontWeight: '800', color: '#0f172a', marginBottom: '4px', height: '34px', overflow: 'hidden' }}>
                          {prod.product_name}
                        </h4>
                        <p style={{ fontSize: '10px', color: '#64748b', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {prod.display_size_inch ? `${prod.display_size_inch}" Screen • ${prod.refresh_rate_hz || 75}Hz • ${prod.resolution || 'Full HD'}` : `${prod.ram_gb || 16}GB RAM • ${prod.storage_gb || 512}GB SSD • ${prod.gpu || 'Integrated'}`}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '15px', fontWeight: '800', color: '#00a651' }}>₹{prod.current_price?.toLocaleString()}</span>
                          <span style={{ fontSize: '11px', color: '#166534', fontWeight: '700', marginLeft: 'auto' }}>{prod.marketplace || 'Store'}</span>
                        </div>
                      </div>
                      <div style={{ paddingTop: '8px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                        <a href={prod.product_url || '#'} target="_blank" rel="noreferrer" onClick={() => addToRecentlyViewed(prod)} style={{ fontSize: '10px', color: '#2563eb', fontWeight: '700', textDecoration: 'none' }}>
                          View Store Page ↗
                        </a>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#475569', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => { addToRecentlyViewed(prod); toggleCompare(prod); }}
                            style={{ accentColor: '#00a651' }}
                          />
                          <span>Compare</span>
                        </label>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}