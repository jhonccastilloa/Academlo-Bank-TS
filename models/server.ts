import express, { Application } from 'express';
import cors from 'cors';
import db from '../database/db';
import userRouter from '../routes/users.routes';
import transferRouter from '../routes/transfers.routes';

class Server {
  private app: Application;
  private PORT: string = process.env.PORT || '4003';
  private patch = {
    users: '/api/v1/users',
    transfer: '/api/v1/transfer',
  };
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.patch.users, userRouter);
    this.app.use(this.patch.transfer, transferRouter);
  }
  database() {
    db.authenticate()
      .then(() => console.log('Database authenticate'))
      .catch(err => console.log(err));
    db.sync()
      .then(() => console.log('Database Sync'))
      .catch(err => console.log(err));
  }
  listen() {
    this.app.listen(this.PORT, () => {
      console.log('server is running on port', this.PORT);
    });
  }
}

export default Server;
