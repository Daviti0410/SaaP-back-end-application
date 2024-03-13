const router = require ('express').Router();

const UserController = require('../controller/user.controller');

router.post('/addfile', UserController.addFile);


module.exports = router