const router = require('express').Router();
const {filterTrainer} = require('../components/api/users/controller/filteringController');

router.route('/filter')
    .post(filterTrainer)

module.exports = router;