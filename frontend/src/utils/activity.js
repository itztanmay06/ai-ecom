export const getAccountActivity = () => {
  try {
    const raw = localStorage.getItem('shopintel_user_activity');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    search_count: 0,
    searches: []
  };
};
export const recordUserSearch = (query) => {
  if (!query || !query.trim()) return;
  const cleaned = query.trim();
  try {
    const act = getAccountActivity();
    if (!Array.isArray(act.searches)) act.searches = [];
    const now = Date.now();
    const lastSearch = act.searches[act.searches.length - 1];
    if (lastSearch && lastSearch.query.toLowerCase() === cleaned.toLowerCase() && (now - lastSearch.time < 4000)) {
      return;
    }
    act.searches.push({ query: cleaned, time: now });
    act.search_count = (act.search_count || 0) + 1;
    localStorage.setItem('shopintel_user_activity', JSON.stringify(act));
    window.dispatchEvent(new Event('user_activity_updated'));
  } catch (e) {}
};
export const recordUserCompare = () => {
  try {
    const act = getAccountActivity();
    act.total_compared = (act.total_compared || 0) + 1;
    localStorage.setItem('shopintel_user_activity', JSON.stringify(act));
    window.dispatchEvent(new Event('user_activity_updated'));
  } catch (e) {}
};
export const getRealAccountMetrics = () => {
  let watchlistCount = 0;
  try {
    const w = localStorage.getItem('watchlist_items');
    if (w) {
      const parsed = JSON.parse(w);
      if (Array.isArray(parsed)) watchlistCount = parsed.length;
    }
  } catch (e) {}
  let alertsCount = 0;
  try {
    const a = localStorage.getItem('price_alerts');
    if (a) {
      const parsed = JSON.parse(a);
      if (Array.isArray(parsed)) alertsCount = parsed.length;
    } else {
      alertsCount = 4;
    }
  } catch (e) {}
  let comparedCount = 0;
  try {
    const c = localStorage.getItem('compare_laptops');
    if (c) {
      const parsed = JSON.parse(c);
      if (Array.isArray(parsed)) comparedCount = parsed.length;
    }
  } catch (e) {}
  const act = getAccountActivity();
  const searchCount = act.search_count || 0;
  return {
    searched: searchCount,
    compared: comparedCount,
    watchlist: watchlistCount,
    alerts: alertsCount
  };
};
export const recordRecentlyViewed = (product) => {
  if (!product) return;
  try {
    const raw = localStorage.getItem('recently_viewed');
    let items = [];
    if (raw) {
      try { items = JSON.parse(raw); } catch (e) {}
    }
    if (!Array.isArray(items)) items = [];
    const id = product.product_id || product.id || product.product_name || product.name;
    if (!id) return;
    const name = product.product_name || product.name || product.model || 'Product';
    const price = product.current_price || product.price || 0;
    const image = product.image_url || product.image || '/images/laptop.png';
    const product_url = product.product_url || '#';
    const marketplace = product.marketplace || 'Store';
    const newItem = { id, product_id: id, name, price, image, product_url, marketplace };
    items = items.filter(i => (i.product_id || i.id) !== id);
    items.unshift(newItem);
    items = items.slice(0, 10);
    localStorage.setItem('recently_viewed', JSON.stringify(items));
    window.dispatchEvent(new Event('recently_viewed_updated'));
  } catch (e) {}
};