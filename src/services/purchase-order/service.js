const {
  successResponse,
  errorResponse,
  errorValidation
} = require('../../helper/response')
const purchaseOrderRepository = require('./repository')
const PurchaseOrderDTO = require('./dto')
const { ItemDto } = require('./dto')
const CompanyDto = require('../../dto/company')
const HistoryDto = require('../../dto/history')
const { request } = require('../../helper/http-request')
const { Env } = require('../../config/env-loader')
const { COMPANY_API, TRANSACTION_API } = Env()

/**
* @param {Request} req - express request
* @param {Response} res - express response
*/

class PurchaseOrderService {
  async getOne (req, res) {
    const params = req.params.id
    try {
      const data = await purchaseOrderRepository.getOneById(params)
      if (!data) {
        res.status(404)
        return res.send(errorResponse(404, 'order tidak ditemukan'))
      }
      return res.send(successResponse(data))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async update (req, res) {
    const {
      order_status: orderStatus,
      company,
      wallet_type : walletType,
      authorize
    } = req.body
    const params = req.params.id
    try {
      const data = await purchaseOrderRepository.getOneById(params)
      if (!data) {
        res.status(404)
        return res.send(errorResponse(404, 'order tidak ditemukan'))
      }
      if(orderStatus === "approve"){
        for (let index = 0; index < walletType.length; index++) {
          const history = new HistoryDto()
          history.type = 'wallet'
          history.name = walletType[index]
          history.status = 'CR'
          history.company = company
          history.timestamp = new Date()
          request('POST', TRANSACTION_API + '/admin/history', history, '', authorize)
        }
      }
      data.order_status = orderStatus
      data.created_at = new Date()
      data.updated_at = new Date()
      await purchaseOrderRepository.updateByID(params, data)
      return res.send(successResponse('request berhasil di update'))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async create (req, res) {
    const authorize = req.headers.authorization
    const body = req.body
    try {
      const user = await request('GET', COMPANY_API, '', '', authorize)
      const company = CompanyDto
      company.id = user.data._id
      company.image = user.data.image
      company.name = user.data.name
      const items = []
      body.items.forEach(value => {
        const item = new ItemDto()
        item.item_name = value.item_name
        item.qty = value.qty
        if (value.item_name == 'emet') {
          item.amount = value.qty * 10000
        }
        if (value.item_name == 'esgn') {
          item.amount = value.qty * 3000
        }
        items.push(item)
      })

      const dto = PurchaseOrderDTO
      dto.order_date = new Date()
      dto.expiry_date = new Date()
      dto.wallet_type = body.wallet_type
      dto.expiry_date.setDate(dto.expiry_date.getDate() + 1)
      dto.company = company
      dto.items = items
      dto.payment_status = 'unpaid'
      dto.order_status = 'pending'
      dto.created_at = new Date()
      dto.updated_at = null
      dto.deleted_at = null

      await purchaseOrderRepository.create(dto)
      return res.send(successResponse('request berhasil di buat'))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async getAll (req, res) {
    try {
      const data = await purchaseOrderRepository.findAllBy(req.query)
      if (data < 1) {
        res.status(404)
        return res.send(errorResponse(404, 'order tidak ditemukan'))
      }
      return res.send(successResponse(data))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async getByCompany (req, res) {
    const authorize = req.headers.authorization
    try {
      const user = await request('GET', COMPANY_API, '', '', authorize)
      const company = CompanyDto
      company.id = user.data._id
      company.image = user.data.image
      company.name = user.data.name
      req.query.company = company
      const data = await purchaseOrderRepository.findAllBy(req.query)
      if (data < 1) {
        res.status(404)
        return res.send(errorResponse(404, 'order tidak ditemukan'))
      }
      return res.send(successResponse(data))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }
}

module.exports = new PurchaseOrderService()
