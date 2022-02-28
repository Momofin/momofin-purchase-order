const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { auth } = require('./src/services/middleware/auth')
const dbConn = require('./src/database/db')
const cors = require('cors')
const purchaseOrderRoutes = require('./src/services/purchase-order/controller')

// TODO: const { SERVER_PORT } = Env() 

// // test database connection
function dbTestConnection() {
    return dbConn;
}

dbTestConnection()
app.use(bodyParser.json())
app.use(cors())

const prefixPath = '/v1/order'
app.use(prefixPath + '/', purchaseOrderRoutes)

// test app
app.get('/', (req, res) => {
    res.send({ message: 'its running' })
}) // TODO: auth

app.listen(5000, () => {
    console.log('Server running on port: ', 5000)
})  // TODO: SERVER_PORT }
