const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  console.log('Calling from auth middleware', req.method)
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, 'palacharak_kada_24_7')
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    if (!user) {
      throw new Error()
    }

    req.token = token
    req.user = user
    next()

    console.log('from middleware ', token, decoded)
  } catch (e) {
    res.status(401).send('error: please authenticate')
  }
}

module.exports = auth
