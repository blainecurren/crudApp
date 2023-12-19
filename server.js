const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
require("dotenv").config();

MongoClient.connect(process.env.MONGODB_URL, (err, client) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
});

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("listening on 3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/quotes", (req, res) => {
  console.log(req.body);
});
