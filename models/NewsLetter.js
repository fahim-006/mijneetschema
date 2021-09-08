const { Schema, model } = require('mongoose');
const Joi = require('joi');
 
module.exports.Newsletter = model('Newsletter', Schema({
    email: {
        type: String,
        unique: true
    }
}, {timestamps: true}));
 
module.exports.validate = newsletter => {

    const schema = Joi.object({
        email: Joi.string().min(3).max(50).required()
    });
    return schema.validate(newsletter);
}
