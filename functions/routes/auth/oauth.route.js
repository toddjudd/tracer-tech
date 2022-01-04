const express = require('express');
const { oauthController } = require('../../controllers');

const router = express.Router();

router.route('/authorize/code').post();
router.route('/authorize/access_token').post();

module.exports = router;
