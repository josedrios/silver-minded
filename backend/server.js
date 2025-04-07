const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
    cors({
      origin: ['http://localhost:5173', process.env.FRONTEND_URL],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );
app.use(express.json());

// Database
connectDB();

app.use('/api/task', require('./routes/taskRoutes'));

// Middleware (Error catchers)
app.use('*', (req, res) => {
  console.log('Fallback route hit. Origin:', req.headers.origin);
  res.json({ message: 'Fallback working' });
});

// Server
app.listen(PORT, '0.0.0.0', () => 
    console.log(`Server is running on port http://0.0.0.0:${PORT}`)
)
