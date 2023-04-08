const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Image = require('./Models/image');
const Adventure = require('./Models/adventures');
const Order = require('./Models/orders');
const port = process.env.PORT || 5000;
require('dotenv').config();



// Middlewares

app.use(express.json());
app.use(cors());


mongoose.set('strictQuery', true);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kfezusn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(uri)
  .then(console.log('connected to mongodb atlas'))
  .catch(err => console.error(err.message));



// Image API

app.get('/api/images', async (req, res) => {
  const images = await Image.find();

  res.send(images)
})

// Adventures API

app.get('/api/adventures', async (req, res) => {
  const adventures = await Adventure.find();
  res.send(adventures);
})

app.get('/api/adventures/:id', async (req, res) => {
  const id = req.params.id;
  const adventure = await Adventure.findById(id);
  res.send(adventure);
})

app.post('/api/adventures', async (req, res) => {
  const obtainedService = req.body;
  const newService = new Adventure(obtainedService);
  const result = await newService.save();
  res.send(result);
})


// Order API

app.get('/api/orders', async (req, res) => {
  const orders = await Order.find();
  res.send(orders)
})


app.get('/api/orders/:orderEmail', async (req, res) => {
  const email = req.params.orderEmail;
  const order = await Order.find({ email });

  res.send(order);
})

app.post('/api/orders', async (req, res) => {
  const obtainedOrder = req.body;

  const newOrder = new Order(obtainedOrder);
  const result = await newOrder.save();
  res.send(result);
})

app.patch('/api/orders/:id', async (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;

  try {
    const updatedDoc = await Order.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          status: newStatus
        }
      },
      { new: true, upsert: true }
    );

    const result = await updatedDoc.save();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }

})

app.delete('/api/orders/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Order.findByIdAndDelete(id);
  res.send(result);
})




app.listen(port, () => {
  console.log('Server running at port', port)
})

