document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const result = await response.json();

  if (response.ok) {
    alert('Login anda berhasil!');
    // Simpan token atau arahkan ke halaman utama
    window.location.href = '/dashboard.html';
  } else {
    alert(result.error || 'Login gagal');
  }
});
// login.js
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = this.email.value;
  const password = this.password.value;

  // Simulasi login sederhana (sementara tanpa backend)
  if (email === 'xylo@gmail.com' && password === 'xylo123') {
    alert('Login anda berhasil!');
    window.location.href = '/index.html'; // Arahkan ke halaman utama nanti
  } else {
    alert('Email atau kata sandi salah!');
  }
});
