import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Phone, 
  Globe, 
  DollarSign, 
  Crown, 
  Camera, 
  Upload, 
  Check, 
  Sparkles 
} from 'lucide-react';
export default function Profile() {
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
  const [savedSuccess, setSavedSuccess] = useState(false);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('shopintel_user', JSON.stringify(user));
    window.dispatchEvent(new Event('user_session_updated'));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ padding: '24px 28px', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>Profile</h2>
        <p style={{ fontSize: '14px', color: '#64748b' }}>Manage your account information.</p>
      </div>
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
      }}>
        <form onSubmit={handleSave}>
          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '40px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '16px' }}>
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
                  fontSize: '64px',
                  border: '4px solid #f1f5f9',
                  boxShadow: '0 4px 12px rgba(0,166,81,0.2)'
                }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'T'}
                </div>
                <button
                  type="button"
                  style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    border: '2px solid #ffffff',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}
                >
                  <Camera size={18} />
                </button>
              </div>
              <button
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#334155',
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: '8px'
                }}
              >
                <Upload size={14} />
                <span>Change Photo</span>
              </button>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>JPG, PNG up to 5MB</span>
            </div>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Location</label>
                  <div style={{ position: 'relative' }}>
                    <MapPin size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      name="location"
                      value={user.location}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 36px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Bio</label>
                  <textarea
                    name="bio"
                    rows="2"
                    value={user.bio}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      fontSize: '13px',
                      outline: 'none',
                      resize: 'none',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Date of Birth</label>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      name="dob"
                      value={user.dob}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 36px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Phone Number</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input
                      type="text"
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 36px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Language</label>
                  <div style={{ position: 'relative' }}>
                    <Globe size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <select
                      name="language"
                      value={user.language}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 36px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="English (India)">English (India)</option>
                      <option value="English (US)">English (US)</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>Currency</label>
                  <div style={{ position: 'relative' }}>
                    <DollarSign size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <select
                      name="currency"
                      value={user.currency}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 36px',
                        borderRadius: '10px',
                        border: '1px solid #cbd5e1',
                        fontSize: '13px',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="INR (₹)">INR (₹)</option>
                      <option value="USD ($)">USD ($)</option>
                      <option value="EUR (€)">EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{
                backgroundColor: '#f2fbf5',
                border: '1px solid #dcfce7',
                borderRadius: '14px',
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Crown size={20} color="#eab308" />
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#15803d' }}>Account Status: {user.role || 'Premium User'}</span>
                </div>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #bbf7d0',
                    borderRadius: '8px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#15803d',
                    cursor: 'pointer'
                  }}
                >
                  Manage Plan
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
                {savedSuccess && (
                  <span style={{ fontSize: '13px', color: '#00a651', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={16} /> Changes saved successfully!
                  </span>
                )}
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#00a651',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '10px 24px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,166,81,0.2)'
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}