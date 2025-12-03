import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.get('/api/health', (req, res) => res.json({ok:true, env: process.env.NODE_ENV || 'dev'}));
app.post('/api/checkout', (req, res) => {
  // Placeholder: server should create order and optionally Razorpay order
  const { items, payment_method } = req.body;
  return res.json({ success: true, orderId: 'order_test_123', razorpayOrderId: null });
});
app.get('/api/order/:id/qrcode', (req, res) => {
  res.setHeader('Content-Type','image/svg+xml');
  res.send('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="100%" height="100%" fill="#f3f3f3"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14">QR Placeholder</text></svg>');
});
app.post('/api/webhooks/razorpay', (req, res) => {
  // Verify signature in production
  console.log('webhook received', req.body);
  res.json({ ok:true });
});
const port = process.env.PORT || 4000;
app.listen(port, ()=> console.log('Backend listening on', port));
