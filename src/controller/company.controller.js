const UserService = require('../services/company.service');
const { safeControllerWrapper } = require('../tools');


const getUser = safeControllerWrapper (async (req, res) => {
  const { userId } = req.params;

  const response = await UserService.getUser(userId)  
  return res.json(response);
});

const deleteUser = safeControllerWrapper (async (req, res) => {
  const { id }  = req.params;
  const { isAdmin } = req.user;
  

  const response = await UserService.deleteUser(id, { isAdmin });

  return res.json(response);
});

const deleteCompanyUser = safeControllerWrapper (async (req, res) => {
  const { id }  = req.params;
  const { isAdmin } = req.user;
  

  const response = await UserService.deleteCompanyUser(id, { isAdmin });

  return res.json(response);
});


const subscription = safeControllerWrapper (async (req, res) => {
  const { id } = req.params;
  const { companyid } = req.body; 

  const response = await UserService.subscription(id, {companyid});

  return res.json(response);
});

const addUser = safeControllerWrapper (async(req, res) => {
  const { id } = req.params;
  const { email, companyId } = req.body;

  const response = await UserService.addUser(id, { email, companyId });
  return res.json(response)
});

const getBilling = safeControllerWrapper (async (req, res) => {
  const { id } = req.params;
  const response = await UserService.getBilling(id);

  return res.json(response);
})

module.exports = {
  getUser,
  deleteUser,
  subscription,
  addUser,
  deleteCompanyUser,
  getBilling
}