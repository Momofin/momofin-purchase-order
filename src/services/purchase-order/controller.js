const express = require('express')
const purchaseOrderRoutes = express()
const service = require('./service')

purchaseOrderRoutes.post('', async (req, res) => await service.create(req, res))
purchaseOrderRoutes.get('', async (req, res) => await service.getAll(req, res))

module.exports = purchaseOrderRoutes