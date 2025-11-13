const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data");
const txtFilePath = path.join(filePath, "txtData.txt");

router.get("/", (req, res) => {
  fs.readFile(txtFilePath, "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Something went wrong readingfile" });
    }
    return res.status(200).json({ txtData: data });
  });
});

router.post("/", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Missing text or Wrong format" });
  }
  fs.appendFile(txtFilePath, `\n ${text}`, (err) => {
    if (err) {
      return res.status(500).json({ error: "Something went wrong" });
    }
    return res.status(201).json({ response: "Successfuly wrote data" });
  });
});

module.exports = router;
