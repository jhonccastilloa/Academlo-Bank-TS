import UserModel from '../models/user.models';

const getAccountNumber = async () => {
  let existAccountNumber = true;
  let accountNumber: Number = 0;
  while (existAccountNumber) {
    accountNumber = Math.floor(Math.random() * (999999 - 100000) + 100000);
    const user = await UserModel.findOne({
      where: {
        accountNumber,
      },
    });
    existAccountNumber = user ? true : false;
  }
  return accountNumber;
};

export default getAccountNumber;
