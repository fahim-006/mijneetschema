const User = require('../../../../models/User')

module.exports.filterTrainer = async (req, res) => {
    let order = req.body.order === 'desc' ? -1 : 1;
    let sortBy = req.body.sortBy ?  req.body.sortBy : '_id';
    let limit =  req.body.limit ?  parseInt(req.body.limit) :  10;
    let skip =  parseInt(req.body.skip);
    let filters = req.body.filters;
    var key;
    let args = {};
    //let argsKey = [];
    //console.log(filters + " =key")
    for (let key in filters){
        //console.log(key + " =key1")
        if(filters[key].length > 0){
            if(key === 'leeftijd'){
                args['leeftijd'] = {
                    $gte: filters['leeftijd'][0],
                    $lte: filters['leeftijd'][1]
                }
                console.log("args: ", args);
            }
            if(key === 'address'){
               // console.log(`key is ${key}`)
                args['address'] = {
                    $in : filters['address']
                }
                console.log("args: ", args);
            }
            if(key === 'gender'){
                // console.log(`key is ${key}`)
                 args['gender'] = {
                     $in : filters['gender']
                 }
                 console.log("args: ", args);
             }
             if(key === 'doel'){
                // console.log(`key is ${key}`)
                 args['doel'] = {
                     $in : filters['doel']
                 }
                 console.log("args: ", args);
             }
        }
    }


    const trainer = await User.find(args)
    return res.status(200).send(trainer);
}

