const mongoose = require('mongoose');

const adventureSchema = new mongoose.Schema({
  name: String,
  locations: String,
  duration: String,
  thingsToDo: [String],
  price: String,
  images: [String],
  descriptions: [String]
});

const Adventure = mongoose.model('Adventure', adventureSchema);


module.exports = Adventure;