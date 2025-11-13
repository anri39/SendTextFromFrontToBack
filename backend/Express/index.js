const express = require("express");
const server = express();
const userRoutes = require("./routes/userRoutes");
const txtRoutes = require("./routes/txtRoutes");

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

server.use(express.json());

server.use("/Users", userRoutes);
server.use("/Txt", txtRoutes);

server.use((req, res) => {
  res.status(404).json({ error: "Given endpoint does not exist" });
});

server.listen(3000, () => {
  console.log(`Server is listening on port 3000`);
});
