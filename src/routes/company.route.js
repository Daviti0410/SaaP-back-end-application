const router = require ('express').Router();

const CompanyController = require('../controller/company.controller')

router.get('/:id', CompanyController.getUser);
router.get('/:id/billing', CompanyController.getBilling);
router.delete('/:id', CompanyController.deleteUser);
router.put('/:id/subscribe', CompanyController.subscription);
router.post('/adduser',  CompanyController.addUser);
router.delete('/:id', CompanyController.deleteCompanyUser);



module.exports = router;