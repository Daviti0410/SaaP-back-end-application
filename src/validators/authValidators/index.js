const Joi = require("joi");
const { joiValidator } = require('../../tools')

const validateRegister = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    companyName: Joi.string().min(2).required(),
    industry: Joi.string().min(2).required(),
    country: Joi.number().min(0).required(),
  });

  return joiValidator({ schema, objectToValidate: req.body, next })
}

const validateLogin = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return joiValidator({ schema, objectToValidate: req.body, next })
}


module.exports = { validateRegister, validateLogin }