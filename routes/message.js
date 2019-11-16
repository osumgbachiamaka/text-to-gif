const express = require('express');
const gif = require('../controllers/message')

const router = express.Router();


router.get('/', gif.gifPage)

module.exports = router;