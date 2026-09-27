import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'data');

let laptops = [];
let monitors = [];
let smartphones = [];

try {
  laptops = JSON.parse(fs.readFileSync(path.join(dataDir, 'cleaned_laptops_master.json'), 'utf-8'));
} catch (e) { laptops = []; }

try {
  monitors = JSON.parse(fs.readFileSync(path.join(dataDir, 'cleaned_monitors_master.json'), 'utf-8'));
} catch (e) { monitors = []; }

try {
  smartphones = JSON.parse(fs.readFileSync(path.join(dataDir, 'cleaned_smartphones_master.json'), 'utf-8'));
} catch (e) { smartphones = []; }

const apiKey = process.env.GEMINI_API_KEY || '';
let genAI = null;
if (apiKey) {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
  } catch (e) {}
}

function parseBudget(query) {
  const q = query.toLowerCase();
  let maxPrice = null;
  let minPrice = null;

  const rangeMatch = q.match(/(?:between|from)?\s*(\d+(?:\.\d+)?)\s*(k|l|lakh)?\s*(?:to|-|and)\s*(\d+(?:\.\d+)?)\s*(k|l|lakh)?/i);
  if (rangeMatch) {
    let minVal = parseFloat(rangeMatch[1]);
    let minUnit = rangeMatch[2];
    let maxVal = parseFloat(rangeMatch[3]);
    let maxUnit = rangeMatch[4] || minUnit;

    if (minUnit === 'k') minVal *= 1000;
    else if (minUnit === 'l' || minUnit === 'lakh') minVal *= 100000;
    else if (minVal < 200) minVal *= 1000;

    if (maxUnit === 'k') maxVal *= 1000;
    else if (maxUnit === 'l' || maxUnit === 'lakh') maxVal *= 100000;
    else if (maxVal < 200) maxVal *= 1000;

    return { minPrice: minVal, maxPrice: maxVal };
  }

  const maxMatches = [
    q.match(/(?:under|below|less than|within|max|<|budget|around)\s*(?:rs\.?|₹)?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(k|l|lakh)?/i),
    q.match(/(?:rs\.?|₹)?\s*(\d+(?:,\d+)*(?:\.\d+)?)\s*(k|l|lakh)?\s*(?:budget|or less|max|under)/i),
    q.match(/(\d+(?:\.\d+)?)\s*(k)\b/i)
  ];

  for (const m of maxMatches) {
    if (m) {
      let num = parseFloat(m[1].replace(/,/g, ''));
      const unit = (m[2] || '').toLowerCase();
      if (unit === 'k') num *= 1000;
      else if (unit === 'l' || unit === 'lakh') num *= 100000;
      else if (num < 200) num *= 1000;
      maxPrice = num;
      break;
    }
  }

  if (!maxPrice) {
    const rawNumMatch = q.match(/\b(\d{4,6})\b/);
    if (rawNumMatch) {
      maxPrice = parseFloat(rawNumMatch[1]);
    }
  }

  return { minPrice, maxPrice };
}

function calcScore(p) {
  const price = p.current_price || p.mrp || 50000;
  const rating = p.rating || 4.0;
  const discount = p.discount_percentage || 0;
  const ram = p.ram_gb || 8;
  return ((rating * 20) + discount + (ram * 2)) / (price / 10000);
}

