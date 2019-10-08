const express = require('express')
const Category = require('../models/category')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/categories', auth, async (req, res) => {
  const category = new Category(req.body)

  try {
    await category.save()
    res.status(201).send(category)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/categories', auth, async (req, res) => {
  try {
    const categories = await Category.find()
    console.log('Got some categories')

    res.send({ categories })
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/categories/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const category = await Category.findOne({ _id })

    if (!category) {
      return res.status(404).send()
    }
    res.send(category)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/categories/:id/subcategories', auth, async (req, res) => {
  const _id = req.params.id
  try {
    console.log("Its coming here ")
    const category = await Category.findById(_id)
    const subcategories = await category.populate('subcategories').execPopulate()
    if (!category) {
      return res.status(404).send({ error: 'category not found' })
    }
    if (!subcategories) {
      return res.send({ subcategories: [] })
    }

    res.send({ subcategories })
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/categories/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'description']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const category = await Category.findOne({ _id: req.params.id })

    if (!category) {
      return res.status(404).send()
    }

    updates.forEach(update => (category[update] = req.body[update]))
    await category.save()
    res.send(category)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/categories/:id', auth, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id })

    if (!category) {
      return res.status(404).send()
    }

    res.send(category)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
