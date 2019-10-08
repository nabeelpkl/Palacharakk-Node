const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')
const subCategoryRouter = require('./routers/subcategory')
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(categoryRouter)
app.use(subCategoryRouter)
app.use(productRouter)

module.exports = app
