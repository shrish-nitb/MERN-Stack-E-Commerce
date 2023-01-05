const express = require("express");
const products = require("./data/products");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.get("/api/pictures/:for", (req, res) => {
  if (req.params.for === "slider-home") {
    fs.readdir(
      // path.join(__dirname, "..", "frontend", "public", "images", "slider-home"),
      path.join(__dirname, "client", "build", "images", "slider-home"),
      (err, files) => {
        res.json(files);
      }
    );
  }
});

// Serve Static Assets In Production
// Set Static Folder
app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);
app.listen(port, () => console.log(`App listening at port: ${port}`));
