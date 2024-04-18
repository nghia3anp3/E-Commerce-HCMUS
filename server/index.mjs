import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import phone_index from "./routes/phone/index.mjs";
import laptop_index from "./routes/laptop/index.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/phone/", phone_index);
app.use("/laptop/", laptop_index);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
