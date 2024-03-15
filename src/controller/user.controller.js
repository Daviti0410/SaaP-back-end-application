const CompanyUserService = require('../services/user.service');
const { safeControllerWrapper } = require('../tools');


const createFile = safeControllerWrapper( async (req, res) => {
  
  const title =  req.body.title
  const description = req.body.description
  const userId = req.body.userId
  const fileType = req.file.mimetype
  const fileName = req.file.originalname
  const fileData = req.file.buffer

  const response = await CompanyUserService.createFile(title, description, userId, fileType, fileName, fileData);
  return res.json(response);
  });

  const deleteFile = safeControllerWrapper( async (req, res) => {
    const { id }  = req.params;
    const { userId } = req.user;
  
    const response = await CompanyUserService.deleteProduct(id, {  userId });
  
    return res.json(response);
  });


  module.exports = { 
    createFile,
     deleteFile,
  }