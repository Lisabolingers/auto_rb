const { createCanvas } = require('canvas');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests are allowed' });
    return;
  }

  const text = req.body.text || 'Hello World';

  const width = 2000;
  const height = 2000;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Şeffaf arka plan çizilmiyor (arka plan boş)

  ctx.fillStyle = '#000000'; // Yazı rengi
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '200px sans-serif';
  ctx.fillText(text, width / 2, height / 2);

  res.setHeader('Content-Type', 'image/png');
  const buffer = canvas.toBuffer('image/png');
  res.status(200).end(buffer);
}
