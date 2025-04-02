const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();
const app = express();

// Middleware (Foundation)
app.use(
    cors({
      origin: `http://localhost:${process.env.PORT}`, 
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
app.use(express.json());

// Database
connectDB();

app.use('/api/tasks', require('./routes/taskRoutes'));

// Middleware (Error catchers)

// Server
app.listen(process.env.PORT, () => 
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
)
