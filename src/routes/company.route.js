const router = require ('express').Router();

const CompanyController = require('../controller/company.controller')
const paramsUserValidator = require('../validators/userRegister.validator');

router.get('/:id', CompanyController.getUser);
router.delete('/:id', CompanyController.deleteUser);
router.put('/:id/subscribe', CompanyController.subscription);
router.post('/adduser',paramsUserValidator,  CompanyController.addUser);
router.delete('/:id', CompanyController.deleteCompanyUser);



module.exports = router;