const router = require('express').Router();
const {filterTrainer} = require('../components/api/users/controller/filteringController');
const {fetchAlltrainers} = require('../components/api/users/controller/usersController')

router.route('/filter')
    .post(filterTrainer)

router.route('/all')
    .get(fetchAlltrainers)

module.exports = router;