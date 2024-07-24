const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./Config/db');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/appointments', require('./Routes/appoinments'));
app.use('/api/services', require('./Routes/services'));
app.use('/api/users', require('./Routes/users'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

module.exports = app;