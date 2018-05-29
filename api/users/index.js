const express = require('express');
const router = express.Router();

const ctrl = require('./users.ctrl')

router.get('/' , ctrl.list)

router.get('/:id', ctrl.get)

router.put('/:id', ctrl.modify)

router.post('/' , ctrl.create)

router.delete('/:id', ctrl.del)


module.exports = router