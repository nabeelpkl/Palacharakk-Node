const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  }
})

categorySchema.virtual('subcategories', {
  ref: 'SubCategory',
  localField: '_id',
  foreignField: 'category'
})

const Category = new mongoose.model('Category', categorySchema)

module.exports = Category
