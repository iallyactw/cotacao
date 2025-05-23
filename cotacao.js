export default async function handler(req, res) {
    // Ativar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    // Tratar requisição OPTIONS (pré-flight do navegador)
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Método não permitido' });
    }
  
    const { cepDestino } = req.body;
  
    try {
      const resposta = await fetch('https://www.melhorenvio.com.br/api/v2/me/shipment/calculate', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzU3NzQ3ZTQ3OGM5ZTVmMmVhOTdjOGJkZDIzMzBlYjM2MjZiNDJhOTU4YTUxYTliYzM2NzQ3ZDQ2OGMxYTgyNDE0MWI1ZDVlOGExM2IxNmIiLCJpYXQiOjE3NDgwMDU5NDYuNzY3NjUyLCJuYmYiOjE3NDgwMDU5NDYuNzY3NjU0LCJleHAiOjE3Nzk1NDE5NDYuNzUwNzE4LCJzdWIiOiI5ZTRjOTA1OC1hODUxLTQzZTUtOGEwYS0yMTgwZWMxM2Q0ZDMiLCJzY29wZXMiOlsiY2FydC1yZWFkIiwiY2FydC13cml0ZSIsImNvbXBhbmllcy1yZWFkIiwiY29tcGFuaWVzLXdyaXRlIiwiY291cG9ucy1yZWFkIiwiY291cG9ucy13cml0ZSIsIm5vdGlmaWNhdGlvbnMtcmVhZCIsIm9yZGVycy1yZWFkIiwicHJvZHVjdHMtcmVhZCIsInByb2R1Y3RzLWRlc3Ryb3kiLCJwcm9kdWN0cy13cml0ZSIsInB1cmNoYXNlcy1yZWFkIiwic2hpcHBpbmctY2FsY3VsYXRlIiwic2hpcHBpbmctY2FuY2VsIiwic2hpcHBpbmctY2hlY2tvdXQiLCJzaGlwcGluZy1jb21wYW5pZXMiLCJzaGlwcGluZy1nZW5lcmF0ZSIsInNoaXBwaW5nLXByZXZpZXciLCJzaGlwcGluZy1wcmludCIsInNoaXBwaW5nLXNoYXJlIiwic2hpcHBpbmctdHJhY2tpbmciLCJlY29tbWVyY2Utc2hpcHBpbmciLCJ0cmFuc2FjdGlvbnMtcmVhZCIsInVzZXJzLXJlYWQiLCJ1c2Vycy13cml0ZSIsIndlYmhvb2tzLXJlYWQiLCJ3ZWJob29rcy13cml0ZSIsIndlYmhvb2tzLWRlbGV0ZSIsInRkZWFsZXItd2ViaG9vayJdfQ.GaYLOPahd-fC7n1pKx8oDSTdMVujJE5Ovg_JevN20NfDXerGkcWUzNKxkCuxs2lZJ5IcQT0-QVFu6ooqtrWsscLDKoPYbeFMF4qqE9sBGJ8PZo3d3QkGcM3TM9SXqXjSU1u805kSBj0XcdzwY4jvQAXYxjjQQFJaiIf3ErytS4wYHn9o57x_o84o_eAfqNUlIgGgMKPCsmiKfaVVxCg8GmTklc0dOhvPoSLfwx_6clYI4QftR5f1mFkLQfHeGXtpb8xaHqeMkKvKQbx2qxjs7kyxYAcdgeYuoSCGt59egB3NKjYKcfQDZMSwz6z1W8EYn116mpZArFTvXrKbw1p3jZZnvyUWoo7XEG3Iw_RdE6w7ewSbcjcUn7Nf4f4LQnhD0k10JrQaYc8vof322z43tXtqj9ncOgB6_8Af-KKgRXtzpDfNeRGS7I8afpWDW3nQR9TKIffTwgXDIAWhYNigBMQzKSaVu-edQGV5E6xHAJJhlTCqEfyX_eOUxbqSLl3BPzY_848y_l5sl4YwN8rEIJqw5Ic5IS-qd3PuV9h4arqFVKGtMnCuswOqDmat81-kp4KfYKNV_GUh8Q4gsSn7HyCOJMTQrh410XJjtpGBP7fQeTfAi4iGtns1YAAnPubjLugzXHd7KvD7Ze5OJKEzJT2tAkqkbwOl2xJddR4KTQU',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Ially Shopify (suporte@ially.com.br)'
        },
        body: JSON.stringify({
          from: { postal_code: '55000-000' },
          to: { postal_code: cepDestino },
          products: [{
            weight: 0.3,
            width: 11,
            height: 17,
            length: 20,
            quantity: 1
          }],
          options: {
            insurance_value: 100,
            receipt: false,
            own_hand: false,
            collect: false
          },
          services: ['1', '2']
        })
      });
  
      const data = await resposta.json();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: 'Erro interno ao cotar frete', details: err.message });
    }
  }