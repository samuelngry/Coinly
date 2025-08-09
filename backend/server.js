const express = require('express');
const cors = require('cors')
const path = require('path');
require('dotenv').config();
const sequelize = require("./config/db");

const app = express();

const allowedOrigins = [
  'https://coinly-kappa.vercel.app',
  'https://coinlyquest.com',
  'https://www.coinlyquest.com',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use('/badges', express.static(path.join(__dirname, 'public/badges')));

app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Test route
app.get('/test-cors', (req, res) => {
  res.json({ message: 'CORS is working!' });
});

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const questRoutes = require("./routes/questRoutes");
const petRoutes = require("./routes/petRoutes");
const customQuestRoutes = require("./routes/customQuestRoutes");
const statsRoutes = require("./routes/statsRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const habitRoutes = require("./routes/habitRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/custom", customQuestRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/habit", habitRoutes);

const PORT = process.env.PORT || 3000;

sequelize.authenticate().then(() => {
  console.log("Database connected...");
    return sequelize.sync({ force: false });
}).then(() => {
  console.log("Database synced...");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch((error) => {
  console.error("Database connection failed:", error.message);
});


module.exports = app;