import { Request, Response } from 'express';
import UserModel from '../models/user.models';
import getAccountNumber from '../utils/accountNumber.handle';

const register = async (req: Request, res: Response)=> {
  const { name, password } = req.body;
  const accountNumber = await getAccountNumber();
  const createUser = await UserModel.create({
    name,
    password,
    accountNumber,
  });
  res.send({
    status: 'success',
    message: 'user created successfully',
    createUser,
  });
};
const login = async (req: Request, res: Response) => {
  const { accountNumber, password } = req.body;
  const user = await UserModel.findOne({
    where: {
      accountNumber,
    },
  });
  if (!user)
    return res.status(404).json({
      status: 'error',
      message: 'you need an account to Log in',
    });
  if (user?.password != password)
    return res.status(404).json({
      status: 'error',
      message: 'Incorrect password',
    });
  res.send({
    status: 'success',
    message: 'user logged successfully',
    user,
  });
};

const historyTransfer = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({id})
};
export { register, login, historyTransfer };
