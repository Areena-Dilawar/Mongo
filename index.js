const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/Books')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));

  const BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
    genre: { type: String },
    summary: { type: String }
});

const Book = mongoose.model('Book', BookSchema);
app.use(express.json());

app.post('/book', async (req, res) => {
    const data = req.body;
    const object = await Book.create(data);
    res.json({ "message": "object created successfully", object });
});

app.get('/books/:id', async (req, res) => {
    const id = req.params.id;
    const object = await Book.findById(id);
    res.json({ "message": "object found", object });
});

app.put('book/:id', async (req, res)=>{
    const id = req.params.id
    const object = req.body
    const updatedBook =  await Book.findByIdAndUpdate(id, object);
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});