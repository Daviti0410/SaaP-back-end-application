const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const CompanyService = require('./company.service');
const UserService = require('./user.service')
const { UnauthorizedException, NotFoundException } = require('../tools');

const login = async (payload) => {
  const user = await CompanyService.findByEmail(payload.email);

  if(!user) throw new NotFoundException('email not found');

  const match = await bcrypt.compare(payload.password, user.password);

  if (!match) throw new UnauthorizedException('email/password is incorrect');

  const jwtToken = jwt.sign({
    id: user.id,
  },
    process.env.JWT_SECRET,
    {
      expiresIn: `${process.env.JWT_VALIDITY_HOURS}h`
    }
  )

  return jwtToken;
};

const Userlogin = async (payload) => {
  const user = await UserService.findByUserEmail(payload.email);

  if(!user) throw new NotFoundException('email not found');

  const match = await bcrypt.compare(payload.password, user.password);

  if (!match) throw new UnauthorizedException('email/password is incorrect');

  const jwtToken = jwt.sign({
    id: user.id,
  },
    process.env.JWT_SECRET,
    {
      expiresIn: `${process.env.JWT_VALIDITY_HOURS}h`
    }
  )

  return jwtToken;
};

module.exports = {
  login,
  Userlogin
}