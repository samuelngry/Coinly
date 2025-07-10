const express = require('express');
const cors = require('cors')
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

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
const db = require("./config/db");

app.use(express.json());
//app.use('/uploads', express.static('uploads'));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quests", questRoutes);
app.use("/api/pet", petRoutes);
app.use("/api/custom", customQuestRoutes);
app.use("/api/stats", statsRoutes);

const PORT = process.env.PORT || 3000;

db.authenticate().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch((error) => {
  console.log(error.message)
});

module.exports = app;