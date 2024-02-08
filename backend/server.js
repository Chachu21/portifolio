// server.js

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")

// Initialize Express app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1/portfolio", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

// Check MongoDB connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Define a schema for the form data
const formDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Define a model based on the schema
const FormData = mongoose.model("FormData", formDataSchema);

// API endpoint for form submission
app.post("/submit-form", async (req, res) => {
  try {
    // Extract form data from request body
    console.log("error");
    const { name, email, message } = req.body;

    // Create a new FormData document
    const formData = new FormData({
      name: name,
      email: email,
      message: message,
    });

    // Save the document to MongoDB
    await formData.save();

    // Send success response
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (error) {
    // Send error response
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
