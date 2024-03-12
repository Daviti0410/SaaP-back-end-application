const bcrypt = require('bcrypt');
const { Company: CompamyModel, Users: UserModel } = require('../db/models');
const { ConflictException, NotFoundException } = require('../tools');
const nodemailer = require('nodemailer')

const getUser = async (id) => {
  const data = await CompamyModel.findOne({
    where: {
      id: id,
    }
  });


  return data;
};


const createUser = async (userPayload) => {
  const user = await CompamyModel.findOne({ 
    where: { 
      email: userPayload.email 
    } 
  });

  if(user) throw new ConflictException('User Already exist')

  const hashedPassword = bcrypt.hashSync(userPayload.password, Number(process.env.AUTH_SALT_AMOUNT));

  userPayload.password = hashedPassword;


  const newUser = await CompamyModel.create(userPayload, { returning: true });
  await sendInvitationEmail(newUser.email, newUser.companyName);
  return newUser;
};
async function sendInvitationEmail(email, companyName) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD 
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Invitation to join ' + companyName,
      text: 'You have been invited to join ' + companyName + 'localhost:5001/v1/auth/login'
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
}


const deleteUser = async (id, authUser) => {

  const user = await CompamyModel.findByPk(id);

  if (!user) throw new NotFoundException('Not Found');

  if(!authUser.isAdmin) throw new UnauthorizedException('Unauthorized');


  
  await UserModel.destroy(id);
};  

const subscription = async (id, companyid) => {
  const company = await CompamyModel.findByPk(id);

  if (!company) throw new NotFoundException('Not Found');

  if (companyid === 1) {
    company.companyid === 1
  } else if (companyid === 2){
    company.companyid === 2
  } else if (companyid === 3) {
    company.companyid === 3
  }
  return await company.update({ companyid })
};

const addUser = async (userPayload)


module.exports = {
  getUser,
  createUser,
  deleteUser,
  subscription,
}