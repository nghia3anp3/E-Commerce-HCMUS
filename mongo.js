const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://huy:huy@se-ecommerce.lkwnlpo.mongodb.net/SE-Ecommerce')
.then(() => {
    console.log("mongodb connected")
})
.catch(() => {
    console.log("failed db")
})

const newSchema = new mongoose.Schema({
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

const user = mongoose.model("users", newSchema)

module.exports = user