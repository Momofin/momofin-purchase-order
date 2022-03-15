const {
  successResponse,
  paginateResponse,
  errorResponse,
  errorValidation
} = require('../../helper/response')
const omitEmpty = require('omit-empty')
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
      items,
      payment_status: paymentStatus,
      authorize
    } = req.body
    const params = req.params.id
    try {
      const data = await purchaseOrderRepository.getOneById(params)
      if (!data) {
        res.status(404)
        return res.send(errorResponse(404, 'order tidak ditemukan'))
      }
      if (orderStatus === 'approve') {
        for (let index = 0; index < items.length; index++) {
          const history = new HistoryDto()
          history.type = 'wallet'
          history.name = items[index].item_name
          history.status = 'CR'
          history.qty = items[index].qty
          history.total_amount = items[index].total_amount
          history.description = `Incoming ${items[index].item_name}`
          history.company = company
          history.timestamp = new Date()
          request('POST', TRANSACTION_API + '/admin/history', history, '', authorize)
        }
      }
      data.order_status = orderStatus ?? data.order_status
      data.payment_status = paymentStatus ?? data.payment_status
      data.created_at = new Date()
      data.updated_at = new Date()
      await purchaseOrderRepository.updateByID(params, data)
      return res.send(successResponse('purchase order berhasil di update'))
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
        item.amount = value.unit_price
        if (value.item_name == 'emet') {
          item.total_amount = value.qty * value.unit_price
        }
        if (value.item_name == 'esgn') {
          item.total_amount = value.qty * value.unit_price
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
    const { page, limit, status } = req.query

    // build pagination
    const options = {
      offset: parseInt(page, 10) || 0,
      limit: parseInt(limit, 10) || 10
    }

    // build query for find all
    const query = {
      order_status: status
    }

    try {
      const data = await purchaseOrderRepository.findAllBy(omitEmpty(query), options)
      if (data < 1) {
        return res.send(successResponse([]))
      }
      return res.send(paginateResponse(
        data.docs,
        'success',
        data.offset,
        data.limit,
        data.totalPages,
        data.totalDocs))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }

  async getByCompany (req, res) {
    const authorize = req.headers.authorization
    const { page, limit, status } = req.query

    // build pagination
    const options = {
      offset: parseInt(page, 10) || 0,
      limit: parseInt(limit, 10) || 10
    }

    try {
      const user = await request('GET', COMPANY_API, '', '', authorize)
      const company = CompanyDto
      company.id = user.data._id
      company.image = user.data.image
      company.name = user.data.name
      company.email = user.data.email
      company.phone_number = user.data.phone
      company.contact = user.data.pic_name

      // build query for find all
      const query = {
        order_status: status,
        company: company
      }
      const data = await purchaseOrderRepository.findAllBy(omitEmpty(query), options)
      if (data < 1) {
        return res.send(successResponse([]))
      }
      return res.send(paginateResponse(
        data.docs,
        'success',
        data.offset,
        data.limit,
        data.totalPages,
        data.totalDocs))
    } catch (error) {
      res.status(400)
      return res.send(errorResponse(400, error.message))
    }
  }
}

module.exports = new PurchaseOrderService()
