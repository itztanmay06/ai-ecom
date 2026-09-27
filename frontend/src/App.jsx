import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Compare from './pages/Compare';
import Watchlist from './pages/Watchlist';
import Assistant from './pages/Assistant';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PriceHistory from './pages/PriceHistory';
import Analytics from './pages/Analytics';
import PriceDropAlerts from './pages/PriceDropAlerts';
function RootRoute() {
  const hasUser = localStorage.getItem('shopintel_user');
  if (!hasUser) {
    return <Auth />;
  }
  return <Home />;
}
export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', backgroundColor: '#f8fafc' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflow: 'hidden' }}>
          <Header />
          <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingBottom: '40px' }}>
            <Routes>
              <Route path="/" element={<RootRoute />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/deals" element={<Browse />} />
              <Route path="/alerts" element={<PriceDropAlerts />} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/history" element={<PriceHistory />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}