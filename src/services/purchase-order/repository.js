const purchaseOrderSchema = require('./schema')

class PurchaseOrderRepository {
  constructor(db) {
    this.db = db
  }

  async create(dto) {
    try {
      return this.db.create(dto)
    } catch (error) {
      return error
    }
  }

  async find() {
    try {
      return this.db.find()
    } catch (error) {
      return error
    }
  }

  async findAllBy(Object) {
    try {
      return this.db.find(Object)
    } catch (error) {
      return error
    }

  }
}

module.exports = new PurchaseOrderRepository(purchaseOrderSchema)