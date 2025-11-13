const express = require("express");
const router = express.Router();
const userData = require("../data/userData");

router.get("/", (_, res) => {
  res.json(userData);
});

router.post("/", (req, res) => {
  const { id, fullName, age } = req.body;
  if (!id || !fullName || !age) {
    return res.status(400).json({ error: "Missing fields or Invalid Format" });
  }
  const newUser = { id, fullName, age };
  userData.push(newUser);
  return res.status(200).json({ response: "Successfuly added user!" });
});

router.get("/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const getSingleUser = userData.find((user) => user.id === userId);
  if (!getSingleUser) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(getSingleUser);
});

module.exports = router;
