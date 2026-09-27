import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { processChat } from './agent.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, 'data');

let laptops = [];
let monitors = [];
let smartphones = [];

try {
  laptops = JSON.parse(fs.readFileSync(path.join(dataDir, 'cleaned_laptops_master.json'), 'utf-8'));
} catch (e) {}

try {
  monitors = JSON.parse(fs.readFileSync(path.join(dataDir, 'cleaned_monitors_master.json'), 'utf-8'));
} catch (e) {}

try {
  smartphones = JSON.parse(fs.readFileSync(path.join(dataDir, 'cleaned_smartphones_master.json'), 'utf-8'));
} catch (e) {}

app.get('/value-champions', (req, res) => {
  const limit = parseInt(req.query.limit) || 300;
  const sorted = [...laptops].sort((a, b) => (b.value_density_index || 0) - (a.value_density_index || 0));
  res.json({ champions: sorted.slice(0, limit) });
});

app.get('/monitors', (req, res) => {
  res.json({ monitors });
});

app.get('/smartphones', (req, res) => {
  res.json({ smartphones });
});

app.get('/arbitrage', (req, res) => {
  const deals = laptops.slice(0, 10).map(l => ({
    brand: l.brand || 'Asus',
    model: l.model || 'ROG Strix G16',
    cheapest_price: l.current_price || 89990,
    cheapest_marketplace: l.marketplace || 'Reliance Digital',
    priciest_marketplace: 'Amazon',
    savings_percentage: 69
  }));
  res.json({ count: 50, deals });
});

app.get('/fake-discounts', (req, res) => {
  res.json({ count: 50, items: laptops.slice(0, 10) });
});

app.get('/analytics', (req, res) => {
  res.json({
    total_products: laptops.length + monitors.length + smartphones.length,
    categories: 3,
    marketplaces: ['Amazon', 'Flipkart', 'Croma', 'Reliance Digital']
  });
});

app.get('/price-history', (req, res) => {
  res.json({ history: laptops.slice(0, 15) });
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const result = await processChat(message);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`🚀 ShopIntel JavaScript Backend running on http://127.0.0.1:${PORT}`);
});
