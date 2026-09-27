import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, Lock, Mail, User, Eye, EyeOff, CheckCircle } from 'lucide-react';
export default function Auth() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('aiecom@gmail.com');
  const [password, setPassword] = useState('1234');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (isSignUp) {
      if (!name) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      const newUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: 'Premium User',
        token: 'auth_token_' + Date.now()
      };
      localStorage.setItem('shopintel_user', JSON.stringify(newUser));
      setSuccess('Account created successfully! Redirecting to dashboard...');
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);
    } else {
      let userName = name.trim();
      if (!userName) {
        if (email.trim().toLowerCase() === 'aiecom@gmail.com') {
          userName = 'Tanmay';
        } else {
          const raw = email.split('@')[0] || 'Tanmay';
          userName = raw.charAt(0).toUpperCase() + raw.slice(1);
        }
      }
      const userObj = {
        name: userName,
        email: email.trim().toLowerCase(),
        password: password,
        role: 'Premium User',
        token: 'auth_token_' + Date.now()
      };
      localStorage.setItem('shopintel_user', JSON.stringify(userObj));
      window.dispatchEvent(new Event('user_session_updated'));
      setSuccess('Signed in successfully! Welcome back.');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };
  return (
    <div style={{
      minHeight: 'calc(100vh - 120px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '24px',
        padding: '36px 32px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            backgroundColor: '#e6f7ef',
            color: '#00a651',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            {isSignUp ? <UserPlus size={24} /> : <LogIn size={24} />}
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            {isSignUp ? 'Create your account' : 'Welcome back'}
          </h2>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
            {isSignUp ? 'Join ShopIntel AI for real-time price tracking' : 'Sign in to access your price alerts and saved laptops'}
          </p>
        </div>
        <div style={{
          display: 'flex',
          backgroundColor: '#f1f5f9',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '24px'
        }}>
          <button
            onClick={() => { setIsSignUp(false); setError(''); setSuccess(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: !isSignUp ? '#ffffff' : 'transparent',
              color: !isSignUp ? '#0f172a' : '#64748b',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: !isSignUp ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); setError(''); setSuccess(''); }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '9px',
              border: 'none',
              backgroundColor: isSignUp ? '#ffffff' : 'transparent',
              color: isSignUp ? '#0f172a' : '#64748b',
              fontSize: '13px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: isSignUp ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            Sign Up
          </button>
        </div>
        {error && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#ef4444', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '600', marginBottom: '16px' }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={16} />
            <span>{success}</span>
          </div>
        )}
        {!isSignUp && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#00a651', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block' }}>
                Default Login Credentials
              </span>
              <span style={{ fontSize: '12px', color: '#166534', fontWeight: '700' }}>
                Email: <strong>aiecom@gmail.com</strong> | Password: <strong>1234</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('aiecom@gmail.com');
                setPassword('1234');
              }}
              style={{
                backgroundColor: '#00a651',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '5px 10px',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Auto-Fill
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isSignUp && (
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Full Name</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <User size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
                <input
                  type="text"
                  placeholder="e.g. Aditya Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                />
              </div>
            </div>
          )}
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Email Address</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '10px 38px 10px 38px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {isSignUp && (
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Confirm Password</label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' }}
                />
              </div>
            </div>
          )}
          {!isSignUp && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ accentColor: '#00a651' }}
                />
                <span>Remember me</span>
              </label>
              <span style={{ fontSize: '12px', color: '#00a651', fontWeight: '700', cursor: 'pointer' }}>Forgot password?</span>
            </div>
          )}
          <button
            type="submit"
            style={{
              backgroundColor: '#00a651',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            {isSignUp ? 'Create Free Account' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}