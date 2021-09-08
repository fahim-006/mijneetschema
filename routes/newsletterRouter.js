const router = require('express').Router();
const {createNewsletter, getNewsletter} = require('../components/controllers/newsLetterController');

router.route('/')
    .post(createNewsletter)
    .get(getNewsletter);

module.exports = router;