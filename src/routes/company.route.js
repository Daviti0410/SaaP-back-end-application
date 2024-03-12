const router = require ('express').Router();

const CompanyController = require('../controller/company.controller')


router.get('/:id', CompanyController.getUser);
router.delete('/:id', CompanyController.deleteUser);
router.put('/:id/subscribe', CompanyController.subscription);


module.exports = router;