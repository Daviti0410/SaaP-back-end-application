const bcrypt = require('bcrypt');
const {  Users: UserModel } = require('../db/models');
const { ConflictException, NotFoundException } = require('../tools');

const createUser = async (userPayload) => {
    const user = await UserModel.findOne({ 
      where: { 
        email: userPayload.email 
      } 
    });
  
    if(user) throw new ConflictException('User Already exist')
  
    const hashedPassword = bcrypt.hashSync(userPayload.password, Number(process.env.AUTH_SALT_AMOUNT));
  
    userPayload.password = hashedPassword;
  
    return UserModel.create(userPayload, {
      returning: true,
    });
  };
  
  module.exports = {
    createUser
  }