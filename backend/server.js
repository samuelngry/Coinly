const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require("./routes/authRoutes");
const db = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

db.authenticate().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
.catch((error) => {
  console.log(error.message)
});
