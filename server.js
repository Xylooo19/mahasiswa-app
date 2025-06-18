
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'frontend')));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mahasiswa_db' 
});

db.connect((err) => {
  if (err) {
    console.error('Gagal konek DB:', err);
    return;
  }
  console.log('Berhasil terkoneksi ke database!');
});

// ✅ Endpoint POST mahasiswa
app.post('/mahasiswa', (req, res) => {
  const { nama, nim, prodi } = req.body;

  if (!nama || !nim || !prodi) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  const sql = 'INSERT INTO mahasiswa (nama, nim, prodi) VALUES (?, ?, ?)';
  db.query(sql, [nama, nim, prodi], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).json({ message: 'Gagal menambahkan data' });
    }

    res.status(201).json({ message: 'Data berhasil ditambahkan', data: result });
  });
});

// ✅ Jalankan server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const users = [
    { email: 'admin@gmail.com', password: 'admin123' },
    { email: 'xylo@gmail.com', password: 'xylo123' } 
  ];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login Anda berhasil' });
  } else {
    res.status(401).json({ success: false, message: 'Email atau password salah' });
  }
});
