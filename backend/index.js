const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");

const app = express();
const cors = require("cors");


// middleware
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.text({ limit: '50mb' }));
app.use(cors());

// routes
app.use("/api", routes);

app.get("/api", (req, res) => {
  res.send("Hello from Node API Server");
});


mongoose
.connect(
  "mongodb+srv://nam:nam@se-ecommerce.lkwnlpo.mongodb.net/test_SE_Ecommerce"
)
.then(() => {
  console.log("Connected to database!");
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
})
.catch(() => {
  console.log("Connection failed!");
});