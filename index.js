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

connectDB();
app.use(cors());
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