export async function processChat(message) {
  const msg = (message || '').toLowerCase();
  
  let dataset = laptops;
  let categoryName = 'Laptop';
  
  if (msg.includes('monitor') || msg.includes('display') || msg.includes('screen')) {
    dataset = monitors.length ? monitors : laptops;
    categoryName = 'Monitor';
  } else if (msg.includes('phone') || msg.includes('smartphone') || msg.includes('mobile') || msg.includes('iphone') || msg.includes('galaxy') || msg.includes('oneplus')) {
    dataset = smartphones.length ? smartphones : laptops;
    categoryName = 'Smartphone';
  }

  const { minPrice, maxPrice } = parseBudget(msg);

  let matched = dataset.filter(p => {
    const price = p.current_price || p.mrp;
    if (!price) return false;

    if (maxPrice && price > maxPrice) return false;
    if (minPrice && price < minPrice) return false;

    const name = (p.product_name || `${p.brand || ''} ${p.model || ''}`).toLowerCase();
    
    const isAccessory = /bag|sleeve|case|backpack|cover|charger|stand|cable|mouse|keyboard/i.test(name);
    const userWantsAccessory = /bag|sleeve|case|backpack|cover|charger|stand|cable|mouse|keyboard/i.test(msg);
    if (isAccessory && !userWantsAccessory) return false;

    const specs = [
      p.gpu || '',
      p.processor_series || '',
      p.processor_brand || '',
      p.brand || '',
      p.operating_system || ''
    ].join(' ').toLowerCase();

    if (msg.includes('asus') && !name.includes('asus') && !specs.includes('asus')) return false;
    if (msg.includes('lenovo') && !name.includes('lenovo') && !specs.includes('lenovo')) return false;
    if (msg.includes('acer') && !name.includes('acer') && !specs.includes('acer')) return false;
    if (msg.includes('hp') && !name.includes('hp') && !specs.includes('hp')) return false;
    if (msg.includes('dell') && !name.includes('dell') && !specs.includes('dell')) return false;
    if (msg.includes('apple') || msg.includes('macbook')) {
      if (!name.includes('apple') && !name.includes('macbook')) return false;
    }
    if (msg.includes('samsung') && !name.includes('samsung') && !specs.includes('samsung')) return false;

    if (msg.includes('rtx') && !specs.includes('rtx')) return false;
    if (msg.includes('i5') && !specs.includes('i5')) return false;
    if (msg.includes('i7') && !specs.includes('i7')) return false;
    if (msg.includes('i9') && !specs.includes('i9')) return false;
    if (msg.includes('ryzen') && !specs.includes('ryzen')) return false;
    if (msg.includes('oled') && !name.includes('oled') && !specs.includes('oled')) return false;
    if (msg.includes('gaming') && !name.includes('gaming') && !specs.includes('rtx') && !specs.includes('gtx') && !specs.includes('radeon')) return false;

    return true;
  });

  if (matched.length === 0 && (maxPrice || minPrice)) {
    matched = dataset.filter(p => {
      const price = p.current_price || p.mrp;
      if (!price) return false;
      if (maxPrice && price > maxPrice) return false;
      if (minPrice && price < minPrice) return false;
      const name = (p.product_name || '').toLowerCase();
      const isAccessory = /bag|sleeve|case|backpack|cover|charger|stand|cable|mouse|keyboard/i.test(name);
      const userWantsAccessory = /bag|sleeve|case|backpack|cover|charger|stand|cable|mouse|keyboard/i.test(msg);
      if (isAccessory && !userWantsAccessory) return false;
      return true;
    });
  }

  if (matched.length === 0) {
    matched = dataset.filter(p => {
      const name = (p.product_name || '').toLowerCase();
      return !/bag|sleeve|case|backpack|cover|charger|stand|cable/i.test(name);
    });
  }

  matched.sort((a, b) => {
    if (maxPrice) {
      const scoreA = (a.current_price || 0) * 0.001 + (a.rating || 0) * 10 + (a.ram_gb || 8);
      const scoreB = (b.current_price || 0) * 0.001 + (b.rating || 0) * 10 + (b.ram_gb || 8);
      return scoreB - scoreA;
    }
    return calcScore(b) - calcScore(a);
  });
  const topPicks = matched.slice(0, 4);

  let advice = '';
  if (maxPrice) {
    const formattedPrice = maxPrice.toLocaleString('en-IN');
    advice = `Here are the best ${categoryName.toLowerCase()} deals under ₹${formattedPrice} sorted by price-to-performance value index:`;
  } else {
    advice = `Based on hardware performance and verified marketplace pricing, here are top picks for "${message}":`;
  }

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-3.8-flash' });
      const prompt = `You are an expert E-Commerce AI Shopping Assistant. The user asks: "${message}". Give a helpful, concise 2-sentence buying recommendation tailored to their budget and specs.`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text) advice = text.trim();
    } catch (e) {}
  }

  return {
    response: advice,
    products: topPicks
  };
}
