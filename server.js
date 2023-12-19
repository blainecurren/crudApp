const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
require("dotenv").config();

MongoClient.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
}).then((client) => {
  console.log("Connected to Database");
  const db = client.db("star-wars-quotes");
  const quotesCollection = db.collection("quotes");

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  app.use(express.static("public"));

  app.listen(3000, function () {
    console.log("listening on 3000");
  });

  app.set("view engine", "ejs");

  app.get("/", (req, res) => {
    db.collection("quotes")
      .find()
      .toArray()
      .then((results) => {
        res.render("index.ejs", { quotes: results });
      })
      .catch((error) => console.error(error));
  });

  app.post("/quotes", (req, res) => {
    quotesCollection
      .insertOne(req.body)
      .then((result) => {
        res.redirect("/");
      })
      .catch((error) => console.error(error));
  });

  app.put("/quotes", (req, res) => {
    quotesCollection
      .findOneAndUpdate(
        { name: "Yoda" },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote,
          },
        },
        { upsert: true }
      )
      .then((result) => {
        res.json("Success");
      })
      .catch((error) => console.error(error));
  });
});
