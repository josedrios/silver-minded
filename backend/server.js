const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
app.use(express.json());

// Database
connectDB();

// Routes
app.use('/api/task', require('./routes/taskRoutes'));
app.use('/api/event', require('./routes/eventRoutes'));

// Server
app.listen(PORT, '0.0.0.0', () => 
    console.log(`Server is running on port http://0.0.0.0:${PORT}`)
)
