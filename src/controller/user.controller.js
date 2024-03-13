const CompanyUserService = require('../services/user.service');
const { safeControllerWrapper } = require('../tools');

const addFile = safeControllerWrapper (async (req, res) => {
    const { id } = req.params;
  
    const response = await UserService.getUser(userId)  
    return res.json(response);
  });