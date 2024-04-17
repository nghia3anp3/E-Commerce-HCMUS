const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.post("/login", async (req, res) => {
  // Handle POST requests for login
  const { account, password } = req.body;
  try {
    const user = await collection.findOne({ account: account });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(isPasswordValid)
      if (isPasswordValid) {
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        console.log("gg")
        res.status(401).json("Invalid credentials");
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("An error occurred");
  }
});

app.post("/register", async (req, res) => {
  const { account, password, email } = req.body;
  
  try {
    const existingUser = await collection.findOne({ account: account });
    if (existingUser) {
      res.json("exist");
    } else {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10); // Adjust the salt rounds as needed
      const newUser = {
        account: account,
        password: hashedPassword,
        email: email,
      };
      await collection.create(newUser);
      res.json("notexist");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("fail");
  }
});


app.get('/account', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, 'your_secret_key', async (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const userId = user.userId;
    try {
      const user = await collection.findOne({ _id: userId });
      if (user) {
        res.json(user);
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json("An error occurred");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});