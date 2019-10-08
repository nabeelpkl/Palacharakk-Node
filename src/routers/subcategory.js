const express = require('express')
const SubCategory = require('../models/subcategory')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/subcategories', auth, async (req, res) => {
  const subcategory = new SubCategory(req.body)

  try {
    await subcategory.save()
    res.status(201).send(subcategory)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/subcategories', auth, async (req, res) => {
  try {
    const subcategories = await SubCategory.find()
    res.send({ subcategories })
  } catch (e) {
    res.status(500).send()
  }
})
// get individual sub category
router.get('/subcategories/:id', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const subcategory = await SubCategory.findOne({ _id })

    if (!subcategory) {
      res.status(404).send()
    }

    res.send(subcategory)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/subcategories/:id/products', auth, async (req, res) => {
  const _id = req.params.id
  try {
    const subcategory = await SubCategory.findById(_id)
    const products = await subcategory.populate('products').execPopulate()
    if (!subcategory) {
      return res.status(404).send({ error: 'category not found' })
    }
    if (!products) {
      return res.send({ products: [] })
    }

    res.send({ products })
  } catch (e) {
    res.status(500).send()
  }
})

router.patch('/subcategories/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'description', 'category']
  const isValidOperation = updates.every(update => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    const subcategory = await SubCategory.findOne({ _id: req.params.id })

    if (!subcategory) {
      return res.status(404).send()
    }

    updates.forEach(update => (subcategory[update] = req.body[update]))
    await subcategory.save()
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/subcategories/:id', auth, async (req, res) => {
  try {
    const subcategory = await SubCategory.findOneAndDelete({ _id: req.params.id })

    if (!subcategory) {
      return res.status(404).send()
    }

    res.send(subcategory)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
