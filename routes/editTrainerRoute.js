const router = require('express').Router();
const {setProfile} = require('../components/controllers/EditTrainerInfoController');

router.route('/')
    .post(setProfile)


module.exports = router;