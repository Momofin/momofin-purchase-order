class PurchaseOrderDto {
   constructor(order_id, order_date, company, items, payment_status, createdAt, updatedAt, deletedAt) {
    this.order_id = order_id
    this.order_date = order_date
    this.company = company
    this.items = items
    this.payment_status = payment_status
    this.created_at = createdAt
    this.updated_at = updatedAt
    this.deleted_at = deletedAt
  }
}

class ItemDto {
  constructor(item_name, qty, amount) {
    this.item_name = item_name
    this.qty = qty
    this.amount = amount
  }
}

module.exports = new PurchaseOrderDto()
module.exports = { ItemDto }
