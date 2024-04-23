const express = require("express");
const mongoose = require("mongoose");
const phoneRoute = require("./routes/phone/index.js");
const laptopRoute = require("./routes/laptop/index.js");
const app = express();

// middleware
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.text({ limit: '50mb' }));


// routes
app.use("/phone", phoneRoute);
app.use("/laptop", laptopRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server");
});


mongoose
.connect(
  "mongodb+srv://nam:nam@se-ecommerce.lkwnlpo.mongodb.net/test_SE_Ecommerce"
)
.then(() => {
  console.log("Connected to database!");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
})
.catch(() => {
  console.log("Connection failed!");
});