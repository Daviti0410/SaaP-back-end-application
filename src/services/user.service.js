const bcrypt = require('bcrypt');
const {  Users: UserModel,  file: FileModel} = require('../db/models');
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

  const createFile = async(userPayload) => {
    const file = await FileModel.findOne({
      where: {
        userId: userPayload.userId
      }
    });
    if(!file) throw new NotFoundException('User NOt Found');

    return FileModel.create(userPayload, {
      returning: true,
    });
  };

  module.exports = {
    createUser,
    createFile
  }