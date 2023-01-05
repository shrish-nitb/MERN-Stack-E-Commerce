const express = require("express");
const products = require("./data/products");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const publicPath = path.join(__dirname, '..', "build");
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
    fs.readdir(path.join(__dirname, '..', "build", "images", "slider-home"), (err, files) => {
      res.json(files);
    });
  }
});

app.use(express.static(publicPath));
app.get('*', (res, req) => {
  res.sendFile(path.join(publicPath, 'index.html'));
})
app.listen(port, () => console.log(`App listening at port: ${port}`));
