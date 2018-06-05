const express = require('express');
const router = express.Router();

const ctrl = require('./upload.ctrl')


router.post('/' , ctrl.uploadFiles)



module.exports = router