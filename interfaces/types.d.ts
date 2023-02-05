import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

export interface Patch {
  users: string;
  transfer: string;
}

export interface UserModelProps
  extends Model<
    InferAttributes<UserModelProps>,
    InferCreationAttributes<UserModelProps>
  > {
  id: CreationOptional<Number>;
  name: String;
  accountNumber: Number;
  password: String;
  amount: CreationOptional<Number>;
  status: CreationOptional<UserStatus>;
}
export interface TransferModelProps
  extends Model<
    InferAttributes<TransferModelProps>,
    InferCreationAttributes<TransferModelProps>
  > {
  id: CreationOptional<Number>;
  amount: Number;
  senderUserId: String;
  reciverUserId: String;
}
