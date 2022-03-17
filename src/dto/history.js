class HistoryDto {
  constructor (type, name, status, timestamp, company, supplier, description, qty, totalAmount) {
    this.type = type
    this.name = name
    this.status = status
    this.timestamp = timestamp
    this.company = company
    this.supplier = supplier
    this.description = description
    this.qty = qty
    this.total_amount = totalAmount
  }
}
module.exports = HistoryDto
