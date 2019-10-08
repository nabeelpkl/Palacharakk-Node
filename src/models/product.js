const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SubCategory'
  },
  description: {
    type: String,
    trim: true
  }
})

const Product = new mongoose.model('Product', productSchema)

module.exports = Product
