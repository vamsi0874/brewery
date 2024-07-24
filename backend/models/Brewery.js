const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brewerySchema = new Schema({
  id: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  websiteUrl: { type: String },
  state: { type: String },
  city: { type: String },
  type: { type: String }
});

const Brewery = mongoose.model('Brewery', brewerySchema);

module.exports = Brewery;
