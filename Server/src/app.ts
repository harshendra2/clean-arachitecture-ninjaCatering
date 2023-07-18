import express from 'express';
import cors from 'cors';
import userRoute from './modules/user/interfaces/routes';

class nodeApp {
  public app: express.Application;

  constructor() {
    this.app = express();

    this.initialiseMiddleware();
    this.initialiseRoutes();
  }

  private initialiseMiddleware(): void {
    this.app.use(cors()); 
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private initialiseRoutes(): void {
    this.app.use('/user', userRoute);
  }

  public listen(): void {
    this.app.listen(4000, () => console.log('server is running'));
  }
}

export default nodeApp;
