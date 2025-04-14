const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require("./src/routes/userRoute");
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Ensure express.json() is used before routes
app.use('/api', userRoutes);

// Connect to MongoDB
const mongoURI = process.env.mongoURI;

mongoose.connect(mongoURI).then(() => console.log("Mongodb connected successfully!"));

// Additional routes
const ItemRoutes = require("./src/routes/itemRoute");
const categoryRoutes = require("./src/routes/categoryRoute");

app.use('/api', ItemRoutes);
app.use('/api', categoryRoutes);

app.get('/', (req, res) => {
  res.send('Veggify Recipe App Server is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
