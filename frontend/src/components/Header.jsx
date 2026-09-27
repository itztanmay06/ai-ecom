import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Bell, ChevronDown, LogIn, LogOut, User, Settings as SettingsIcon, ShieldAlert, TrendingDown, CheckCheck, ExternalLink } from 'lucide-react';
import { recordUserSearch } from '../utils/activity';
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isBrowsePage = location.pathname.startsWith('/browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const defaultUser = {
    name: 'Tanmay',
    email: 'aiecom@gmail.com',
    password: '1234',
    role: 'Premium User',
    location: 'New Delhi, India',
    bio: 'Tech enthusiast | Love exploring laptop deals and smart shopping with AI.',
    dob: '15 March 2002',
    phone: '+91 98765 43210',
    language: 'English (India)',
    currency: 'INR (₹)'
  };
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('shopintel_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {}
    }
    localStorage.setItem('shopintel_user', JSON.stringify(defaultUser));
    return defaultUser;
  });
  useEffect(() => {
    const handleUserUpdate = () => {
      const savedUser = localStorage.getItem('shopintel_user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {}
      } else {
        setUser(null);
      }
    };
    window.addEventListener('user_session_updated', handleUserUpdate);
    window.addEventListener('storage', handleUserUpdate);
    return () => {
      window.removeEventListener('user_session_updated', handleUserUpdate);
      window.removeEventListener('storage', handleUserUpdate);
    };
  }, []);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('shopintel_theme') || 'light';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shopintel_theme', theme);
  }, [theme]);
  useEffect(() => {
    const handleThemeUpdate = () => {
      const savedTheme = localStorage.getItem('shopintel_theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    };
    window.addEventListener('theme_updated', handleThemeUpdate);
    return () => window.removeEventListener('theme_updated', handleThemeUpdate);
  }, []);
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('shopintel_theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.dispatchEvent(new Event('theme_updated'));
  };
  useEffect(() => {
    if (isBrowsePage) {
      const params = new URLSearchParams(location.search);
      setSearchTerm(params.get('search') || '');
    } else {
      setSearchTerm('');
    }
  }, [location.pathname, location.search, isBrowsePage]);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);
  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length < 2) return;
    const timer = setTimeout(() => {
      recordUserSearch(searchTerm.trim());
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    const params = new URLSearchParams(location.search);
    if (val.trim()) {
      params.set('search', val);
    } else {
      params.delete('search');
    }
    navigate(`/browse?${params.toString()}`, { replace: true });
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(location.search);
    if (searchTerm.trim()) {
      recordUserSearch(searchTerm.trim());
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    navigate(`/browse?${params.toString()}`);
  };
  const handleClearSearch = () => {
    setSearchTerm('');
    const params = new URLSearchParams(location.search);
    params.delete('search');
    navigate(`/browse?${params.toString()}`, { replace: true });
  };
  const handleLogout = () => {
    localStorage.removeItem('shopintel_user');
    setUser(null);
    setShowDropdown(false);
    window.dispatchEvent(new Event('user_session_updated'));
    navigate('/auth');
  };
  return (
    <header style={{
      height: '70px',
      backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
      borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      overflow: 'hidden',
      transition: 'background-color 0.25s ease, border-color 0.25s ease'
    }}>
      <div 
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '780px',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: theme === 'dark' ? 0.05 : 0.08,
          color: theme === 'dark' ? '#ffffff' : '#0f172a',
          transition: 'opacity 0.25s ease'
        }}
      >
        <svg width="100%" height="100%" viewBox="0 0 780 70" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M680,68 C680,50 695,38 712,42 C722,25 745,24 758,36 C770,28 785,35 785,50 C795,58 790,68 780,68 Z" />
          <path d="M520,68 C520,44 540,32 562,38 C575,18 604,18 620,32 C634,22 655,30 655,48 C668,56 662,68 650,68 Z" />
          <path d="M360,68 C360,48 376,36 394,40 C406,22 432,22 445,34 C458,26 476,32 476,48 C488,56 482,68 470,68 Z" />
          <path d="M210,68 C210,52 224,42 238,45 C248,32 268,32 278,42 C288,36 302,40 302,54 C312,60 308,68 298,68 Z" />
          <path d="M590,16 C590,9 600,4 614,4 C628,4 638,9 638,16 C638,20 633,24 624,26 L626,31 L618,27 C615,27 614,27 614,27 C600,27 590,22 590,16 Z" />
          <path d="M440,14 C440,8 448,4 460,4 C472,4 480,8 480,14 C480,18 475,21 468,23 L470,27 L463,24 C461,24 460,24 460,24 C448,24 440,20 440,14 Z" />
          <path d="M290,18 C290,12 298,8 308,8 C318,8 326,12 326,18 C326,21 322,24 316,26 L317,29 L311,27 C310,27 308,27 308,27 C298,27 290,23 290,18 Z" />
          <circle cx="170" cy="24" r="5" />
          <circle cx="185" cy="18" r="3" />
          <circle cx="340" cy="12" r="4" />
          <circle cx="495" cy="10" r="5" />
          <circle cx="510" cy="18" r="3" />
          <circle cx="670" cy="16" r="4.5" />
          <circle cx="730" cy="14" r="3" />
        </svg>
      </div>
      {isBrowsePage ? (
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: '520px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
            border: `1px solid ${theme === 'dark' ? '#334155' : '#cbd5e1'}`,
            borderRadius: '12px',
            padding: '4px 6px 4px 14px'
          }}>
            <Search size={18} color="#94a3b8" style={{ marginRight: '10px', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search laptops by name, brand, processor, GPU..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                width: '100%',
                fontSize: '13px',
                color: theme === 'dark' ? '#f8fafc' : '#0f172a'
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                style={{
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#94a3b8',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  padding: '0 6px'
                }}
              >
                ✕
              </button>
            )}
            <button type="submit" style={{
              backgroundColor: '#00a651',
              border: 'none',
              borderRadius: '9px',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              flexShrink: 0
            }}>
              <Search size={17} />
            </button>
          </div>
        </form>
      ) : (
        <div style={{ flex: 1 }} />
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', position: 'relative', zIndex: 1 }}>
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          style={{
            border: 'none',
            backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {theme === 'dark' ? (
            <Sun size={18} color="#f59e0b" />
          ) : (
            <Moon size={18} color="#475569" />
          )}
        </button>
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowDropdown(false);
            }}
            title="Price drop alerts & notifications"
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: theme === 'dark' ? '#334155' : '#f1f5f9',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#475569' : '#e2e8f0'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#334155' : '#f1f5f9'}
          >
            <Bell size={18} color={theme === 'dark' ? '#94a3b8' : '#475569'} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: '800',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(239, 68, 68, 0.4)'
              }}>
                {unreadCount}
              </span>
            )}
          </button>
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '48px',
              right: 0,
              backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
              border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
              borderRadius: '16px',
              width: '360px',
              boxShadow: '0 15px 30px -5px rgba(0, 0, 0, 0.15)',
              zIndex: 100,
              overflow: 'hidden',
              animation: 'fadeIn 0.15s ease-out'
            }}>
              <div style={{
                padding: '14px 16px',
                borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#f1f5f9'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      backgroundColor: '#eff6ff',
                      color: '#2563eb',
                      border: '1px solid #bfdbfe'
                    }}>
                      {unreadCount} New
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={() => setUnreadCount(0)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#00a651',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <CheckCheck size={13} />
                    Mark all read
                  </button>
                )}
              </div>
              <div style={{ maxHeight: '330px', overflowY: 'auto' }}>
                <div
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/alerts');
                  }}
                  style={{
                    padding: '12px 16px',
                    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#f1f5f9'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '12px',
                    transition: 'background-color 0.15s ease',
                    backgroundColor: unreadCount > 0 ? (theme === 'dark' ? 'rgba(0, 166, 81, 0.08)' : '#f0fdf4') : 'transparent'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#334155' : '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = unreadCount > 0 ? (theme === 'dark' ? 'rgba(0, 166, 81, 0.08)' : '#f0fdf4') : 'transparent'}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#dcfce7',
                    color: '#16a34a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <TrendingDown size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}>
                        Price Target Reached!
                      </span>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>Just now</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                      Acer Aspire 3 dropped to <strong style={{ color: '#00a651' }}>₹25,990</strong> on Flipkart (Target ₹27,000 reached).
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/alerts');
                  }}
                  style={{
                    padding: '12px 16px',
                    borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#f1f5f9'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '12px',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#334155' : '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#fef3c7',
                    color: '#d97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <ShieldAlert size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}>
                        Deceptive MRP Alert
                      </span>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>2h ago</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                      12 laptops detected with artificially inflated MRP on Flipkart before discount.
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/compare');
                  }}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '12px',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#334155' : '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#e0f2fe',
                    color: '#0284c7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <TrendingDown size={16} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: theme === 'dark' ? '#f8fafc' : '#0f172a' }}>
                        Cross-Market Arbitrage
                      </span>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>5h ago</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                      ASUS Vivobook 15 is <strong style={{ color: '#0284c7' }}>₹7,000 cheaper</strong> on Flipkart than Amazon.
                    </p>
                  </div>
                </div>
              </div>
              <div style={{
                padding: '10px 16px',
                borderTop: `1px solid ${theme === 'dark' ? '#334155' : '#f1f5f9'}`,
                backgroundColor: theme === 'dark' ? 'rgba(30, 41, 59, 0.8)' : '#f8fafc',
                textAlign: 'center'
              }}>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/alerts');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#00a651',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  View All Price Drop Alerts
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          )}
        </div>
        {user ? (
          <div ref={profileRef} style={{ position: 'relative' }}>
            <div
              onClick={() => {
                setShowDropdown(!showDropdown);
                setShowNotifications(false);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#00a651',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '16px',
                  border: '1.5px solid #00a651',
                  boxShadow: '0 2px 6px rgba(0,166,81,0.25)',
                  flexShrink: 0
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'T'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: theme === 'dark' ? '#f8fafc' : '#0f172a', lineHeight: 1.1 }}>{user.name}</span>
                <span style={{ fontSize: '11px', color: '#64748b' }}>{user.role || 'Premium User'}</span>
              </div>
              <ChevronDown size={14} color="#64748b" />
            </div>
            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                border: `1px solid ${theme === 'dark' ? '#334155' : '#e2e8f0'}`,
                borderRadius: '12px',
                padding: '8px',
                width: '200px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                zIndex: 50
              }}>
                <div style={{ padding: '8px', borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#f1f5f9'}`, marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: theme === 'dark' ? '#f8fafc' : '#0f172a', display: 'block' }}>{user.name}</span>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</span>
                </div>
                <button
                  onClick={() => { setShowDropdown(false); navigate('/profile'); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    color: theme === 'dark' ? '#f8fafc' : '#334155',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginBottom: '2px'
                  }}
                >
                  <User size={14} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => { setShowDropdown(false); navigate('/settings'); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    color: theme === 'dark' ? '#f8fafc' : '#334155',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginBottom: '4px'
                  }}
                >
                  <SettingsIcon size={14} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    border: 'none',
                    backgroundColor: '#fef2f2',
                    borderRadius: '8px',
                    color: '#ef4444',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/auth')}
            style={{
              backgroundColor: '#00a651',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <LogIn size={15} />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
}