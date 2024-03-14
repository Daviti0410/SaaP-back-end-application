const bcrypt = require('bcrypt');
const {  Users: UserModel,  File: FileModel} = require('../db/models');
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
  const deleteFile = async (id, userId) => {
    const file = await FileModel.findByPk(id);
    const user = await UserModel.findOne({
      where:{
        id: userId
      }
    })
    if (!file) throw new NotFoundException('Not Found');
  
    if(file.userId !== user.id) throw new ConflictException('You Do not have permission');
  
    await Product.destroy(id);
  };

  module.exports = {
    createUser,
    createFile,
    deleteFile
  }