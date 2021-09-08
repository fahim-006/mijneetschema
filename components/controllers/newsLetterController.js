const _ = require('lodash');
const { validate, Newsletter} = require('../../models/NewsLetter');

module.exports.createNewsletter = async (req, res) => {
    console.log(res.body)
    const {error} = validate(_.pick(req.body, ['email']));
    console.log(req.body);
    if(error){
        return res.status(400).send("errrrr");
        
    } 
    const newsletter = new Newsletter (_.pick(req.body, ["email"]));
    const result = await newsletter.save();
    return res.status(201).send({
        message: "email is sent to the admin!",
        data: {
            email: result.email
        }
    })
}

module.exports.getNewsletter = async (req, res) => {
    const newsletter = await Newsletter.find()
        .sort({_id: -1})
    return res.status(200).send(newsletter);
}