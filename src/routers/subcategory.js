const express = require('express')
const Category = require('../models/category')
const router = new express.Router()

router.post('/categories', async (req, res) => {
  const category = new Category(req.body)

  try {
    await category.save()
    res.status(201).send(category)
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router
