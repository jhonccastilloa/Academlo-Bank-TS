import { Request, Response } from 'express';
import TransferModel from '../models/transfer.models';
import UserModel from '../models/user.models';

const transferAmount = async (req: Request, res: Response) => {
  try {
    const { amount, senderUserId, reciverUserId } = req.body;

    if (senderUserId == reciverUserId)
      return res.status(404).json({
        status: 'error',
        message: 'you can not transfer yourself',
      });
    const senderUser = await UserModel.findOne({
      where: {
        accountNumber: senderUserId,
      },
    });
    const reciverUser = await UserModel.findOne({
      where: {
        accountNumber: reciverUserId,
      },
    });
    if (!senderUser || !reciverUser)
      return res.status(404).json({
        status: 'error',
        message: 'this account not exist',
      });
    if (senderUser.amount < amount)
      return res.status(404).json({
        status: 'error',
        message: 'amount exceeded',
      });

    const senderUserAmount = +senderUser.amount - amount;
    await senderUser.update({ amount: senderUserAmount });
    const reciverUserAmount = +reciverUser.amount + amount;
    await reciverUser.update({ amount: reciverUserAmount });

    const transfer = await TransferModel.create({
      amount,
      senderUserId,
      reciverUserId,
    });
    res.json({
      status: 'succes',
      message: 'transfer completed',
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

export { transferAmount };
