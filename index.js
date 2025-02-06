require("dotenv").config();
require("colors");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const { createServer } = require("node:http");
const soket = require("./socket");
const express = require("express");
const app = express();
const server = createServer(app);

const io = require("./middleware/socket.header")(server);
const router = require("./routers/router");

const { connect } = require("mongoose");

const auth = require("./middleware/AuthMiddleware");

app.use(express.json());
app.use(
  cors({
    // origin: ["http://localhost:3000", "https://edify-chi.vercel.app/"],
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

connect(process.env.DB_URI)
  .then(() => console.log("database connected".bgGreen))
  .catch((err) => console.log("Not connected to database".bgRed, err));

app.set("socket", io);
soket.connect(io);
app.get("/", (req, res) => res.send("welcome to server"));
app.use("/api", auth, router);

// app.listen(PORT, () => console.log(`http://localhost:${PORT}`.bgCyan));

server.listen(PORT, () => console.log(`http://localhost:${PORT}`.bgCyan));
