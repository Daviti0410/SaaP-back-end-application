const bcrypt = require('bcrypt');
const { Company: CompamyModel, Users: UserModel, Subscription, SubscrptionTier } = require('../db/models');
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

const findByEmail = (email) => CompamyModel.findOne({ where: { email }});

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
      subject: 'Verify company ' + companyName,
      text: 'Verify your company ' + companyName + 'localhost:5001/v1/auth/login'
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

  if (id !== user.id) throw new ConflictException('Invalid User')
  
  await CompamyModel.destroy(id);
};  

const deleteCompanyUser = async (id, authUser) => {

  const user = await UserModel.findByPk(id);

  if (!user) throw new NotFoundException('Not Found');

  if(!authUser.isAdmin) throw new UnauthorizedException('Unauthorized');

  if(id !== companyId) throw new ConflictException('You Do Not Have Premission');

  
  await UserModel.destroy(id);
};  

const subscription = async (id, subscriptionId) => {
  const company = await CompamyModel.findByPk(id);

  if (!company) throw new NotFoundException('Not Found');

  if (subscriptionId === 1) {
    company.subscriptionId === 1
  } else if (subscriptionId === 2){
    company.subscriptionId === 2
  } else if (subscriptionId === 3) {
    company.subscriptionId === 3
  }
  return await company.update({ subscriptionId })
};

const addUser = async (userPayload, id) => {
  const user = await UserModel.findOne({ 
    where: { 
      id: userPayload.companyId,
      email: userPayload.email, 
    } 
  });
  const company = await CompamyModel.findByPk(id);

  const subscibtion = await Subscription.findOne({
    where: {
      id: company.subscriptionId
    }
  })

  if (user) throw new ConflictException('User Already exist');

  if (company.subscriptionId === 1 || company.userAmount >= subscibtion.maxUsers) throw new ConflictException('User Amount Limit');
  if (company.subscriptionId === 2 || company.userAmount >= subscibtion.maxUsers) throw new ConflictException('User Amount Limit');
  
  if (company.subscriptionId === 3 || company.userAmount >= 1000){
    return await company.increment("billing", {by: 0.5})
  }

  await company.increment('userAmount', { by: 1 });

  const newUser = await UserModel.create(userPayload, { returning: true });
  await sendInvitationEmail(newUser.email, newUser.companyName);
  return newUser;
};


async function sendInvitationEmail(email, companyName) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD,
      }
    });

    const mailOptions = {
      from: CompamyModel.companyName,
      to: email,
      subject: 'Invitation to join ' + companyName,
      text: 'You have been invited to join ' + companyName + 'localhost:5001/v1/auth/'
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

const getBilling = async (id) => {
  const company = await CompamyModel.findByPk(id);
  const subscription = await Subscription.findOne({
    where: {
      id: company.subscriptionId,
    }
  });
  const subscriptionTier = await  SubscrptionTier.findOne ({
    where: {
      id: subscription.subscribtiontierid
    }
  })
  if(!company) throw new NotFoundException('Company not found');
  

  company.billing = subscriptionTier.price; 

  await company.save()

  return company

}


module.exports = {
  getUser,
  createUser,
  deleteUser,
  subscription,
  addUser,
  deleteCompanyUser,
  getBilling,
  findByEmail 
}