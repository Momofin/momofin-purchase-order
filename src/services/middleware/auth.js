const jwt = require('jsonwebtoken')
const { Env } = require('../../config/env-loader')
const { errorResponse } = require('../../helper/response')

const auth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    return res.status(401).send(errorResponse(401, 'unauthorized'))
  }
  const token = authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, Env().JWT_SECRET_KEY) 
    req.user = decoded
  } catch (err) {
    return res
      .status(403)
      .send(errorResponse(403, err.message))
  }
  return next()
}

const authAdmin = (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    return res.status(401).send(errorResponse(401, 'unauthorized'))
  }
  const token = authorization.split(' ')[1]
  try {
    const decoded = jwt.verify(token, Env().JWT_ADMIN_SECRET_KEY) 
    req.user = decoded
  } catch (err) {
    return res
      .status(403)
      .send(errorResponse(403, err.message))
  }
  return next()
}

module.exports = { auth, authAdmin }