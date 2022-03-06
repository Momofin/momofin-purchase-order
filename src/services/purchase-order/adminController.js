const express = require('express')
const adminOrderRoutes = express()
const service = require('./service')

adminOrderRoutes.get('', async (req, res) => await service.getAll(req, res))
adminOrderRoutes.get('/:id', async (req, res) => await service.getOne(req, res))
adminOrderRoutes.put('/:id', async (req, res) => await service.update(req, res))

module.exports = adminOrderRoutes
