const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');
const mansionRoutes = require('./routes/mansionRoutes');
const penthouseRoutes = require('./routes/penthouseRoutes');
const luxuryCollectibleRoutes = require('./routes/luxuryCollectibleRoutes');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

// Set CORS options
const corsOptions = {
    origin: 'https://propertyfront.vercel.app/', // Replace with the domain of the site you want to allow
    methods: ['GET', 'POST'], // Optional: specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Optional: specify allowed headers
};

connectDB();
app.use(cors(corsOptions)); // Use CORS with the specified options
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send(`Hello , World! Server is running on http://localhost:${PORT}`);
});

app.use('/luxury-collectibles', luxuryCollectibleRoutes);
app.use('/penthouses', penthouseRoutes);
app.use('/property', propertyRoutes);
app.use('/mansions', mansionRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
