const UserService = require('../services/company.service');
const AuthUserService = require('../services/user.service');
const AuthService = require('../services/auth.service');
const { safeControllerWrapper } = require('../tools')


const register = safeControllerWrapper(async (req, res) => {
  const payload = req.body;

  await UserService.createUser(payload);

  return res.json({ message: 'CREATED' });
});

const UserRegister = safeControllerWrapper(async (req, res) => {
  const payload = req.body;

  await AuthUserService.createUser(payload);

  return res.json({ message: 'CREATED' });
});

const login = safeControllerWrapper(async (req, res) => {
  const payload = req.body;

  const token = await AuthService.login(payload);

  return res.json({ token })
});
const Userlogin = safeControllerWrapper(async (req, res) => {
  const payload = req.body;

  const token = await AuthService.Userlogin(payload);

  return res.json({ token })
});


module.exports = {
  register,
  login,
  UserRegister,
  Userlogin
}