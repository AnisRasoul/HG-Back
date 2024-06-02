const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/Auth'); // Import auth routes
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://anisras:zbi123@cluster0.ftt0yyi.mongodb.net/HigherGravityStore?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Successfully connected');
    })
    .catch((error) => {
        console.error('Error connecting', error);
    });

// Use auth routes
app.use('/api/Auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`);
});
