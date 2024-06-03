const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/Auth'); // Import auth routes
const productRoutes = require('./routes/productRoutes');
const app = express();

app.use(cors());
app.use(express.json());
const mongoDBUri = process.env.MONGODB_URI;
mongoose.connect(mongoDBUri)
    .then(() => {
        console.log('Successfully connected');
    })
    .catch((error) => {
        console.error('Error connecting', error);
    });

// Use auth routes
app.use('/api/Auth', authRoutes);
app.use('/api', productRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`);
});
