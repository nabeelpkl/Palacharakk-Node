const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
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
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true
  }
})

categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'subcategory'
})

const SubCategory = new mongoose.model('SubCategory', subCategorySchema)

module.exports = SubCategory
