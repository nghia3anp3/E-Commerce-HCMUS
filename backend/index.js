const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const routes = require("./routes/routes.js");
const cors = require("cors");

const app = express();

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true in production with HTTPS
}));

// Middleware
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.text({ limit: '50mb' }));
app.use(cors());

// Object to store active sessions
const activeSessions = {};

// Middleware to track active sessions and update online user count
app.use((req, res, next) => {
  if (!activeSessions[req.sessionID]) {
    activeSessions[req.sessionID] = true; // Create a new entry for each new session
  }
  next();
});

// Routes
app.use("/api", routes);

app.get("/api", (req, res) => {
  res.send("Hello from Node API Server");
});

// API endpoint to get the number of online users
app.get("/api/online-users", (req, res) => {
  const onlineUsers = Object.keys(activeSessions).length;
  console.log("Number of online users:", onlineUsers);
  res.json({ onlineUsers });
});

mongoose.connect("mongodb+srv://nam:nam@se-ecommerce.lkwnlpo.mongodb.net/SE_Ecommerce")
  .then(() => {
    console.log("Connected to database!");
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
