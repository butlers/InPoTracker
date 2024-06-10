const mongoose = require('mongoose')

const financeTermsSchema = new mongoose.Schema({
    downPayment: {
        type: Number,
        required: true
    },
    amountFinanced: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    policyName: {
        type: String,
        required: true
    },
    insuredName: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
})

module.exports = mongoose.model('FinanceTerms', financeTermsSchema)