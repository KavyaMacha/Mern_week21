// express-server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://0.0.0.0:27017/counter_db')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define counter schema and model
const counterSchema = new mongoose.Schema({
  count: { type: Number, default: 0 },
  myCount: { type: Number, default: 0 }
}, { collection: 'counters' });
const Counter = mongoose.model('Counter', counterSchema);

// Routes
// Routes
app.get('/api/home', async (req, res) => {
    try {
      let counter = await Counter.findOne();
      if (!counter) {
        counter = new Counter();
        await counter.save();
      }
      res.json(counter);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
app.get('/api/counter', async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
      await counter.save();
    }
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/counter/increment', async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.count++;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/counter/decrement', async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.count--;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Routes for MyCounter
app.get('/api/mycounter', async (req, res) => {
    try {
        let counter = await Counter.findOne();
        if (!counter) {
          counter = new Counter();
          await counter.save();
        }
        res.json(counter);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
});

app.post('/api/mycounter/increment', async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.myCount++;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/mycounter/decrement', async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter();
    }
    counter.myCount--;
    await counter.save();
    res.json(counter);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
