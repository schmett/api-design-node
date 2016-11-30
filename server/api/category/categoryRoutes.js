var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./categoryController');
// setup boilerplate route just to satisfy a request
// for building
router.param('id', function(){});

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;
