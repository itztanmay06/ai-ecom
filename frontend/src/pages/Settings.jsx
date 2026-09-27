import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Bell, 
  Palette, 
  Shield, 
  Camera, 
  Mail, 
  MapPin, 
  Tag, 
  Sun, 
  Moon,
  Trash2, 
  ChevronRight, 
  Check 
} from 'lucide-react';
export default function Settings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const defaultUser = {
    name: 'Tanmay',
    email: 'aiecom@gmail.com',
    password: '1234',
    role: 'Premium User',
    location: 'New Delhi, India'
  };
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('shopintel_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return defaultUser;
  });
  useEffect(() => {
    const handleUserUpdate = () => {
      const saved = localStorage.getItem('shopintel_user');
      if (saved) {
        try {
          setUser(JSON.parse(saved));
        } catch (e) {}
      }
    };
    window.addEventListener('user_session_updated', handleUserUpdate);
    return () => window.removeEventListener('user_session_updated', handleUserUpdate);
  }, []);
  const [priceDropAlerts, setPriceDropAlerts] = useState(true);
  const [dealNotifications, setDealNotifications] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('shopintel_theme') || 'light';
  });
  const handleThemeChange = (newTheme) => {
    const activeTheme = newTheme === 'System' ? 'light' : newTheme.toLowerCase();
    setTheme(activeTheme);
    localStorage.setItem('shopintel_theme', activeTheme);
    document.documentElement.setAttribute('data-theme', activeTheme);
    window.dispatchEvent(new Event('theme_updated'));
  };
  useEffect(() => {
    const handleThemeUpdate = () => {
      const saved = localStorage.getItem('shopintel_theme') || 'light';
      setTheme(saved);
    };
    window.addEventListener('theme_updated', handleThemeUpdate);
    return () => window.removeEventListener('theme_updated', handleThemeUpdate);
  }, []);

  return (
    <div style={{ padding: '24px 28px', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>Settings</h2>
        </div>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Manage your account and app preferences.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '24px' }}>
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '12px',
          height: 'fit-content'
        }}>
          <button
            onClick={() => setActiveTab('account')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '700',
              color: activeTab === 'account' ? '#00a651' : '#475569',
              backgroundColor: activeTab === 'account' ? '#e6f7ef' : 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: '4px'
            }}
          >
            <User size={18} />
            <span>Account</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              color: activeTab === 'notifications' ? '#00a651' : '#475569',
              backgroundColor: activeTab === 'notifications' ? '#e6f7ef' : 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: '4px'
            }}
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              color: activeTab === 'appearance' ? '#00a651' : '#475569',
              backgroundColor: activeTab === 'appearance' ? '#e6f7ef' : 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              marginBottom: '4px'
            }}
          >
            <Palette size={18} />
            <span>Appearance</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '12px 14px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              color: activeTab === 'security' ? '#00a651' : '#475569',
              backgroundColor: activeTab === 'security' ? '#e6f7ef' : 'transparent',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            <Shield size={18} />
            <span>Security</span>
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Account Details</h3>
              <button
                onClick={() => navigate('/profile')}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                Edit Profile ↗
              </button>
            </div>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>Update your personal information.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ position: 'relative', width: '90px', height: '90px' }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#00a651',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '800',
                  fontSize: '36px'
                }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'T'}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Camera size={13} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <User size={16} color="#94a3b8" />
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Full Name</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{user.name}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={16} color="#94a3b8" />
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Email Address</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{user.email}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <MapPin size={16} color="#94a3b8" />
                  <div>
                    <span style={{ fontSize: '11px', color: '#64748b', display: 'block' }}>Location</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{user.location || 'New Delhi, India'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>Notifications</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>Choose what updates you want to receive.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Tag size={18} color="#00a651" />
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Price Drop Alerts</h4>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>Get notified when prices drop for your watched products.</p>
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={priceDropAlerts}
                    onChange={() => setPriceDropAlerts(!priceDropAlerts)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: priceDropAlerts ? '#00a651' : '#cbd5e1',
                    borderRadius: '24px',
                    transition: '0.2s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '18px',
                      width: '18px',
                      left: priceDropAlerts ? '22px' : '3px',
                      bottom: '3px',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      transition: '0.2s'
                    }} />
                  </span>
                </label>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Bell size={18} color="#00a651" />
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Deal Notifications</h4>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>Receive notifications about new deals and offers.</p>
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={dealNotifications}
                    onChange={() => setDealNotifications(!dealNotifications)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: dealNotifications ? '#00a651' : '#cbd5e1',
                    borderRadius: '24px',
                    transition: '0.2s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '18px',
                      width: '18px',
                      left: dealNotifications ? '22px' : '3px',
                      bottom: '3px',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%',
                      transition: '0.2s'
                    }} />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '2px' }}>Appearance</h3>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Choose your preferred theme.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {theme === 'dark' ? <Moon size={18} color="#7c3aed" /> : <Sun size={18} color="#f59e0b" />}
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>Theme</span>
              </div>
              <select
                value={theme === 'dark' ? 'Dark' : 'Light'}
                onChange={(e) => handleThemeChange(e.target.value)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  fontWeight: '600',
                  backgroundColor: '#ffffff',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
              </select>
            </div>
          </div>
          <div style={{
            backgroundColor: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>Account Actions</h3>
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Trash2 size={18} color="#ef4444" />
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#dc2626' }}>Delete Account</span>
              </div>
              <ChevronRight size={18} color="#dc2626" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}