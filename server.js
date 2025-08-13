const express = require("express");
const cors = require("cors");
require("dotenv").config();
const formRoutes = require("./routes/formRoutes.js");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", formRoutes);

// Simple welcome message
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
