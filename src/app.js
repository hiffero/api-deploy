const express = require('express');
const authRoutes = require('./routes/authRoutes');  // Rute untuk autentikasi
const salaryRoutes = require('./routes/salaryRoutes');  // Rute untuk prediksi salary

const app = express();

// Middleware
app.use(express.json());  // Pastikan untuk mem-parsing JSON

// Routes
app.use('/auth', authRoutes);  // Rute autentikasi
app.use('/predict', salaryRoutes);  // Rute prediksi salary

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
