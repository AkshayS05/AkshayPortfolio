require("dotenv").config();
const express = require("express");
const connecToDB = require("./database/db");
const app = express();
const reviewRoutes = require("./routes/ratingRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// connect to the db
connecToDB();

// middleware --> express.json
app.use(express.json());
app.use(cookieParser());
// routes

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
