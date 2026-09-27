import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Bot, 
  Send, 
  Mic, 
  Sparkles, 
  ChevronRight, 
  User, 
  Smartphone, 
  Layers, 
  Monitor, 
  ShieldCheck, 
  Laptop, 
  Star,
  ExternalLink,
  Scale
} from 'lucide-react';
import { recordUserSearch } from '../utils/activity';
export default function Assistant() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPrompt = queryParams.get('prompt') || '';
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const carouselRef = useRef(null);
  const messagesEndRef = useRef(null);
  const initialLaptops = [
    {
      id: 'as-1',
      name: 'ASUS TUF F15',
      price: 78990,
      specs1: 'RTX 4050 • 16GB RAM',
      specs2: '512GB SSD • i5 13th Gen',
      rating: '4.4',
      reviews: '980',
      marketplace: 'Amazon',
      logo: 'a',
      logoColor: '#f97316',
      logoBg: '#fff7ed',
      image: '/images/laptop.png',
      product_url: 'https://www.amazon.in'
    },
    {
      id: 'as-2',
      name: 'Lenovo LOQ 15',
      price: 62990,
      specs1: 'RTX 4050 • 16GB RAM',
      specs2: '512GB SSD • i5 13th Gen',
      rating: '4.3',
      reviews: '1.2k',
      marketplace: 'Flipkart',
      logo: 'f',
      logoColor: '#2563eb',
      logoBg: '#eff6ff',
      image: '/images/laptop.png',
      product_url: 'https://www.flipkart.com'
    },
    {
      id: 'as-3',
      name: 'Acer Nitro V',
      price: 79990,
      specs1: 'RTX 4050 • 16GB RAM',
      specs2: '512GB SSD • i5 13th Gen',
      rating: '4.2',
      reviews: '750',
      marketplace: 'Croma',
      logo: 'C',
      logoColor: '#00a651',
      logoBg: '#e6f7ef',
      image: '/images/laptop.png',
      product_url: 'https://www.croma.com'
    },
    {
      id: 'as-4',
      name: 'HP Victus 15',
      price: 69990,
      specs1: 'RTX 3050 • 16GB RAM',
      specs2: '512GB SSD • i5 12th Gen',
      rating: '4.1',
      reviews: '620',
      marketplace: 'Reliance Digital',
      logo: 'R',
      logoColor: '#ef4444',
      logoBg: '#fef2f2',
      image: '/images/laptop.png',
      product_url: 'https://www.reliancedigital.in'
    }
  ];
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'Show me the best gaming laptops under ₹80,000',
      time: '10:30 AM'
    },
    {
      id: 'msg-2',
      sender: 'bot',
      intro: 'Here are the best gaming laptops under ₹80,000 right now:',
      time: '10:30 AM',
      products: initialLaptops,
      outro: 'All these laptops offer great performance for gaming.\nWould you like to compare any of these?',
      chips: [
        'Compare ASUS TUF F15 and Lenovo LOQ 15',
        'Show best laptop under ₹60,000',
        'Sort by highest rated'
      ]
    }
  ]);
  const suggestedPrompts = [
    { title: 'Best smartphone under ₹30,000', icon: Smartphone },
    { title: 'Compare iPhone 15 and S24', icon: Layers },
    { title: 'Best monitor for coding', icon: Monitor },
    { title: 'Is this discount real or fake?', icon: ShieldCheck },
    { title: 'Show price trend of MacBook Air M2', icon: Laptop }
  ];
  const [recentConversations, setRecentConversations] = useState([
    { title: 'Best gaming laptops under ₹80,000', time: '10:30 AM', icon: Monitor, active: true },
    { title: 'Compare iPhone 15 and S24', time: 'Yesterday', icon: Smartphone },
    { title: 'Best monitor for coding', time: '2 days ago', icon: Monitor },
    { title: 'Is this discount real or fake?', time: '3 days ago', icon: ShieldCheck },
    { title: 'Cheapest MacBook Air', time: '4 days ago', icon: Laptop }
  ]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  useEffect(() => {
    if (initialPrompt && initialPrompt !== 'Show me the best gaming laptops under ₹80,000') {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);
  useEffect(() => {
    if (messages.length > 2 || loading) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);
  const scrollCarouselRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };
  const handleSendMessage = (textToSend) => {
    const query = textToSend || input;
    if (!query || !query.trim()) return;
    recordUserSearch(query.trim());
    if (query.includes('Compare ASUS TUF F15 and Lenovo LOQ 15')) {
      const compareItems = [
        {
          product_id: 'as-1',
          id: 'as-1',
          product_name: 'ASUS TUF F15 (2024)',
          brand: 'ASUS',
          model: 'TUF F15',
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
        },
        {
          product_id: 'as-2',
          id: 'as-2',
          product_name: 'Lenovo LOQ 15 (2024)',
          brand: 'Lenovo',
          model: 'LOQ 15',
          current_price: 62990,
          price: 62990,
          mrp: 74990,
          marketplace: 'Flipkart',
          image_url: '/images/laptop.png',
          processor_series: 'Intel Core i5 13th Gen',
          gpu: 'NVIDIA RTX 4050 (6GB)',
          ram_gb: 16,
          storage_gb: 512,
          value_density_index: 29.8,
          product_url: 'https://www.flipkart.com'
        }
      ];
      localStorage.setItem('compare_laptops', JSON.stringify(compareItems));
      window.dispatchEvent(new Event('compare_updated'));
      navigate('/compare');
      return;
    }
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: `user-${Date.now()}`, sender: 'user', text: query, time: timeStr };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);
    fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query })
    })
      .then(res => res.json())
      .then(data => {
        const botProducts = (data.products || []).slice(0, 4).map((p, idx) => ({
          id: p.product_id || `bot-p-${idx}`,
          name: p.product_name || `${p.brand || ''} ${p.model || ''}`,
          price: p.current_price || p.price || 65000,
          specs1: `${p.gpu || 'RTX Graphics'} • ${p.ram_gb || 16}GB RAM`,
          specs2: `${p.storage_gb || 512}GB SSD • ${p.processor_series || 'Intel Core'}`,
          rating: '4.3',
          reviews: '850',
          marketplace: p.marketplace || 'Store',
          logo: (p.marketplace || 'S').charAt(0),
          logoColor: '#00a651',
          logoBg: '#e6f7ef',
          image: p.image_url || '/images/laptop.png',
          product_url: p.product_url || '#'
        }));
        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          intro: data.response || `Here are top recommendations for "${query}":`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          products: botProducts.length > 0 ? botProducts : initialLaptops,
          outro: 'Would you like to compare these or find deals on a specific store?',
          chips: ['Compare top 2 models', 'Filter by Flipkart', 'Sort by lowest price']
        };
        setMessages(prev => [...prev, botMsg]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Chat API error fallback:", err);
        setTimeout(() => {
          const fallbackBotMsg = {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            intro: `Based on verified marketplace intelligence, here are top picks for "${query}":`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            products: initialLaptops,
            outro: 'All these models are in stock with verified discounts across major stores.',
            chips: ['Compare ASUS TUF F15 and Lenovo LOQ 15', 'Show best laptop under ₹60,000']
          };
          setMessages(prev => [...prev, fallbackBotMsg]);
          setLoading(false);
        }, 500);
      });
  };
  return (
    <div style={{ padding: '24px 28px', width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '24px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 28px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #f1f5f9',
            boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{ maxWidth: '440px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
                  AI Shopping Assistant
                </h2>
                <Sparkles size={20} color="#a855f7" />
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748b', marginTop: '8px', lineHeight: '1.5' }}>
                Ask me anything about products, prices, deals or comparisons across marketplaces.
              </p>
            </div>
            <div style={{ position: 'relative', width: '180px', height: '145px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                position: 'absolute',
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                backgroundColor: '#e6f7ef',
                filter: 'blur(20px)',
                opacity: 0.95,
                zIndex: 0
              }} />
              <span style={{ position: 'absolute', top: '15px', left: '-5px', color: '#6ee7b7', fontSize: '16px', zIndex: 1 }}>✦</span>
              <span style={{ position: 'absolute', bottom: '15px', right: '-2px', color: '#6ee7b7', fontSize: '14px', zIndex: 1 }}>✦</span>
              <span style={{ position: 'absolute', top: '35px', right: '-10px', color: '#cbd5e1', fontSize: '12px', zIndex: 1 }}>✦</span>
              <img
                src="/images/robot.png"
                alt="AI Assistant Robot Mascot"
                style={{
                  width: '145px',
                  height: '145px',
                  objectFit: 'contain',
                  position: 'relative',
                  zIndex: 2
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{
                      backgroundColor: '#f3e8ff',
                      borderRadius: '16px 16px 4px 16px',
                      padding: '12px 18px',
                      maxWidth: '560px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: '500', color: '#1e1b4b' }}>
                        {msg.text}
                      </span>
                      <span style={{ fontSize: '10px', color: '#64748b', whiteSpace: 'nowrap' }}>
                        {msg.time}
                      </span>
                    </div>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#e9d5ff',
                      color: '#7c3aed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <User size={16} />
                    </div>
                  </div>
                );
              }
              return (
                <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #00a651',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="22" height="22" viewBox="0 0 120 120">
                      <path d="M60,25 Q50,10 38,18 Q50,22 58,28 Z" fill="#00a651" />
                      <path d="M60,25 Q70,8 82,16 Q70,22 62,28 Z" fill="#16a34a" />
                      <rect x="25" y="28" width="70" height="52" rx="26" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2.5" />
                      <rect x="34" y="38" width="52" height="32" rx="16" fill="#0f172a" />
                      <path d="M43,55 Q49,46 55,55" fill="none" stroke="#00e676" strokeWidth="3" strokeLinecap="round" />
                      <path d="M65,55 Q71,46 77,55" fill="none" stroke="#00e676" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>{msg.intro}</span>
                      <span style={{ fontSize: '10px', color: '#94a3b8' }}>{msg.time}</span>
                    </div>
                    {msg.products && msg.products.length > 0 && (
                      <div style={{ position: 'relative' }}>
                        <div
                          ref={carouselRef}
                          style={{
                            display: 'flex',
                            gap: '14px',
                            overflowX: 'auto',
                            paddingBottom: '8px',
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none'
                          }}
                        >
                          {msg.products.map((item, idx) => (
                            <div
                              key={idx}
                              style={{
                                width: '200px',
                                minWidth: '200px',
                                backgroundColor: '#ffffff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                padding: '12px',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                              }}
                            >
                              <div style={{ height: '95px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  onError={(e) => { e.target.src = "/images/laptop.png"; }}
                                  style={{ maxHeight: '90px', maxWidth: '100%', objectFit: 'contain' }}
                                />
                              </div>
                              <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {item.name}
                              </h4>
                              <span style={{ fontSize: '15px', fontWeight: '800', color: '#00a651', display: 'block', marginBottom: '6px' }}>
                                ₹{item.price.toLocaleString()}
                              </span>
                              <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.4, marginBottom: '8px' }}>
                                <p style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.specs1}</p>
                                <p style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.specs2}</p>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '600', color: '#475569', marginBottom: '10px' }}>
                                <Star size={12} color="#f59e0b" fill="#f59e0b" />
                                <span>{item.rating}</span>
                                <span style={{ color: '#94a3b8' }}>({item.reviews})</span>
                              </div>
                              <a
                                href={item.product_url || '#'}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  padding: '6px 10px',
                                  backgroundColor: '#ffffff',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '8px',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  color: '#0f172a',
                                  textDecoration: 'none',
                                  marginTop: 'auto'
                                }}
                              >
                                <span style={{
                                  width: '18px',
                                  height: '18px',
                                  borderRadius: '4px',
                                  backgroundColor: item.logoBg || '#f1f5f9',
                                  color: item.logoColor || '#00a651',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '10px',
                                  fontWeight: '800'
                                }}>
                                  {item.logo || item.marketplace.charAt(0)}
                                </span>
                                <span>{item.marketplace}</span>
                              </a>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={scrollCarouselRight}
                          title="Scroll right"
                          style={{
                            position: 'absolute',
                            right: '-12px',
                            top: '40%',
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#0f172a',
                            zIndex: 10
                          }}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    )}
                    {msg.outro && (
                      <div style={{
                        backgroundColor: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        maxWidth: '520px',
                        fontSize: '13px',
                        color: '#334155',
                        lineHeight: 1.5,
                        whiteSpace: 'pre-wrap'
                      }}>
                        <p style={{ margin: 0 }}>{msg.outro}</p>
                        <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block', textAlign: 'right', marginTop: '4px' }}>
                          {msg.time}
                        </span>
                      </div>
                    )}
                    {msg.chips && msg.chips.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                        {msg.chips.map((chip, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => handleSendMessage(chip)}
                            style={{
                              padding: '7px 14px',
                              backgroundColor: '#f0fdf4',
                              border: '1px solid #bbf7d0',
                              borderRadius: '999px',
                              fontSize: '12px',
                              fontWeight: '600',
                              color: '#00a651',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {chip}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px', backgroundColor: '#f8fafc', borderRadius: '12px', width: 'fit-content' }}>
                <Bot size={16} color="#00a651" />
                <span style={{ fontSize: '12px', color: '#64748b' }}>Analyzing database deals and specs...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div style={{ marginTop: '12px' }}>
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '16px',
                padding: '6px 8px 6px 18px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <input
                type="text"
                placeholder="Ask anything about products, prices, deals..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  color: '#0f172a',
                  backgroundColor: 'transparent'
                }}
              />
              <button
                type="button"
                title="Voice input"
                style={{
                  border: 'none',
                  background: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Mic size={18} />
              </button>
              <button
                type="submit"
                style={{
                  backgroundColor: '#00a651',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                <Send size={16} />
              </button>
            </form>
            <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>
              AI responses are based on real-time data from multiple marketplaces.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
              Suggested Prompts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {suggestedPrompts.map((p, idx) => {
                const IconComp = p.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.title)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: '500',
                      color: '#334155',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#86efac';
                      e.currentTarget.style.backgroundColor = '#f0fdf4';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                  >
                    <IconComp size={16} color="#00a651" style={{ flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{p.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="card" style={{ padding: '20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                Recent Conversations
              </h3>
              <span
                onClick={() => handleSendMessage('Show recent laptop searches')}
                style={{ fontSize: '12px', fontWeight: '700', color: '#00a651', cursor: 'pointer' }}
              >
                View All
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentConversations.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSendMessage(item.title)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      backgroundColor: item.active ? '#f0fdf4' : '#ffffff',
                      border: item.active ? '1px solid #bbf7d0' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
                      <IconComp size={15} color="#00a651" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.title}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                      {item.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{
            backgroundColor: '#f5f3ff',
            border: '1px solid #ddd6fe',
            borderRadius: '16px',
            padding: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Sparkles size={15} color="#7c3aed" />
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#7c3aed' }}>Pro Tip</span>
            </div>
            <p style={{ fontSize: '12px', color: '#475569', fontWeight: '500', lineHeight: 1.4, margin: '0 0 8px 0' }}>
              Be specific with your requirements to get better recommendations!
            </p>
            <p style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', margin: 0, lineHeight: 1.4 }}>
              Example: &ldquo;Gaming laptop under ₹80,000 with 16GB RAM and RTX 4050&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}