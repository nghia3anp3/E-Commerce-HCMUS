const mongoose = require('mongoose')

const User_info = new mongoose.Schema({
    account: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true       
    },
    email: {
        type: String,
        require: true       
    },
}, { versionKey: false })

const user = mongoose.model("users", User_info)

module.exports = user