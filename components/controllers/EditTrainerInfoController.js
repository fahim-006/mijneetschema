const _ = require('lodash')
const User = require('../../models/User')

module.exports.setProfile = async (req, res) => {
    let id= req.params.id;
    console.log(id);
    const trainerProfile = _.pick(req.body, ["fullname","mobile_number","address","gender","doel","leeftijd","description","facebookURL","twitterURL", "linkedinURL", "expertise", "certificates"]);
    const trainerEmail = _.pick(req.body,["email"]);
    emailAddress = trainerEmail["email"];
    
    await User.updateOne({email: emailAddress}, trainerProfile);


    return res.status(200).send("Updated Successfully!");
}