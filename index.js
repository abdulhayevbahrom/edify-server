require("dotenv").config();
require("colors");
const PORT = process.env.PORT || 5000;

const express = require("express");
const { connect } = require("mongoose");
const cors = require("cors");

// const { createServer } = require("node:http");
// const soket = require("./socket");
const app = express();
// const server = createServer(app);
// const io = require("./middleware/socket.header")(server);

const router = require("./routers/router");
const auth = require("./middleware/AuthMiddleware");

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend domenini yozing, masalan: "http://localhost:3000"
    methods: ["GET", "POST"],
  },
});

// Xabarlar saqlanadigan massiv
let messages = [];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Foydalanuvchiga avvalgi xabarlarni yuborish
  socket.emit("messageHistory", messages);

  // Yangi xabar qabul qilish
  socket.on("sendMessage", (data) => {
    messages.push(data); // Xabarni saqlash
    io.emit("receiveMessage", data); // Barcha foydalanuvchilarga yuborish
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

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

// app.set("socket", io);
// soket.connect(io);
app.get("/", (req, res) => res.send("welcome to server"));
app.use("/api", auth, router);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`.bgCyan));
