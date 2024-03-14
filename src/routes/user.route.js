const router = require ('express').Router();

const  UserController  = require('../controller/user.controller');

router.post('/addfile', UserController.createFile);
router.delete('/removefile', UserController.deleteFile);


module.exports = router