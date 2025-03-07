const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());


app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/focus-timer', {

});

const sessionSchema = new mongoose.Schema({
  user: String,
  duration: Number,
  date: { type: Date, default: Date.now },
});

const Session = mongoose.model('Session', sessionSchema);

app.post('/session', async (req, res) => {
  const { user, duration } = req.body;
  const session = new Session({ user, duration });
  await session.save();
  res.status(201).send(session);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
