const jwt = require('jsonwebtoken');
const { UnauthorizedException } = require('../tools');

const checkAuth = (req, res, next) => {
  try {
    if (req.headers.hasOwnProperty('authorization')) {
      const token = req?.headers?.authorization.split(' ')[1];
      
      const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);

      
      req.user = {
        id: tokenPayload.id,
        isAdmin: tokenPayload.userTypeId === true,
      };

      return next();
    } else {
      throw new Error()
    }
  } catch (e) {
    return next(new UnauthorizedException('please sign in'))
  }
};

module.exports = checkAuth