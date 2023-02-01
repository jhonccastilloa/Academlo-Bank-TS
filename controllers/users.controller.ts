import { Request, Response } from 'express';
import { where } from 'sequelize';
import TransferModel from '../models/transfer.models';
import UserModel from '../models/user.models';
import getAccountNumber from '../utils/accountNumber.handle';

const register = async (req: Request, res: Response) => {
  try {
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }
};
const login = async (req: Request, res: Response) => {
  try {
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
    res.json({
      status: 'success',
      message: 'user logged successfully',
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }
};

const historyTransfer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    if (!user)
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    const transfer = await TransferModel.findAll({
      where: {
        senderUserId: +user.accountNumber,
      },
    });
    if (transfer.length === 0)
      return res.status(404).json({
        status: 'error',
        message: 'The user has no transfers',
      });
    res.json({
      status: 'success',
      message: 'get transfer succesfully',
      transfer,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'internal server error',
    });
  }
};
export { register, login, historyTransfer };
