const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://fakej2924:uLEqnF3fXu80M2li@cluster0.i1tetn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

const router = express.Router();

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/booksAPI', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Create Book Schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  releaseDate: Date,
  information: String,
  ratings: Number
});

// Create Book Model
const Book = mongoose.model('Book', bookSchema);

// Create Express App
const app = express();
app.use(express.json());

// Create API Endpoints
// Get all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Add a new book
app.post('/books', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.json(newBook);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});