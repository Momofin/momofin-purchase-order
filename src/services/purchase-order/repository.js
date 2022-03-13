const purchaseOrderSchema = require('./schema')

class PurchaseOrderRepository {
  constructor (db) {
    this.db = db
  }

  async create (dto) {
    try {
      return this.db.create(dto)
    } catch (error) {
      return error
    }
  }

  async find () {
    try {
      return this.db.find()
    } catch (error) {
      return error
    }
  }

  async findAllBy (query, option) {
    try {
      return this.db.paginate(query, option)
    } catch (error) {
      return error
    }
  }

  async getOneById (objectId) {
    try {
      return this.db.findById(objectId)
    } catch (error) {
      return error
    }
  }

  async updateByID (objectId, dto) {
    try {
      return this.db.findByIdAndUpdate(objectId, dto)
    } catch (error) {
      return error
    }
  }
}

module.exports = new PurchaseOrderRepository(purchaseOrderSchema)
