const Joi = require('joi');

const policySchema = Joi.object({
    premium: Joi.number().required(),
    taxFee: Joi.number().required(),
    insuredName: Joi.string().required(),
    policyName: Joi.string().required()
});

const generateFinanceTermsSchema = Joi.object({
    policies: Joi.array().items(policySchema).required(),
    dueDate: Joi.date().required()
});

module.exports = generateFinanceTermsSchema;
