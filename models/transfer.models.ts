import { DataTypes } from 'sequelize';
import db from '../database/db';
import { TransferModelProps } from '../interfaces/types';

const TransferModel = db.define<TransferModelProps>('transfer', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reciverUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default TransferModel;
