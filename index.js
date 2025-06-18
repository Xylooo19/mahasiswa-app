const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root', 
  database: 'mahasiswa_db'
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi gagal:', err);
    return;
  }
  console.log('Koneksi ke database berhasil!');
});

// Endpoint ambil data
app.get('/mahasiswa', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// ✅ Hanya satu endpoint POST /mahasiswa
app.post('/mahasiswa', (req, res) => {
  const { nama, nim, prodi } = req.body;
  const query = 'INSERT INTO mahasiswa (nama, nim, prodi) VALUES (?, ?, ?)';
  db.query(query, [nama, nim, prodi], (err, result) => {
    if (err) {
      console.error('Gagal tambah data:', err);
      res.status(500).json({ error: 'Gagal tambah data' });
    } else {
      res.status(201).json({ id: result.insertId, nama, nim, prodi });
    }
  });
});

// Jalankan server
app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});
