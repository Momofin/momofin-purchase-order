const mongoose = require('mongoose')

function dbConn() {
    try {
        // mongoose.connect('mongodb+srv://mahendrafathan:!Sepakbola13@cluster0.qjjsw.mongodb.net/prj-mng?retryWrites=true&w=majority')
        mongoose.connect('mongodb://127.0.0.1:27017/purchase-order?retryWrites=true&w=majority')
        return mongoose.connection
    } catch (error) {
        console.log('failed', error)
        return error
    }
}

module.exports = dbConn()