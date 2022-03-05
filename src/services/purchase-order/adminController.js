const express = require('express')
const adminOrderRoutes = express()
const service = require('./service')

adminOrderRoutes.get('', async (req, res) => await service.getAll(req, res))

module.exports = adminOrderRoutes