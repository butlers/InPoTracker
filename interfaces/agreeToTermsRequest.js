const Joi = require('joi');

const agreeToTermsSchema = Joi.object({
    id: Joi.string().required()
});

module.exports = agreeToTermsSchema;
