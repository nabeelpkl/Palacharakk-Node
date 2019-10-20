const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  comment: {
    type: String,
    trim: true
  },
  rating: {
    type: Number,
    required: true
  },
  images: [
    {
      type: String,
      trim: true
    }
  ]
})

const Review = new mongoose.Model('Review', reviewSchema)

module.exports = Review
