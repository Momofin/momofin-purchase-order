class HistoryDto {
  constructor (type, name, status, timestamp, company, description, qty, totalAmount) {
    this.type = type
    this.name = name
    this.status = status
    this.timestamp = timestamp
    this.company = company
    this.description = description
    this.qty = qty
    this.total_amount = totalAmount
  }
}
module.exports = HistoryDto
