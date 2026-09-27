import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Bot, 
  Grid, 
  Scale, 
  Tag, 
  Bell, 
  Heart, 
  BarChart2, 
  Clock, 
  User, 
  Settings, 
  Leaf, 
  ChevronDown,
  ChevronUp,
  Laptop,
  Smartphone,
  Monitor
} from 'lucide-react';
export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isBrowseOpen, setIsBrowseOpen] = useState(
    location.pathname.startsWith('/browse')
  );
  useEffect(() => {
    if (location.pathname.startsWith('/browse')) {
      setIsBrowseOpen(true);
    }
  }, [location.pathname]);
  const toggleBrowseSubmenu = (e) => {
    e.preventDefault();
    setIsBrowseOpen(!isBrowseOpen);
    if (!location.pathname.startsWith('/browse')) {
      navigate('/browse');
    }
  };
  const categories = [
    { name: 'Laptops', path: '/browse?category=Laptops', icon: Laptop },
    { name: 'Smartphones', path: '/browse?category=Smartphones', icon: Smartphone },
    { name: 'Monitors', path: '/browse?category=Monitors', icon: Monitor },
  ];
  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 16px',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingLeft: '4px' }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          backgroundColor: '#00a651',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff'
        }}>
          <Leaf size={22} color="#ffffff" fill="#ffffff" />
        </div>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', lineHeight: 1.1 }}>ShopIntel AI</h1>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '500' }}>AI Shopping Assistant</span>
        </div>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: isActive ? '700' : '600',
            color: isActive ? '#00a651' : '#475569',
            backgroundColor: isActive ? '#e6f7ef' : 'transparent',
            textDecoration: 'none'
          })}
        >
          <Home size={17} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/assistant"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: isActive ? '700' : '600',
            color: isActive ? '#00a651' : '#475569',
            backgroundColor: isActive ? '#e6f7ef' : 'transparent',
            textDecoration: 'none'
          })}
        >
          <Bot size={17} />
          <span>AI Assistant</span>
        </NavLink>
        <div>
          <div
            onClick={toggleBrowseSubmenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '9px 12px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: location.pathname.startsWith('/browse') ? '700' : '600',
              color: location.pathname.startsWith('/browse') ? '#00a651' : '#475569',
              backgroundColor: location.pathname.startsWith('/browse') ? '#e6f7ef' : 'transparent',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Grid size={17} color={location.pathname.startsWith('/browse') ? '#00a651' : '#475569'} />
              <span>Browse Products</span>
            </div>
            {isBrowseOpen ? <ChevronUp size={14} color="#00a651" /> : <ChevronDown size={14} color="#94a3b8" />}
          </div>
          {isBrowseOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '4px', marginBottom: '4px' }}>
              {categories.map(sub => {
                const SubIcon = sub.icon;
                const searchParams = new URLSearchParams(location.search);
                const currentCat = searchParams.get('category') || 'Laptops';
                const isSubActive = location.pathname.startsWith('/browse') && currentCat === sub.name;
                return (
                  <NavLink
                    key={sub.name}
                    to={sub.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px 8px 34px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: isSubActive ? '800' : '600',
                      color: isSubActive ? '#00a651' : '#64748b',
                      backgroundColor: isSubActive ? '#dcfce7' : 'transparent',
                      textDecoration: 'none'
                    }}
                  >
                    <SubIcon size={14} color={isSubActive ? '#00a651' : '#64748b'} />
                    <span>{sub.name}</span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
        <NavLink
          to="/compare"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: isActive ? '700' : '600',
            color: isActive ? '#00a651' : '#475569',
            backgroundColor: isActive ? '#e6f7ef' : 'transparent',
            textDecoration: 'none'
          })}
        >
          <Scale size={17} />
          <span>Compare Products</span>
        </NavLink>
        <NavLink
          to="/alerts"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: isActive ? '700' : '600',
            color: isActive ? '#00a651' : '#475569',
            backgroundColor: isActive ? '#e6f7ef' : 'transparent',
            textDecoration: 'none'
          })}
        >
          <Bell size={17} />
          <span>Price Drop Alerts</span>
        </NavLink>
        <NavLink
          to="/watchlist"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: isActive ? '700' : '600',
            color: isActive ? '#00a651' : '#475569',
            backgroundColor: isActive ? '#e6f7ef' : 'transparent',
            textDecoration: 'none'
          })}
        >
          <Heart size={17} />
          <span>Watchlist</span>
        </NavLink>
        <NavLink
          to="/analytics"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: isActive ? '700' : '600',
            color: isActive ? '#00a651' : '#475569',
            backgroundColor: isActive ? '#e6f7ef' : 'transparent',
            textDecoration: 'none'
          })}
        >
          <BarChart2 size={17} />
          <span>Analytics</span>
        </NavLink>
        <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '16px 0' }} />
        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            color: isActive ? '#00a651' : '#475569',
            backgroundColor: isActive ? '#e6f7ef' : 'transparent',
            textDecoration: 'none'
          })}
        >
          <User size={17} />
          <span>Profile</span>
        </NavLink>
        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '9px 12px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            color: isActive ? '#00a651' : '#475569',
            backgroundColor: isActive ? '#e6f7ef' : 'transparent',
            textDecoration: 'none'
          })}
        >
          <Settings size={17} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
}