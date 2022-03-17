class PurchaseOrderDto {
  constructor (order_id, order_date, expiry_date, company, wallet_type, items, payment_status, order_status, createdAt, updatedAt, deletedAt) {
    this.order_id = order_id
    this.order_date = order_date
    this.expiry_date = expiry_date
    this.company = company
    this.wallet_type = wallet_type
    this.items = items
    this.payment_status = payment_status
    this.order_status = order_status
    this.created_at = createdAt
    this.updated_at = updatedAt
    this.deleted_at = deletedAt
  }
}

class ItemDto {
  constructor (item_name, qty, amount, total_amount, supplier) {
    this.item_name = item_name
    this.qty = qty
    this.amount = amount
    this.total_amount = total_amount
    this.supplier = supplier
  }
}

module.exports = new PurchaseOrderDto()
module.exports = { ItemDto }
