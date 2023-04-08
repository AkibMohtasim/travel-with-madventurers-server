const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
  adventure_id: String,
  adventureName: String,
  customerName: String,
  price: String,
  name: String,
  email: String,
  date: String,
  message: String,
  status: String

})

const Order = mongoose.model('Order', orderSchema);


module.exports = Order;