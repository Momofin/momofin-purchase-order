const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { Env } = require('./src/config/env-loader')
const { auth, authAdmin } = require('./src/services/middleware/auth')
const dbConn = require('./src/database/db')
const cors = require('cors')
const purchaseOrderRoutes = require('./src/services/purchase-order/controller')
const adminOrderRoutes = require('./src/services/purchase-order/adminController')
const { SERVER_PORT } = Env()

// // test database connection
function dbTestConnection () {
  return dbConn
}

dbTestConnection()
app.use(bodyParser.json())
app.use(cors())

const prefixPath = '/v1/order'
// user routes
app.use(prefixPath + '/wallet/', auth, purchaseOrderRoutes)
// admin routes
app.use(prefixPath + '/admin/', authAdmin, adminOrderRoutes)

// test app
app.get('/', (req, res) => {
  res.send({ message: 'its running' })
}) // TODO: auth

app.listen(SERVER_PORT, () => {
  console.log('Server running on port: ', SERVER_PORT)
})
