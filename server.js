const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
  // Handle GET requests
});

app.post("/", async (req, res) => {
  // Handle POST requests for login
  const { account, password, email } = req.body;

  try {
    const user = await collection.findOne({ account: account });

    if (user) {
      res.json("exist");
    } else {
      res.json("notexist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("fail");
  }
});

app.post("/register", async (req, res) => {
  // Handle POST requests for registration
  const { account, password, email } = req.body;
  const data = {
    account: account,
    password: password,
    email: email,
  };
  console.log("test3")
  try {
    const user = await collection.findOne({ account: account });

    if (user) {
      res.json("exist");
    } else {
      await collection.insertMany([data])
      res.json("notexist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("fail");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
