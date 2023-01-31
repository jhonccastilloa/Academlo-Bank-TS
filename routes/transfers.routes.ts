import { Router } from 'express';
import { transferAmount } from '../controllers/transfers.controller';

const router = Router();

router.post('/', transferAmount);


export default router