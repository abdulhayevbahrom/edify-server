require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const { connect } = require("mongoose");
const cors = require("cors");

const router = require("./routers/router");
const auth = require("./middleware/AuthMiddleware");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://edify-chi.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connect(process.env.DB_URI)
  .then(() => console.log("database connected".bgGreen))
  .catch((err) => console.log("Not connected to database".bgRed, err));

app.get("/", (req, res) => res.send("welcome to server"));
app.use("/api", auth, router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`.bgCyan));
