const express = require('express');
const { Pool } = require('pg'); // ✅ Gunakan PostgreSQL
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ✅ Static file (frontend)
app.use(express.static(path.join(__dirname, 'frontend')));

// ✅ Koneksi ke PostgreSQL
const db = new Pool({
  user: 'postgres',          // Ganti sesuai username PostgreSQL kamu
  host: 'localhost',
  database: 'mahasiswa_db',  // Ganti sesuai nama database kamu
  password: 'postgres',      // Ganti sesuai password PostgreSQL kamu
  port: 5432,                // Default port PostgreSQL
});

db.connect((err, client, release) => {
  if (err) {
    return console.error('Gagal konek DB:', err.stack);
  }
  console.log('Berhasil terkoneksi ke database PostgreSQL!');
  release();
});

// ✅ Endpoint POST mahasiswa
app.post('/mahasiswa', async (req, res) => {
  const { nama, nim, prodi } = req.body;

  if (!nama || !nim || !prodi) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  const sql = 'INSERT INTO mahasiswa (nama, nim, prodi) VALUES ($1, $2, $3) RETURNING *';
  try {
    const result = await db.query(sql, [nama, nim, prodi]);
    res.status(201).json({ message: 'Data berhasil ditambahkan', data: result.rows[0] });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ message: 'Gagal menambahkan data' });
  }
});

// ✅ Endpoint Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const users = [
    { email: 'admin@gmail.com', password: 'admin123' },
    { email: 'xylo@gmail.com', password: 'admin123' }
  ];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login Anda berhasil' });
  } else {
    res.status(401).json({ success: false, message: 'Email atau password salah' });
  }
});

// ✅ Jalankan server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
