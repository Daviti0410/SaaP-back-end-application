const router = require('express').Router();

const CompanyRoute = require(`./company.route`);
const AuthRoute = require('./auth.route');
const CheckAuthMiddleware = require('../middlewares/checkAuth.middleware');


router.use('/auth', AuthRoute);

router.use(CheckAuthMiddleware);

router.use('/company', CompanyRoute);



module.exports = router;