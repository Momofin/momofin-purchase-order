const {
    successResponse,
    errorResponse,
    errorValidation
} = require('../../helper/response')
const purchaseOrderRepository = require('./repository')
const PurchaseOrderDTO = require('./dto')
const { ItemDto } = require('./dto')
const CompanyDto = require('../../dto/company')
const { request } = require('../../helper/http-request')

/**
* @param {Request} req - express request
* @param {Response} res - express response
*/

class PurchaseOrderService {
    async create(req, res) {
        const authorize = req.headers.authorization
        const body = req.body
        try {
            const user = await request('GET', '/', '', id, authorize)
            const company = CompanyDto
            company.id = user.data._id
            company.image = user.data.image
            company.name = user.data.name
            const items = []
            body.forEach(value => {
                const item = new ItemDto()
                item.item_name = value.item_name
                item.qty = value.qty
                if (value.item_name == "emet") {
                    item.amount = value.qty * 10000
                }
                if (value.item_name == "esgn") {
                    item.amount = value.qty * 3000
                }
                items.push(item)
            });

            const dto = PurchaseOrderDTO
            dto.order_date = new Date()
            dto.company = company
            dto.items = items
            dto.payment_status = 'unpaid'
            dto.created_at = new Date()
            dto.updated_at = null
            dto.deleted_at = null

            await purchaseOrderRepository.create(dto)
            return res.send(successResponse(`request berhasil di buat`))
        } catch (error) {
            res.status(400)
            return res.send(errorResponse(400, error.message))
        }
    }

    async getAll(req, res) {
        // const userid = req.user.id

        // if user id not an admin, user only query by users company
        // if userid != 'admin'{
        //     req.query.company = 'coba'
        // }

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
}

module.exports = new PurchaseOrderService()