class CompanyDto {
  constructor (id, name, image, email, phone_number, contact) {
    this.id = id
    this.name = name
    this.image = image
    this.email = email
    this.phone_number = phone_number
    this.contact = contact
  }
}

module.exports = new CompanyDto()
